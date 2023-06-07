import { TagArticle } from "../../types/articleTypes"
import { $public_host } from "../config"

export const searchTagReq = async (title: string) => {
  const results = await $public_host.get<TagArticle[]>(`api/tag?title=${title}`);
  return results;
}