import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "@/shared/lib/classNames/classNames";
import {
    DynamicModuleLoader,
    ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton";
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
} from "@/shared/ui/deprecated/Text";
import { Text } from "@/shared/ui/redesigned/Text";
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

import cls from "./ArticleDetails.module.scss";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Icon } from "@/shared/ui/deprecated/Icon";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { RenderArticleBlock } from "./RenderBlock";
import { toggleFeatures, ToggleFeatures } from "@/shared/lib/features";
import { AppImage } from "@/shared/ui/redesigned/AppImage";

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

interface ArticleDetailsProps {
    className?: string;
    id?: string;
}

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <HStack justify='center' max>
                <Avatar size={200} src={article?.img} className={cls.avatar} />
            </HStack>
            <VStack gap='4' max data-testid='ArticleDetails.Info'>
                <TextDeprecated
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack gap='8'>
                    <Icon Svg={EyeIcon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>
                <HStack gap='8'>
                    <Icon Svg={CalendarIcon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>

            {article?.blocks.map(RenderArticleBlock)}
        </>
    );
};

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);

    return (
        <>
            <Text title={article?.title} size='l' bold />
            <Text title={article?.subtitle} />
            <AppImage
                fallback={
                    <SkeletonRedesigned
                        width='100%'
                        height={420}
                        border='16px'
                    />
                }
                src={article?.img}
                className={cls.img}
            />

            {article?.blocks.map(RenderArticleBlock)}
        </>
    );
};

const Skeleton = toggleFeatures({
    name: "isAppRedesigned",
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
});

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
    ({ className, id }) => {
        const { t } = useTranslation("article");
        const dispatch = useAppDispatch();

        const isLoading = useSelector(getArticleDetailsIsLoading);
        const error = useSelector(getArticleDetailsError);

        useInitialEffect(() => {
            dispatch(fetchArticleById(id));
        });

        let content;

        if (isLoading) {
            content = (
                <VStack gap='16' max>
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
                </VStack>
            );
        } else if (error) {
            content = (
                <TextDeprecated
                    align={TextAlign.CENTER}
                    title={t("Произошла ошибка при загрузке статьи")}
                />
            );
        } else {
            content = (
                <ToggleFeatures
                    feature='isAppRedesigned'
                    on={<Redesigned />}
                    off={<Deprecated />}
                />
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
