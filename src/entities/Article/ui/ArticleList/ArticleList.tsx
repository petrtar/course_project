import { FC, HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/deprecated/Text";

import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleView } from "../../model/const/const";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

import cls from "./ArticleList.module.scss";
import { ToggleFeatures } from "@/shared/lib/features";
import { HStack } from "@/shared/ui/redesigned/Stack";

const getSkeleton = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                key={index}
                view={view}
                className={cls.card}
            />
        ));
};

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleList: FC<ArticleListProps> = memo(
    ({ className, articles, isLoading, view = ArticleView.SMALL, target }) => {
        const { t } = useTranslation("article");

        if (!isLoading && !articles.length) {
            return (
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Text size={TextSize.L} title={t("Статьи не найдены")} />
                </div>
            );
        }

        return (
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <HStack
                        wrap='wrap'
                        gap='16'
                        className={classNames(
                            cls.ArticleListRedesigned,
                            {},
                            []
                        )}
                        data-testid='ArticleList'
                    >
                        {articles.map((article) => (
                            <ArticleListItem
                                key={article.id}
                                className={cls.card}
                                article={article}
                                view={view}
                                target={target}
                            />
                        ))}
                        {isLoading && getSkeleton(view)}
                    </HStack>
                }
                off={
                    <div
                        className={classNames(cls.ArticleList, {}, [
                            className,
                            cls[view],
                        ])}
                        data-testid='ArticleList'
                    >
                        {articles.map((article) => (
                            <ArticleListItem
                                key={article.id}
                                className={cls.card}
                                article={article}
                                view={view}
                                target={target}
                            />
                        ))}
                        {isLoading && getSkeleton(view)}
                    </div>
                }
            />
        );
    }
);
