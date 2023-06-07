import { FC, useEffect, useRef, MouseEvent, useCallback, useState, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchCommentsThunk } from '../../store/action-creators/fetchCommentsThunk';
import AddNewComment from './AddNewComment';
import styles from "../../styles/SingleArticle.module.scss"
import CommentsList from './CommentsList';
import Pagination from '../PaginationComponents/Pagination';
import { setCurrentPage } from '../../store/reducers/commentsSlice';
import { addNewComment } from '../../axios/http/addNewComment';
import { fetchComments } from '../../store/reducers/commentsSlice';

const CommentsContent: FC<{ id: number | undefined }> = memo(({ id }) => {

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);


  const isAuth = useAppSelector(state => state.UserReducer.isAuth)
  const { isLoading, isError, comments, currentPage } = useAppSelector(state => state.CommentsReducer)
  const [description, setDescription] = useState<string>("")

  const submitComment = useCallback(async (e: MouseEvent<HTMLButtonElement>, description: string) => {
    dispatch(setCurrentPage(currentPage === 0 ? 1 : 0))
    e.preventDefault();
    await addNewComment({ id: Number(id), description: description }).then(value =>
      ref.current?.focus()
    );
    setDescription("")
  }, [description])


  useEffect(() => {
    dispatch(fetchComments());
    dispatch(setCurrentPage(1));
  }, [])

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchCommentsThunk(id, currentPage)).then(

    )
  }, [currentPage])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{isError}</div>
  }
  return (
    <div ref={ref} tabIndex={0} className={styles.commentsContent}>
      {isAuth && <AddNewComment description={description} setDescription={setDescription} submitComment={submitComment} />}
      {comments.rows.length > 0 ? <>
        <CommentsList comments={comments} />
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} count={Math.ceil(comments.count / 10)} />
      </>
        : <div className={styles.noComments}>Комментариев нет</div>
      }
    </div>
  )
})

export default CommentsContent