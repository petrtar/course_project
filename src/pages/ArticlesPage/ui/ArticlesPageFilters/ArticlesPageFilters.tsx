import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";

import cls from "./ArticlesPageFilters.module.scss";
import { Card } from "@/shared/ui/deprecated/Card";
import { Input } from "@/shared/ui/deprecated/Input";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
    ({ className }) => {
        const { t } = useTranslation("article");

        const {
            order,
            sort,
            onChangeOrder,
            onChangeSort,
            view,
            onChangeView,
            search,
            onChangeSearch,
            onChangeType,
            type,
        } = useArticleFilters();

        return (
            <div className={classNames("", {}, [className])}>
                <div className={cls.sortWrapper}>
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input
                        placeholder={t("Поиск")}
                        value={search}
                        onChange={onChangeSearch}
                    />
                </Card>
                <ArticleTypeTabs
                    onChangeType={onChangeType}
                    value={type}
                    className={cls.tabs}
                />
            </div>
        );
    }
);
