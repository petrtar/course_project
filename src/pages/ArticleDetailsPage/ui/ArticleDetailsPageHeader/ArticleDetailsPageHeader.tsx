import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getArticleDetailsData } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";

import { HStack } from "@/shared/ui/Stack";
import { getCanEditArticle } from "../../model/selectors/article/article";
import { RouterPath } from "@/shared/const/router";

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(
    ({ className }) => {
        const { t } = useTranslation("article");
        const navigate = useNavigate();
        const article = useSelector(getArticleDetailsData);
        const canEdit = useSelector(getCanEditArticle);

        const onBackToList = useCallback(() => {
            navigate(RouterPath.articles);
        }, [navigate]);

        const onEditArticle = useCallback(() => {
            navigate(`${RouterPath.articles}/${article?.id}/edit`);
        }, [navigate, article?.id]);

        return (
            <HStack
                max
                justify='between'
                className={classNames("", {}, [className])}
            >
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t("Назад к списку")}
                </Button>
                {canEdit && (
                    <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
                        {t("Редактировать")}
                    </Button>
                )}
            </HStack>
        );
    }
);
