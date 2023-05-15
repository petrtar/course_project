import { FC, HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/deprecated/Text";

import EyeIcon from "@/shared/assets/icons/eye.svg";
import { Article, ArticleTextBlock } from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

import cls from "./ArticleListItem.module.scss";
import { ArticleBlockType, ArticleView } from "../../model/const/const";
import { getRouteArticleDetails } from "@/shared/const/router";
import { AppImage } from "@/shared/ui/deprecated/AppImage";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { AppLink } from "@/shared/ui/deprecated/AppLink";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { Card } from "@/shared/ui/deprecated/Card";
import { Icon } from "@/shared/ui/deprecated/Icon";

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
                <div
                    data-testid='ArticleListItem'
                    className={classNames("", {}, [className, cls[view]])}
                >
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
                data-testid='ArticleListItem'
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
