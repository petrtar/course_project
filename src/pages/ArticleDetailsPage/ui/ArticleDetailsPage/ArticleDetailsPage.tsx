import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { classNames } from "shared/lib/classNames/classNames";
import { ArticleDetails, ArticleList } from "entities/Article";
import { Text, TextSize } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import {
    DynamicModuleLoader,
    ReducerList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { AddCommentForm } from "features/addCommentForm";
import { Page } from "widgets/Page/Page";

import { VStack } from "shared/ui/Stack";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments/comments";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { addCommentFormArticle } from "../../model/services/addCommentFormArticle/addCommentFormArticle";
import { getArticleRecommendations } from "../../model/slices/articleDetailsPageRecommendationsSlice";
import { getArticleRecommendationsIsLoading } from "../../model/selectors/recommendations/recommendations";
import { fetchArticleRecommendations } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";

import cls from "./ArticleDetailsPage.module.scss";

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};
interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
    const { t } = useTranslation("article");
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendationsIsLoading = useSelector(
        getArticleRecommendationsIsLoading
    );

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentFormArticle(text));
        },
        [dispatch]
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                {t("Статья не найдена")}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames("", {}, [className])}>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t("Рекомендуем")}
                    />
                    <ArticleList
                        target='_blank'
                        articles={recommendations}
                        isLoading={recommendationsIsLoading}
                        className={cls.recommendations}
                    />
                    <Text
                        size={TextSize.L}
                        className={cls.commentTitle}
                        title={t("Комментарии")}
                    />
                    <AddCommentForm onSendComment={onSendComment} />
                    <CommentList
                        isLoading={commentsIsLoading}
                        comments={comments}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
