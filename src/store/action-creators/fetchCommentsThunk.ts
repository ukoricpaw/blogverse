import { AppDispatch } from ".."
import axios from "axios"
import { fetchComments, fetchCommentsWithError, fetchCommentsWithSuccess } from "../reducers/commentsSlice"
import { $private_host } from "../../axios/config"
import { CommentsListInterface } from "../../types/articleTypes"

export const fetchCommentsThunk = (articleId: number, currentPage: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const setPageCondition = currentPage === 0 ? 1 : currentPage
      const results = await $private_host.get<CommentsListInterface>(`/api/comment/${articleId}?page=${setPageCondition}`);
      dispatch(fetchCommentsWithSuccess(results.data));
    }
    catch (err) {
      if (axios.isAxiosError(err)) {
        dispatch(fetchCommentsWithError(err.response?.data.message));
        return;
      }
      dispatch(fetchCommentsWithError("Произошла ошибка"));
    }
  }
}