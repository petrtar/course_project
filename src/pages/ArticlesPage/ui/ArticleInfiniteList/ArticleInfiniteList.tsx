import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { ArticleList } from "@/entities/Article";
import { Text } from "@/shared/ui/deprecated/Text";

import {
    getArticlePageError,
    getArticlePageIsLoading,
    getArticlePageView,
} from "../../model/selectors/articlesPageSelectors";
import { getArticles } from "../../model/slices/articlesPageSlice";

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = memo(
    ({ className }) => {
        const { t } = useTranslation();
        const articles = useSelector(getArticles.selectAll);
        const isLoading = useSelector(getArticlePageIsLoading);
        const view = useSelector(getArticlePageView);
        const error = useSelector(getArticlePageError);

        if (error) {
            return <Text text={t("Ошибка при загрузке статей")} />;
        }

        return (
            <ArticleList
                isLoading={isLoading}
                view={view}
                articles={articles}
                className={className}
            />
        );
    }
);
