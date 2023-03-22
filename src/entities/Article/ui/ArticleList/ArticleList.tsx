import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "shared/lib/classNames/classNames";

import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

import cls from "./ArticleList.module.scss";

const getSkeleton = (view: ArticleView) => {
  return new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton key={index} view={view} className={cls.card} />);
};

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList: FC<ArticleListProps> = memo(({ className, articles, isLoading, view = ArticleView.SMALL }) => {
  const { t } = useTranslation("article");

  if (isLoading) {
    return <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>{getSkeleton(view)}</div>;
  }

  const renderArticle = (article: Article) => {
    return <ArticleListItem key={article.id} className={cls.card} article={article} view={view} />;
  };

  return <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>{!!articles.length ? articles.map(renderArticle) : null}</div>;
});