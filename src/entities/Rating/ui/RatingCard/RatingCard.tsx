import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";

import { Card } from "@/shared/ui/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { StarRating } from "@/shared/ui/StarRating";
import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Drawer } from "@/shared/ui/Drawer";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard: FC<RatingCardProps> = memo(
    ({
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        rate = 0,
    }) => {
        const { t } = useTranslation();

        const [isModalOpen, setIsModalOpen] = useState(false);
        const [starsCount, setStarsCount] = useState(rate);
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
            onCancel?.(starsCount);
        }, [onCancel, starsCount]);

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
            <Card className={className} max>
                <VStack align='center' gap='8' max>
                    <Text title={starsCount ? t("Спасибо за оценку") : title} />
                    <StarRating
                        selectedStars={starsCount}
                        size={40}
                        onSelect={onSelectStars}
                    />
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