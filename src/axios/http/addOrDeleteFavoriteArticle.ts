import { $private_host } from "../config";


type typeOfActFavorite = "delete" | "add";

export const addOrDeleteFavoriteArticle = async (articleId: number, act: typeOfActFavorite) => {
  try {
    const body = {
      articleId,
    }
    if (act === "add") {
      await $private_host.post("api/article/favorite/add", body);
    }
    else {
      await $private_host.delete("api/article/favorite/delete", { data: body });
    }

  }
  catch (err) {
    return err;
  }
}