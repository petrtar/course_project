import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { classNames } from "shared/lib/classNames/classNames";
import { ArticleDetails } from "entities/Article";

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div className={classNames("", {}, [className])}>{t("Статья не найдена")}</div>;
  }

  return (
    <div className={classNames("", {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
