import { likeComment } from "../axios/http/likeComment"
import { dislikeComment } from "../axios/http/dislikeComment"
import { unlikeComment } from "../axios/http/unlikeComment"
import { Dispatch, SetStateAction } from "react";



export const rateComment = async (type: "like" | "dislike", contentType: "comment" | "article", id: number,
  comment_likes: boolean | null | undefined,
  setRate: Dispatch<SetStateAction<number>>, setAnotherRate: Dispatch<SetStateAction<number>>,
  setUserArticleLikes: Dispatch<SetStateAction<boolean | null | undefined>>
) => {
  if (comment_likes === undefined) {
    return;
  }
  if (type === "like") {
    if (comment_likes === null) {
      setRate(prev => prev + 1);
      setUserArticleLikes(true);
      await likeComment(id, contentType);
    }
    else if (comment_likes === false) {
      setRate(prev => prev + 1);
      setAnotherRate(prev => prev - 1);
      setUserArticleLikes(true);
      await unlikeComment(id, contentType);
      await likeComment(id, contentType);
    }
    else if (comment_likes === true) {
      setRate(prev => prev - 1);
      setUserArticleLikes(null);
      await unlikeComment(id, contentType);
    }
  }
  else {
    if (comment_likes === null) {
      setRate(prev => prev + 1);
      setUserArticleLikes(false);
      await dislikeComment(id, contentType);
    }
    else if (comment_likes === true) {
      setRate(prev => prev + 1);
      setAnotherRate(prev => prev - 1);
      setUserArticleLikes(false);
      await unlikeComment(id, contentType);
      await dislikeComment(id, contentType);
    }
    else if (comment_likes === false) {
      setRate(prev => prev - 1);
      setUserArticleLikes(null);
      await unlikeComment(id, contentType);
    }
  }
}