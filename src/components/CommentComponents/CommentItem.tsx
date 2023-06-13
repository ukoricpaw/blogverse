import { FC, useState, useEffect, MouseEvent } from 'react';
import { CommentInterface } from '../../types/articleTypes';
import styles from "../../styles/SingleArticle.module.scss";
import UserItem from '../UserComponents/UserItem';
import { parseDate } from '../../utils/ParseDate';
import eyeIcon from "../../assets/icons/303-3037570_eye-logo-png.png"
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import crossIcon from "../../assets/icons/crossIcon.png";
import { deleteComment } from '../../axios/http/deleteComment';
import { fetchCommentsThunk } from '../../store/action-creators/fetchCommentsThunk';
import CommentLikesRate from './CommentLikesRate';
import { Link } from 'react-router-dom';
import { useInView } from "react-intersection-observer"
import { viewedComment } from '../../axios/http/viewedComment';

const CommentItem: FC<{ comment: CommentInterface }> = ({ comment }) => {

  const createdAt = parseDate(comment.createdAt);
  const dispatch = useAppDispatch();
  const { data, isAuth } = useAppSelector(state => state.UserReducer)
  const { currentPage } = useAppSelector(state => state.CommentsReducer)
  const [showWindow, setShowWindow] = useState<boolean>(true);
  const [loadingOfDeleting, setLoadingOfDeleting] = useState<boolean>(false);

  const handleDeleteComment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLoadingOfDeleting(true);
    deleteComment(comment.id).then(() => {
      dispatch(fetchCommentsThunk(comment.articleId, currentPage));
    })
      .catch(() => {
        setLoadingOfDeleting(false);
      })
  }

  const { ref, inView } = useInView(
    {
      triggerOnce: true,
      threshold: 1
    }
  )

  useEffect(() => {
    if (inView) {
      viewedComment(comment.id);
    }
  }, [inView])

  return (
    <div ref={ref} className={styles.commentContainer}>
      <div className={styles.commentInfo}>
        <div className={styles.userInfo}>
          <Link to={`/user/${comment.user.id}`}><UserItem width={40} height={40} data={comment.user} /></Link>
          <p className={styles.userInfo__username}>{comment.user.username}</p>
        </div>
        <div className={styles.commentOtherInfo}>
          <p className={styles.createdAt}>{createdAt}</p>
          <div className={styles.commentRate}>
            <div className={styles.commentViews}>
              <img className={styles.commentViewsIcon} src={eyeIcon} />
              <p className={styles.commentViewsCount}>{comment.views}</p>
            </div>
            {!loadingOfDeleting && <CommentLikesRate comment={comment} />}
            {isAuth && !loadingOfDeleting && (data?.id === comment.userId || data.role === "ADMIN") && <div onClick={() => { setShowWindow(prev => !prev) }} className={styles.deleteComment}>
              <p className={styles.commentDelete}>Удалить</p>
              <img className={styles.commentDeleteIcon} src={crossIcon} title='Удалить' />
              {!showWindow && <div className={styles.hiddenWindow}>
                <p className={styles.deleteMessage}>Удалить?</p>
                <div className={styles.deleteMessageBtns}>
                  <button onClick={(event) => handleDeleteComment(event)} className={styles.delete}>Удалить</button>
                  <button onClick={() => setShowWindow(false)} className={styles.cancel}>Отмена</button>
                </div>
              </div>}
            </div>}
          </div>
        </div>
      </div>
      <p className={styles.commentDescription}>
        {comment.description}
      </p>
    </div>
  )
}

export default CommentItem