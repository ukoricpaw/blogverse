import { $private_host } from "../config"
import axios from "axios"

export const likeComment = async (id: number, contentType: "comment" | "article") => {
  try {
    const likeBody = {
      isLike: true
    }
    await $private_host.post(`api/${contentType}/likes/${id}`, likeBody);
  }
  catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return err;
    }
  }
}