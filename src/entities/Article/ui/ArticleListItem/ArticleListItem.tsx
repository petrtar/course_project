import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { classNames } from "shared/lib/classNames/classNames";
import { Icon } from "shared/ui/Icon/Icon";
import { Text } from "shared/ui/Text/Text";
import { Card } from "shared/ui/Card/Card";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RouterPath } from "shared/config/routeConfig/routeConfig";

import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from "../../model/types/article";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";

import EyeIcon from "shared/assets/icons/eye.svg";

import cls from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo(({ className, article, view }) => {
  console.log("🚀 ~ constArticleListItem:FC<ArticleListItemProps>=memo ~ article:", article);
  const { t } = useTranslation("article");
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RouterPath.article_details + article.id);
  }, [navigate, article.id]);

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
    return (
      <div className={classNames("", {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} alt={article.title} className={cls.img} />
          {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}
          <div className={cls.footer}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onOpenArticle}>
              {t("Читать далее...")}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames("", {}, [className, cls[view]])}>
      <Card onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </div>
  );
});
