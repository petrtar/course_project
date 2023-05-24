import { FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SortOrder } from "@/shared/types/sort";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Select, SelectOptions } from "@/shared/ui/deprecated/Select";

import cls from "./ArticleSortSelector.module.scss";
import { ArticleSortField } from "@/entities/Article";
import { ToggleFeatures } from "@/shared/lib/features";
import { ListBox } from "@/shared/ui/redesigned/Popup";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";

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
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <div
                        className={classNames(
                            cls.ArticleSortSelectorRedesigned,
                            {},
                            [className]
                        )}
                    >
                        <VStack gap='8'>
                            <Text text={t("Сортировать по")} />
                            <ListBox
                                items={orderFieldOptions}
                                value={sort}
                                onChange={onChangeSort}
                            />
                            <ListBox
                                items={orderOptions}
                                value={order}
                                onChange={onChangeOrder}
                            />
                        </VStack>
                    </div>
                }
                off={
                    <div
                        className={classNames(cls.ArticleSortSelector, {}, [
                            className,
                        ])}
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
                }
            />
        );
    }
);
