import { FC, memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "shared/lib/classNames/classNames";
import { TabItem, Tabs } from "shared/ui/Tabs/Tabs";

import { ArticleType } from "../../model/types/article";

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = memo(
    ({ className, value, onChangeType }) => {
        const { t } = useTranslation("article");

        const typeTabs = useMemo<TabItem[]>(
            () => [
                {
                    value: ArticleType.ALL,
                    content: t("Все статьи"),
                },
                {
                    value: ArticleType.IT,
                    content: t("Айти"),
                },
                {
                    value: ArticleType.ECONOMICS,
                    content: t("Экономика"),
                },
                {
                    value: ArticleType.SCIENCE,
                    content: t("Наука"),
                },
            ],
            [t]
        );

        const onTabClick = useCallback(
            (tab: TabItem) => {
                onChangeType(tab.value as ArticleType);
            },
            [onChangeType]
        );

        return (
            <Tabs
                tabs={typeTabs}
                value={value}
                onTabLick={onTabClick}
                className={classNames("", {}, [className])}
            />
        );
    }
);
