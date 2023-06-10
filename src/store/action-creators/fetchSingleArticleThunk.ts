import { AppDispatch } from ".."
import { SingleArticleInterface } from "../../types/articleTypes"
import axios from "axios"
import { fetchArticlesBySearch, fetchSingleArticleWithError, fetchSingleArticleWithSuccess, setErrorNull } from "../reducers/articleSlice"
import { $private_host } from "../../axios/config"


export const fetchSingleArticleThunk = (id: number, confirmed: boolean) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchArticlesBySearch());
      dispatch(setErrorNull());
      let url = `/api/article/${id}`;
      if (!confirmed) {
        url = `/api/article/notconfirmed/${id}`;
      }
      const result = await $private_host.get<SingleArticleInterface>(url);
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