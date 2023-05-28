import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";

import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { Text } from "@/shared/ui/redesigned/Text";
import { StarRating } from "@/shared/ui/deprecated/StarRating";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card";
import { Modal } from "@/shared/ui/redesigned/Modal";
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from "@/shared/ui/deprecated/Button";
import { Drawer } from "@/shared/ui/redesigned/Drawer";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { ToggleFeatures } from "@/shared/lib/features";
import { Input } from "@/shared/ui/redesigned/Input";
import { Button } from "@/shared/ui/redesigned/Button";
import { Card } from "@/shared/ui/redesigned/Card";

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
                <ToggleFeatures
                    feature='isAppRedesigned'
                    on={
                        <>
                            <Text title={feedbackTitle} />
                            <Input
                                data-testid='RatingCard.Input'
                                value={feedback}
                                onChange={setFeedback}
                                placeholder={t("Ваш отзыв")}
                            />
                        </>
                    }
                    off={
                        <>
                            <TextDeprecated title={feedbackTitle} />
                            <InputDeprecated
                                data-testid='RatingCard.Input'
                                value={feedback}
                                onChange={setFeedback}
                                placeholder={t("Ваш отзыв")}
                            />
                        </>
                    }
                />
            </>
        );

        const content = (
            <>
                <VStack align='center' gap='8' max>
                    <ToggleFeatures
                        feature='isAppRedesigned'
                        on={
                            <Text
                                title={
                                    starsCount ? t("Спасибо за оценку") : title
                                }
                            />
                        }
                        off={
                            <TextDeprecated
                                title={
                                    starsCount ? t("Спасибо за оценку") : title
                                }
                            />
                        }
                    />
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
                            <ToggleFeatures
                                feature='isAppRedesigned'
                                on={
                                    <HStack max gap='16' justify='end'>
                                        <Button
                                            data-testid='RatingCard.Close'
                                            onClick={cancelHandle}
                                        >
                                            {t("Закрыть")}
                                        </Button>
                                        <Button
                                            data-testid='RatingCard.Send'
                                            onClick={acceptHandle}
                                        >
                                            {t("Отправить")}
                                        </Button>
                                    </HStack>
                                }
                                off={
                                    <HStack max gap='16' justify='end'>
                                        <ButtonDeprecated
                                            data-testid='RatingCard.Close'
                                            theme={ButtonTheme.OUTLINE_RED}
                                            onClick={cancelHandle}
                                        >
                                            {t("Закрыть")}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            data-testid='RatingCard.Send'
                                            onClick={acceptHandle}
                                        >
                                            {t("Отправить")}
                                        </ButtonDeprecated>
                                    </HStack>
                                }
                            />
                        </VStack>
                    </Modal>
                </BrowserView>
                <MobileView>
                    <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
                        <VStack gap='32'>
                            {modalContent}
                            <ToggleFeatures
                                feature='isAppRedesigned'
                                on={
                                    <Button onClick={acceptHandle} size='l'>
                                        {t("Отправить")}
                                    </Button>
                                }
                                off={
                                    <ButtonDeprecated onClick={acceptHandle}>
                                        {t("Отправить")}
                                    </ButtonDeprecated>
                                }
                            />
                        </VStack>
                    </Drawer>
                </MobileView>
            </>
        );

        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <Card
                        padding='24'
                        className={className}
                        max
                        border='round'
                        data-testid='RatingCard'
                    >
                        {content}
                    </Card>
                }
                off={
                    <CardDeprecated
                        className={className}
                        max
                        data-testid='RatingCard'
                    >
                        {content}
                    </CardDeprecated>
                }
            />
        );
    }
);
