import { $private_host } from "../config"
import axios from "axios"

export const deleteComment = async (id: number) => {
  try {
    await $private_host.delete(`/api/comment/${id}`);
  }
  catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      alert("Не удалось удалить комментарий")
    }
  }
}