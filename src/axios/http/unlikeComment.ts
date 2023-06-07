import { $private_host } from "../config"
import axios from "axios"

export const unlikeComment = async (id: number, contentType: "comment" | "article") => {
  try {
    await $private_host.get(`/api/${contentType}/likes/remove/${id}`);
  }
  catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      alert("Произошла ошибка")
    }
  }
}