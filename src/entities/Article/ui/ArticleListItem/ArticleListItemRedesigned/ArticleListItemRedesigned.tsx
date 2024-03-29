import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleListItemRedesigned.module.scss";
import { ArticleListItemProps } from "../ArticleListItem";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Text } from "@/shared/ui/redesigned/Text";
import { Icon } from "@/shared/ui/redesigned/Icon";
import { ArticleBlockType, ArticleView } from "../../../model/const/const";
import { ArticleTextBlock } from "../../../model/types/article";
import { Card } from "@/shared/ui/redesigned/Card";
import { Avatar } from "@/shared/ui/redesigned/Avatar";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton";
import { AppLink } from "@/shared/ui/redesigned/AppLink";
import { Button } from "@/shared/ui/redesigned/Button";
import { getRouteArticleDetails } from "@/shared/const/router";
import EyeIcon from "@/shared/assets/icons/eye-icon.svg";

export const ArticleListItemRedesigned: FC<ArticleListItemProps> = memo(
    (props) => {
        const { t } = useTranslation("article");

        const { className, article, view, target } = props;

        const userInfo = (
            <>
                <Avatar
                    size={32}
                    src={article.user.avatar}
                    className={cls.avatar}
                />
                <Text bold text={article.user.username} />
            </>
        );
        const views = (
            <HStack gap='8'>
                <Icon Svg={EyeIcon} />
                <Text text={String(article.views)} className={cls.views} />
            </HStack>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                (block) => block.type === ArticleBlockType.TEXT
            ) as ArticleTextBlock;
            return (
                <Card
                    padding='24'
                    max
                    data-testid='ArticleListItem'
                    className={classNames("", {}, [className, cls[view]])}
                >
                    <VStack max gap='16'>
                        <HStack gap='8'>
                            {userInfo}
                            <Text text={article.createdAt} />
                        </HStack>
                        <Text title={article.title} bold />
                        <Text title={article.subtitle} size='s' />
                        <AppImage
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                            fallback={<Skeleton width='100%' height='200px' />}
                        />
                        {textBlock?.paragraphs && (
                            <Text
                                className={cls.textBlock}
                                text={textBlock.paragraphs.slice(0, 2).join()}
                            />
                        )}
                        <HStack max justify='between'>
                            <AppLink
                                target={target}
                                to={getRouteArticleDetails(article.id)}
                            >
                                <Button variant='outline'>
                                    {t("Читать далее...")}
                                </Button>
                            </AppLink>
                            {views}
                        </HStack>
                    </VStack>
                </Card>
            );
        }

        return (
            <AppLink
                data-testid='ArticleListItem'
                target={target}
                to={getRouteArticleDetails(article.id)}
                className={classNames("", {}, [className, cls[view]])}
            >
                <Card className={cls.card} border='partial' padding='0'>
                    <AppImage
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                        fallback={<Skeleton width='100%' height='200px' />}
                    />

                    <VStack className={cls.info} gap='4'>
                        <Text title={article.title} className={cls.title} />
                        <VStack gap='4' className={cls.footer} max>
                            <HStack justify='between' max>
                                <Text
                                    text={article.createdAt}
                                    className={cls.date}
                                />
                                {views}
                            </HStack>
                            <HStack gap='4'>{userInfo}</HStack>
                        </VStack>
                    </VStack>
                </Card>
            </AppLink>
        );
    }
);
