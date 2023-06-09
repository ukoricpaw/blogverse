import { $public_host } from "../config"
import axios from "axios"

export const viewedArticle = (id: number) => {
  try {
    $public_host.get(`/api/article/views/${id}`);
  }
  catch (err) {
    if (axios.isAxiosError(err))
      console.log(err.response?.data.message)
  }
}