import { FC } from 'react'
import styles from "../../styles/SingleArticle.module.scss"
import likeIcon from "../../assets/icons/like-1386-svgrepo-com.svg";
import dislikeIcon from "../../assets/icons/dislike.svg";
import likeActive from "../../assets/icons/like_active.svg";
import dislikeActive from "../../assets/icons/dislike_active.svg";
import { CommentInterface } from '../../types/articleTypes';
import { rateComment } from '../../utils/RateComment';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchCommentsThunk } from '../../store/action-creators/fetchCommentsThunk';

const CommentLikesRate: FC<{ comment: CommentInterface }> = ({ comment }) => {

  let rateByUserCondition;
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector(state => state.CommentsReducer)
  if (comment.user_comment_likes)
    rateByUserCondition = comment.user_comment_likes.length > 0 ?
      comment.user_comment_likes[0].isLike : null;

  const likeComment = async () => {
    await rateComment("like", "comment", comment.id, comment.user_comment_likes);
    dispatch(fetchCommentsThunk(comment.articleId, currentPage));
  }
  const dislikeComment = async () => {
    await rateComment("dislike", "comment", comment.id, comment.user_comment_likes)
    dispatch(fetchCommentsThunk(comment.articleId, currentPage));
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
          {rateByUserCondition ? <img className={styles.commentLikesIcon} src={likeActive} />
            : <img className={styles.commentLikesIcon} src={likeIcon} />
          }
          <p className={styles.commentLikesCount}>{comment.likes}</p>
        </div>
        <div onClick={dislikeComment} className={styles.commentDisLikes}>
          {rateByUserCondition === null ? <img className={styles.commentDislikesIcon} src={dislikeIcon} />
            : rateByUserCondition === false ? <img className={styles.commentDislikesIcon} src={dislikeActive} />
              : <img className={styles.commentDislikesIcon} src={dislikeIcon} />
          }
          <p className={styles.commentDislikesCount}>{comment.dislikes}</p>
        </div>
      </div>

  )
}

export default CommentLikesRate