import { AppDispatch } from ".."
import { ArticleInterface, ArticleType, ArticlesInterface } from "../../types/articleTypes"
import axios from "axios"
import { fetchBySearchArticlesWithError, fetchBySearchArticlesWithSuccess, setErrorNull } from "../reducers/articleSlice"
import { $private_host, $public_host } from "../../axios/config"


type fetchType = "article" | "tag" | "user" | "favorite"

export const fetchArticlesBySearchThunk = (title: string, page: number,
  limit: number | null, type: ArticleType | null, fetchType: fetchType, tagId?: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setErrorNull());
    limit = limit || 6;
    type = type || "popular";
    let host = $public_host;
    let fetchingTypeArticles;
    if (fetchType === "favorite") {
      fetchingTypeArticles = "article/favorite/get"
      host = $private_host;
    }
    else {
      fetchingTypeArticles = fetchType === "article" ? "article" : fetchType === "tag" ? `tag/${tagId}` : `article/user/${tagId}`
    }
    try {
      let results;
      if (type === "popularnow") {
        results = await host.get<ArticlesInterface<ArticleInterface>>(`/api/${fetchingTypeArticles}?limit=${limit}&title=${title}&page=${page}&popular=true&now=true`)
      }
      else if (type === "popular") {
        results = await host.get<ArticlesInterface<ArticleInterface>>(`/api/${fetchingTypeArticles}?limit=${limit}&title=${title}&page=${page}&popular=true`)
      }
      else if (type === "now") {
        results = await host.get<ArticlesInterface<ArticleInterface>>(`/api/${fetchingTypeArticles}?limit=${limit}&title=${title}&page=${page}&now=true`)
      }
      else {
        results = await host.get<ArticlesInterface<ArticleInterface>>(`/api/${fetchingTypeArticles}?limit=${limit}&title=${title}&page=${page}`)
      }
      const data = { count: results.data.count, rows: results.data.rows.reverse(), tagName: results.data.tagName || null };
      dispatch(fetchBySearchArticlesWithSuccess(data));
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(fetchBySearchArticlesWithError(err.response?.data.message))
      }
      dispatch(fetchBySearchArticlesWithError("Произошла ошибка"))
    }
  }
}