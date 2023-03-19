import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { classNames } from "shared/lib/classNames/classNames";
import { ArticleDetails } from "entities/Article";
import { Text } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import { DynamicModuleLoader, ReducerList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";

import { articleDetailsCommentsReducer, getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments/comments";

import cls from "./ArticleDetailsPage.module.scss";
import { fetchCommentsByArticleId } from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

const reducers: ReducerList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};
interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>{t("Статья не найдена")}</div>;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames("", {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={cls.commentTitle} title={t("Комментарии")} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
