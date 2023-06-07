import { CommentBody } from "../../types/articleTypes";
import { $private_host } from "../config";

export const addNewComment = async (body: CommentBody) => {
  try {
    await $private_host.post(`api/comment/${body.id}`, body)
      .catch(err => alert("Произошла ошибка"))
  }
  catch (err: unknown) {
    return "Произошла ошибка"
  }
}