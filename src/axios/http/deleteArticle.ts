import { $private_host } from "../config";
import axios from "axios";
export const deleteArticle = async (id: number) => {
  try {
    await $private_host.delete(`api/article/${id}`);
    return "Статья была удалена"
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data.message;
    }
    return "Произошла ошибка"
  }
}