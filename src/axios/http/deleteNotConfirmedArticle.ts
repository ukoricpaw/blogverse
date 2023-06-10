import { $private_host } from "../config";
import axios from "axios";

export const deleteNotConfirmedArticle = async (articleId: number) => {
  try {
    const response = await $private_host.delete(`/api/article/notconfirmed/${articleId}`)
    return response;
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data.message;
    }
    return "Произошла ошибка"
  }
}