import { FC } from 'react'
import { CommentsListInterface } from '../../types/articleTypes'
import styles from "../../styles/SingleArticle.module.scss"
import CommentItem from './CommentItem'

const CommentsList: FC<{ comments: CommentsListInterface }> = ({ comments }) => {
  return (
    <div className={styles.commentsList}>
      <h3 className={styles.commentsTitle}>Комментарии:</h3>
      {comments.rows.map(comment => {
        return <CommentItem key={comment.id} comment={comment} />
      })}
    </div>
  )
}

export default CommentsList