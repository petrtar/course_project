import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "../ArticleListItem.module.scss";
import { ArticleListItemProps } from "../ArticleListItem";
import { Icon } from "@/shared/ui/deprecated/Icon";
import { Card } from "@/shared/ui/deprecated/Card";
import { Avatar } from "@/shared/ui/deprecated/Avatar";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton";
import { ArticleTextBlockComponent } from "../../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { AppLink } from "@/shared/ui/deprecated/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { getRouteArticleDetails } from "@/shared/const/router";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { Text } from "@/shared/ui/deprecated/Text/Text";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import { ArticleBlockType, ArticleView } from "../../../model/const/const";
import { ArticleTextBlock } from "../../../model/types/article";

export const ArticleListItemDeprecated: FC<ArticleListItemProps> = memo(
    (props) => {
        const { t } = useTranslation("article");

        const { className, article, view, target } = props;

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
