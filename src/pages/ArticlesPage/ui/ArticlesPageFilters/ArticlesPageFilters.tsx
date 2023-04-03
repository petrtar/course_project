import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "shared/lib/classNames/classNames";
import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleTypeTabs,
    ArticleView,
    ArticleViewSelector,
} from "entities/Article";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { Card } from "shared/ui/Card/Card";
import { Input } from "shared/ui/Input/Input";
import { SortOrder } from "shared/types";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";

import { ArticleType } from "entities/Article/model/types/article";
import {
    getArticlePageOrder,
    getArticlePageSearch,
    getArticlePageSort,
    getArticlePageType,
    getArticlePageView,
} from "../../model/selectors/articlesPageSelectors";
import { articlesPageActions } from "../../model/slices/articlesPageSlice";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";

import cls from "./ArticlesPageFilters.module.scss";

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
    ({ className }) => {
        const { t } = useTranslation("article");

        const dispatch = useAppDispatch();

        const view = useSelector(getArticlePageView);
        const sort = useSelector(getArticlePageSort);
        const order = useSelector(getArticlePageOrder);
        const search = useSelector(getArticlePageSearch);
        const type = useSelector(getArticlePageType);

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, [dispatch]);

        const debounceFetchData = useDebounce(fetchData, 500);

        const onChangeView = useCallback(
            (view: ArticleView) => {
                dispatch(articlesPageActions.setView(view));
            },
            [dispatch]
        );

        const onChangeSort = useCallback(
            (sewSort: ArticleSortField) => {
                dispatch(articlesPageActions.setSort(sewSort));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData]
        );

        const onChangeOrder = useCallback(
            (newOrder: SortOrder) => {
                dispatch(articlesPageActions.setOrder(newOrder));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData]
        );

        const onChangeSearch = useCallback(
            (search: string) => {
                dispatch(articlesPageActions.setSearch(search));
                dispatch(articlesPageActions.setPage(1));
                debounceFetchData();
            },
            [debounceFetchData, dispatch]
        );

        const onChangeType = useCallback(
            (value: ArticleType) => {
                dispatch(articlesPageActions.setType(value));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData]
        );

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
