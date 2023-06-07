import { AppDispatch } from ".."
import { ArticleInterface, ArticlesInterface, TagArticle } from "../../types/articleTypes"
import axios from "axios"
import { fetchArticlesWithError, fetchHeaderArticles, fetchTags } from "../reducers/articleSlice"
import { $public_host } from "../../axios/config"


export const fetchArticlesThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let results, tags;
      results = await $public_host.get<ArticlesInterface<ArticleInterface>>(`/api/article?limit=10&popular=true`);
      tags = await $public_host.get<TagArticle[]>(`/api/tag?limit=15`);
      dispatch(fetchTags(tags.data));
      dispatch(fetchHeaderArticles(results.data))
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(fetchArticlesWithError(err.response?.data.message))
      }
      dispatch(fetchArticlesWithError("Произошла ошибка"))
    }
  }
}