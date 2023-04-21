import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./RatingCard.module.scss";
import { Card } from "@/shared/ui/Card/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number, feedback?: string) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard: FC<RatingCardProps> = memo(
    ({ className, title, feedbackTitle, hasFeedback, onCancel, onAccept }) => {
        const { t } = useTranslation();

        const [isModalOpen, setIsModalOpen] = useState(false);
        const [starsCount, setStarsCount] = useState(0);
        const [feedback, setFeedback] = useState("");

        const onSelectStars = useCallback(
            (selectStarsCount: number) => {
                setStarsCount(selectStarsCount);
                if (hasFeedback) {
                    setIsModalOpen(true);
                } else {
                    onAccept?.(selectStarsCount);
                }
            },
            [hasFeedback, onAccept]
        );

        const acceptHandle = useCallback(() => {
            setIsModalOpen(false);
            onAccept?.(starsCount, feedback);
        }, [feedback, onAccept, starsCount]);

        const cancelHandle = useCallback(() => {
            setIsModalOpen(false);
            onCancel?.(starsCount, feedback);
        }, [feedback, onCancel, starsCount]);

        const modalContent = (
            <>
                <Text title={feedbackTitle} />
                <Input
                    value={feedback}
                    onChange={setFeedback}
                    placeholder={t("Ваш отзыв")}
                />
            </>
        );

        return (
            <Card className={classNames("", {}, [className])}>
                <VStack align='center' gap='8'>
                    <Text title={title} />
                    <StarRating size={40} onSelect={onSelectStars} />
                </VStack>
                <BrowserView>
                    <Modal isOpen={isModalOpen}>
                        <VStack max gap='32'>
                            {modalContent}
                            <HStack max gap='16' justify='end'>
                                <Button
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={cancelHandle}
                                >
                                    {t("Закрыть")}
                                </Button>
                                <Button onClick={acceptHandle}>
                                    {t("Отправить")}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
                </BrowserView>
                <MobileView>
                    <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                        <VStack gap='32'>
                            {modalContent}
                            <Button onClick={acceptHandle}>
                                {t("Отправить")}
                            </Button>
                        </VStack>
                    </Drawer>
                </MobileView>
            </Card>
        );
    }
);
