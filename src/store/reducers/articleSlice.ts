import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ArticleInitialState, ArticlesInterface, SingleArticleInterface, ArticleInterface, TagArticle, FavoriteArticle } from "../../types/articleTypes";

const initialState: ArticleInitialState = {
  loadHtml: true,
  isError: null,
  isLoadingArticles: true,
  isArticlesError: null,
  data: {} as ArticlesInterface<ArticleInterface>,
  currentArticle: {} as SingleArticleInterface,
  currentPage: 1,
  headerArticles: {} as ArticlesInterface<ArticleInterface>,
  currentTitleState: "",
  tags: [],
}


const ArticleSlice = createSlice({
  name: "articleSlice",
  initialState,
  reducers: {
    fetchArticlesWithError(state, action: PayloadAction<string>) {
      state.isError = action.payload;
    },
    fetchHeaderArticles(state, action: PayloadAction<ArticlesInterface<ArticleInterface>>) {
      state.headerArticles = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    fetchBySearchArticlesWithError(state, action: PayloadAction<string>) {
      state.isArticlesError = action.payload;
    },
    fetchArticlesBySearch(state) {
      state.isLoadingArticles = true;
    },
    setErrorNull(state) {
      state.isArticlesError = null;
    },
    fetchBySearchArticlesWithSuccess(state, action:
      PayloadAction<ArticlesInterface<ArticleInterface> | ArticlesInterface<FavoriteArticle>>) {
      state.data = action.payload;
    },
    fetchTags(state, action: PayloadAction<TagArticle[]>) {
      state.tags = action.payload;
    },
    setCurrentTitle(state, action: PayloadAction<string>) {
      state.currentTitleState = action.payload;
    },
    fetchSingleArticleWithSuccess(state, action: PayloadAction<SingleArticleInterface>) {
      state.currentArticle = action.payload;
      state.isLoadingArticles = false;
    },
    fetchSingleArticleWithError(state, action: PayloadAction<string>) {
      state.isArticlesError = action.payload;
      state.isLoadingArticles = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingArticles = action.payload;
    },
    setLoadHtml(state, action: PayloadAction<boolean>) {
      state.loadHtml = action.payload;
    }
  }
})

export const
  { setLoadHtml, setErrorNull, fetchSingleArticleWithError, setLoading, fetchTags, fetchSingleArticleWithSuccess,
    setCurrentTitle, setCurrentPage, fetchArticlesBySearch,
    fetchBySearchArticlesWithError, fetchBySearchArticlesWithSuccess,
    fetchHeaderArticles, fetchArticlesWithError } = ArticleSlice.actions;
export default ArticleSlice.reducer;