import axios from "axios"
import { $private_host } from "../config"

export const postNewArticle = async (articleId: number) => {
  try {
    const reqBody = {
      articleId
    }
    await $private_host.post("/api/article", reqBody)
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data.message;
    }
    return "Произошла ошибка"
  }
}