import { FC, memo, Suspense, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { CommentList } from "@/entities/Comment";
import { AddCommentForm } from "@/features/addCommentForm";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/deprecated/Text";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";

import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments/comments";
import { addCommentFormArticle } from "../../model/services/addCommentFormArticle/addCommentFormArticle";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { VStack } from "@/shared/ui/deprecated/Stack";
import { Loader } from "@/shared/ui/deprecated/Loader";

interface ArticleDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(
    ({ className, id }) => {
        const { t } = useTranslation("article");
        const dispatch = useDispatch();

        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(id));
        });

        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentFormArticle(text));
            },
            [dispatch]
        );
        return (
            <VStack gap='8' max className={classNames("", {}, [className])}>
                <Text size={TextSize.L} title={t("Комментарии")} />
                <Suspense fallback={<Loader />}>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        );
    }
);
