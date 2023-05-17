import { FC, memo } from "react";
import { useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleDetails } from "@/entities/Article";
import {
    DynamicModuleLoader,
    ReducerList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "@/widgets/Page";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";

import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";

import { ArticleRating } from "@/features/articleRating";
import { ToggleFeatures } from "@/shared/lib/features";
import { Card } from "@/shared/ui/deprecated/Card";
import { VStack } from "@/shared/ui/redesigned/Stack";

const reducers: ReducerList = {
    articleDetailsPage: articleDetailsPageReducer,
};
interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
    const { t } = useTranslation("article");
    const { id } = useParams<{ id: string }>();

    if (!id) return null;

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames("", {}, [className])}>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ToggleFeatures
                        feature='isArticleRatingEnabled'
                        on={<ArticleRating articleId={id} />}
                        off={<Card>{t("Оценка статей скоро появится")}</Card>}
                    />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
