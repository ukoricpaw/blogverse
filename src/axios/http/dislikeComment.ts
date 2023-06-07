import { $private_host } from "../config"
import axios from "axios"

export const dislikeComment = async (id: number, contentType: "comment" | "article") => {
  try {
    const likeBody = {
      isLike: false
    }
    await $private_host.post(`api/${contentType}/likes/${id}`, likeBody);
  }
  catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      alert("Ошибка")
    }
  }
}