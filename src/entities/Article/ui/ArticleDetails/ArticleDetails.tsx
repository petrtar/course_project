import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { Text, TextAlign, TextSize } from "@/shared/ui/deprecated/Text";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import CalendarIcon from "@/shared/assets/icons/calendar.svg";

import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { ArticleBlock } from "../../model/types/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { ArticleBlockType } from "../../model/const/const";

import cls from "./ArticleDetails.module.scss";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Icon } from "@/shared/ui/deprecated/Icon";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
    ({ className, id }) => {
        const { t } = useTranslation("article");
        const dispatch = useAppDispatch();

        const isLoading = useSelector(getArticleDetailsIsLoading);
        const article = useSelector(getArticleDetailsData);
        const error = useSelector(getArticleDetailsError);

        const renderBlock = useCallback((block: ArticleBlock) => {
            switch (block.type) {
                case ArticleBlockType.CODE:
                    return (
                        <ArticleCodeBlockComponent
                            block={block}
                            key={block.id}
                        />
                    );
                case ArticleBlockType.IMAGE:
                    return (
                        <ArticleImageBlockComponent
                            block={block}
                            key={block.id}
                        />
                    );
                case ArticleBlockType.TEXT:
                    return (
                        <ArticleTextBlockComponent
                            block={block}
                            key={block.id}
                        />
                    );
                default:
                    return null;
            }
        }, []);

        useInitialEffect(() => {
            dispatch(fetchArticleById(id));
        });

        let content;

        if (isLoading) {
            content = (
                <>
                    <Skeleton
                        className={cls.avatar}
                        width={200}
                        height={200}
                        border='50%'
                    />
                    <Skeleton width={300} height={32} />
                    <Skeleton width={600} height={24} />
                    <Skeleton width='100%' height={200} />
                    <Skeleton width='100%' height={200} />
                </>
            );
        } else if (error) {
            content = (
                <Text
                    align={TextAlign.CENTER}
                    title={t("Произошла ошибка при загрузке статьи")}
                />
            );
        } else {
            content = (
                <>
                    <HStack justify='center' max>
                        <Avatar
                            size={200}
                            src={article?.img}
                            className={cls.avatar}
                        />
                    </HStack>
                    <VStack gap='4' max data-testid='ArticleDetails.Info'>
                        <Text
                            title={article?.title}
                            text={article?.subtitle}
                            size={TextSize.L}
                        />
                        <HStack gap='8'>
                            <Icon Svg={EyeIcon} />
                            <Text text={String(article?.views)} />
                        </HStack>
                        <HStack gap='8'>
                            <Icon Svg={CalendarIcon} />
                            <Text text={article?.createdAt} />
                        </HStack>
                    </VStack>

                    {article?.blocks.map(renderBlock)}
                </>
            );
        }

        return (
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
                <VStack
                    gap='16'
                    max
                    className={classNames(cls.ArticleDetails, {}, [className])}
                >
                    {content}
                </VStack>
            </DynamicModuleLoader>
        );
    }
);
