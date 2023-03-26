import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/providers/StoreProvider";

import { getArticlePageHasMore, getArticlePageIsLoading, getArticlePageNum } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlePage = createAsyncThunk<void, void, ThunkConfig<string>>("articlesPage/fetchNewArticlesPage", async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi;

  const hasMore = getArticlePageHasMore(getState());
  const page = getArticlePageNum(getState());
  const isLoading = getArticlePageIsLoading(getState());

  if (hasMore && !isLoading) {
    dispatch(articlesPageActions.setPage(page + 1));
    dispatch(fetchArticlesList({ page: page + 1 }));
  }
});
