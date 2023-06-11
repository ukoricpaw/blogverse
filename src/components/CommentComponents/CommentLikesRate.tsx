import { FC, useState } from 'react'
import styles from "../../styles/SingleArticle.module.scss"
import likeIcon from "../../assets/icons/like-1386-svgrepo-com.svg";
import dislikeIcon from "../../assets/icons/dislike.svg";
import likeActive from "../../assets/icons/like_active.svg";
import dislikeActive from "../../assets/icons/dislike_active.svg";
import { CommentInterface } from '../../types/articleTypes';
import { rateComment } from '../../utils/RateComment';

const CommentLikesRate: FC<{ comment: CommentInterface }> = ({ comment }) => {

  let rateByUserCondition;
  if (comment.user_comment_likes)
    rateByUserCondition = comment.user_comment_likes.length > 0 ?
      comment.user_comment_likes[0].isLike : null;
  const [commentLikes, setCommentLikes] = useState<number>(comment.likes)
  const [commentDislikes, setCommentDislikes] = useState<number>(comment.dislikes)
  const [userCommentsLikes, setUserCommentsLikes] = useState<boolean | null | undefined>(rateByUserCondition);
  const [disabled, setDisabled] = useState<boolean>(false);


  const likeComment = async () => {
    if (!disabled) {
      setDisabled(true);
      await rateComment("like", "comment", comment.id, userCommentsLikes, setCommentLikes, setCommentDislikes, setUserCommentsLikes);
      setTimeout(() => {
        setDisabled(false);
      }, 1000)
    }
  }
  const dislikeComment = async () => {
    if (!disabled) {
      setDisabled(true);

      await rateComment("dislike", "comment", comment.id, userCommentsLikes, setCommentDislikes, setCommentLikes, setUserCommentsLikes)
      setTimeout(() => {
        setDisabled(false);
      }, 1000)
    }
  }

  return (
    !comment.user_comment_likes ? <div className={styles.commentLikesRate}>
      <div className={styles.commentLikes}>
        <img className={styles.commentLikesIcon} style={{ cursor: "default" }} src={likeIcon} />
        <p className={styles.commentLikesCount} >{comment.likes}</p>
      </div>
      <div className={styles.commentDisLikes}>
        <img className={styles.commentDislikesIcon} style={{ cursor: "default" }} src={dislikeIcon} />
        <p className={styles.commentDislikesCount}>{comment.dislikes}</p>
      </div>
    </div> :
      <div className={styles.commentLikesRate}>
        <div onClick={likeComment} className={styles.commentLikes}>
          {userCommentsLikes ? <img className={styles.commentLikesIcon} src={likeActive} />
            : <img className={styles.commentLikesIcon} src={likeIcon} />
          }
          <p className={styles.commentLikesCount}>{commentLikes}</p>
        </div>
        <div onClick={dislikeComment} className={styles.commentDisLikes}>
          {userCommentsLikes === null ? <img className={styles.commentDislikesIcon} src={dislikeIcon} />
            : userCommentsLikes === false ? <img className={styles.commentDislikesIcon} src={dislikeActive} />
              : <img className={styles.commentDislikesIcon} src={dislikeIcon} />
          }
          <p className={styles.commentDislikesCount}>{commentDislikes}</p>
        </div>
      </div>

  )
}

export default CommentLikesRate