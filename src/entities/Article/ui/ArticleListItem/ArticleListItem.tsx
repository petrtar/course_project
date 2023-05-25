import { FC, HTMLAttributeAnchorTarget, memo } from "react";

import { Article } from "../../model/types/article";

import { ArticleView } from "../../model/const/const";
import { ToggleFeatures } from "@/shared/lib/features";
import { ArticleListItemDeprecated } from "./ArticleListItemDeprecated/ArticleListItemDeprecated";
import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned";

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = memo((props) => {
    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            on={<ArticleListItemRedesigned {...props} />}
            off={<ArticleListItemDeprecated {...props} />}
        />
    );
});
