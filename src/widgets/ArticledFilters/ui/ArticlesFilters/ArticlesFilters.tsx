import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ArticlesFilters.module.scss";
import { Card } from "@/shared/ui/redesigned/Card";
import { ArticleSortSelector } from "@/features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { SortOrder } from "@/shared/types/sort";
import { Input } from "@/shared/ui/redesigned/Input";
import SearchIcon from "@/shared/assets/icons/search.svg";
import { Icon } from "@/shared/ui/redesigned/Icon";

interface ArticledFiltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;

    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters: FC<ArticledFiltersProps> = memo(
    ({
        className,
        sort,
        order,
        type,
        search,
        onChangeSearch,
        onChangeOrder,
        onChangeSort,
        onChangeType,
    }) => {
        const { t } = useTranslation("article");
        return (
            <Card
                className={classNames(cls.ArticlesFilters, {}, [className])}
                padding='24'
            >
                <VStack gap='32'>
                    <Input
                        placeholder={t("Поиск")}
                        size='s'
                        value={search}
                        onChange={onChangeSearch}
                        addonLeft={<Icon Svg={SearchIcon} />}
                    />
                    <ArticleTypeTabs
                        onChangeType={onChangeType}
                        value={type}
                        className={cls.tabs}
                    />
                    <ArticleSortSelector
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                </VStack>
            </Card>
        );
    }
);
