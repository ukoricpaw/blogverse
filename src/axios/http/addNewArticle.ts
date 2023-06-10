import { $private_host } from "../config";
import { NewArticleBody } from "../../types/articleTypes"

export const addNewArticle = async (body: NewArticleBody) => {
  try {
    const formData: FormData = new FormData();
    formData.append("title", body.title);
    formData.append("tag_id", body.tag_id.toString());
    formData.append("description", body.description);
    if (body.preview) {
      formData.append("preview", body.preview)
    }
    await $private_host.post("api/article/add", formData)
      .then(() => alert("Статья будет рассмотрена модерацией"))
      .catch(err => alert("Произошла ошибка"))
  }
  catch (err: unknown) {
    return "Произошла ошибка"
  }
}