import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "entities/Article";

import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";
import { ArticleDetailsPageRecommendationsSchema } from "../types/ArticleDetailsPageRecommendationsSchema";

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecommendations =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articleDetailsPage?.recommendations ||
            recommendationsAdapter.getInitialState()
    );

export const articleDetailsPageRecommendationsSlice = createSlice({
    name: "articleDetailsPageRecommendationSlice",
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>(
            {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            }
        ),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleRecommendations.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    recommendationsAdapter.setAll(state, action.payload);
                }
            )
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { reducer: articleDetailsRecommendationReducer } =
    articleDetailsPageRecommendationsSlice;
