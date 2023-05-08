import { combineReducers } from "@reduxjs/toolkit";

import { ArticleDetailsPageSchema } from "../types";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";
import { articleDetailsRecommendationReducer } from "./articleDetailsPageRecommendationsSlice";

export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        recommendations: articleDetailsRecommendationReducer,
        comments: articleDetailsCommentsReducer,
    });
