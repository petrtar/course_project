import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text";
import { Text } from "@/shared/ui/redesigned/Text";

import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ToggleFeatures } from "@/shared/lib/features";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo(
    ({ className, isLoading, comments }) => {
        const { t } = useTranslation();

        if (isLoading) {
            return (
                <VStack
                    gap='16'
                    max
                    className={classNames("", {}, [className])}
                >
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </VStack>
            );
        }
        return (
            <VStack gap='16' max className={classNames("", {}, [className])}>
                {comments?.length ? (
                    comments.map((comment) => (
                        <CommentCard
                            isLoading={isLoading}
                            key={comment.id}
                            comment={comment}
                        />
                    ))
                ) : (
                    <ToggleFeatures
                        feature='isArticleRatingEnabled'
                        on={<Text text={t("Комментарии отсутствуют")} />}
                        off={
                            <TextDeprecated
                                text={t("Комментарии отсутствуют")}
                            />
                        }
                    />
                )}
            </VStack>
        );
    }
);
