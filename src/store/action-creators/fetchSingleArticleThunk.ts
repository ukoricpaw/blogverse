import { AppDispatch } from ".."
import { SingleArticleInterface } from "../../types/articleTypes"
import axios from "axios"
import { fetchArticlesBySearch, fetchBySearchArticlesWithError, fetchSingleArticleWithError, fetchSingleArticleWithSuccess, setErrorNull } from "../reducers/articleSlice"
import { $private_host } from "../../axios/config"

export const fetchSingleArticleThunk = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchArticlesBySearch());
      dispatch(setErrorNull());
      const result = await $private_host.get<SingleArticleInterface>(`/api/article/${id}`);
      dispatch(fetchSingleArticleWithSuccess(result.data))
      return result.data;
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(fetchSingleArticleWithError(err.response?.data.message))
        return;
      }
      dispatch(fetchSingleArticleWithError("Произошла ошибка"))
    }
  }
}