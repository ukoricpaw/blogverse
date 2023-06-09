import { $private_host } from "../config";
import { NewArticleBody } from "../../types/articleTypes"

export const updateArticle = async (id: number, body: NewArticleBody) => {
  try {
    const formData: FormData = new FormData();
    formData.append("title", body.title);
    formData.append("tag_id", body.tag_id.toString());
    formData.append("description", body.description);
    if (body.delete_img) {
      formData.append("delete_img", String(body.delete_img));
    }
    if (body.preview) {
      formData.append("preview", body.preview)
    }
    await $private_host.put(`api/article/${id}`, formData)
      .then(() => alert("Статья была обновлена"))
      .catch(err => alert("Произошла ошибка"))
  }
  catch (err: unknown) {
    return "Произошла ошибка"
  }
}