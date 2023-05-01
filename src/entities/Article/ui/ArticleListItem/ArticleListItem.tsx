import { FC, HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon } from "@/shared/ui/Icon";
import { Text } from "@/shared/ui/Text";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/Button";

import EyeIcon from "@/shared/assets/icons/eye.svg";
import { AppLink } from "@/shared/ui/AppLink";
import { Article, ArticleTextBlock } from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

import cls from "./ArticleListItem.module.scss";
import { ArticleBlockType, ArticleView } from "../../model/const/const";
import { getRouteArticleDetails } from "@/shared/const/router";
import { AppImage } from "@/shared/ui/AppImage";
import { Skeleton } from "@/shared/ui/Skeleton";

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo(
    ({ className, article, view, target }) => {
        const { t } = useTranslation("article");

        const types = (
            <Text text={article.type.join(", ")} className={cls.types} />
        );
        const views = (
            <>
                <Text text={String(article.views)} className={cls.views} />
                <Icon Svg={EyeIcon} />
            </>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                (block) => block.type === ArticleBlockType.TEXT
            ) as ArticleTextBlock;
            return (
                <div className={classNames("", {}, [className, cls[view]])}>
                    <Card>
                        <div className={cls.header}>
                            <Avatar size={30} src={article.user.avatar} />
                            <Text
                                text={article.user.username}
                                className={cls.username}
                            />
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                        </div>
                        <Text title={article.title} className={cls.title} />
                        {types}
                        <AppImage
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                            fallback={<Skeleton width='100%' height='200px' />}
                        />
                        {textBlock && (
                            <ArticleTextBlockComponent
                                block={textBlock}
                                className={cls.textBlock}
                            />
                        )}
                        <div className={cls.footer}>
                            <AppLink
                                target={target}
                                to={getRouteArticleDetails(article.id)}
                            >
                                <Button theme={ButtonTheme.OUTLINE}>
                                    {t("Читать далее...")}
                                </Button>
                            </AppLink>
                            {views}
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <AppLink
                target={target}
                to={getRouteArticleDetails(article.id)}
                className={classNames("", {}, [className, cls[view]])}
            >
                <Card>
                    <div className={cls.imageWrapper}>
                        <AppImage
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                            fallback={<Skeleton width='200px' height='200px' />}
                        />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                    <Text text={article.title} className={cls.title} />
                </Card>
            </AppLink>
        );
    }
);
