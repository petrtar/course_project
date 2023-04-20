import { FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SortOrder } from "@/shared/types";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Select, SelectOptions } from "@/shared/ui/Select/Select";
import { ArticleSortField } from "../../model/const/const";

import cls from "./ArticleSortSelector.module.scss";

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = memo(
    ({ className, sort, order, onChangeOrder, onChangeSort }) => {
        const { t } = useTranslation("article");

        const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
            () => [
                {
                    value: "asc",
                    content: t("возрастанию"),
                },
                {
                    value: "desc",
                    content: t("убыванию"),
                },
            ],
            [t]
        );

        const orderFieldOptions = useMemo<SelectOptions<ArticleSortField>[]>(
            () => [
                {
                    value: ArticleSortField.CREATED,
                    content: t("дате создания"),
                },
                {
                    value: ArticleSortField.TITLE,
                    content: t("названию"),
                },
                {
                    value: ArticleSortField.VIEWS,
                    content: t("просмотрам"),
                },
            ],
            [t]
        );

        return (
            <div
                className={classNames(cls.ArticleSortSelector, {}, [className])}
            >
                <Select
                    options={orderFieldOptions}
                    label={t("Сортировать по")}
                    value={sort}
                    onChange={onChangeSort}
                />
                <Select
                    options={orderOptions}
                    label={t("по")}
                    value={order}
                    onChange={onChangeOrder}
                    className={cls.order}
                />
            </div>
        );
    }
);
