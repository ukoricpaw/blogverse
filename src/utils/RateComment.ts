import { likeComment } from "../axios/http/likeComment"
import { dislikeComment } from "../axios/http/dislikeComment"
import { unlikeComment } from "../axios/http/unlikeComment"
import { UserArticleLikes, UserCommentLikes } from "../types/articleTypes";

export const rateComment = async (type: "like" | "dislike", contentType: "comment" | "article", id: number, comment_likes: UserCommentLikes[] | UserArticleLikes[] | undefined) => {
  if (type === "like") {
    if (comment_likes && comment_likes.length === 0) {
      await likeComment(id, contentType);
    }
    else if (comment_likes && comment_likes[0].isLike === false) {
      await unlikeComment(id, contentType);
      await likeComment(id, contentType);
    }
    else if (comment_likes && comment_likes[0].isLike === true) {
      await unlikeComment(id, contentType);
    }
  }
  else {
    if (comment_likes && comment_likes.length === 0) {
      await dislikeComment(id, contentType);
    }
    else if (comment_likes && comment_likes[0].isLike === true) {
      await unlikeComment(id, contentType);
      await dislikeComment(id, contentType);
    }
    else if (comment_likes && comment_likes[0].isLike === false) {
      await unlikeComment(id, contentType);
    }
  }
}