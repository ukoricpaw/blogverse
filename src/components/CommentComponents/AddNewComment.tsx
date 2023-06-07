import { FC, useState, useEffect, Dispatch, SetStateAction, MouseEvent, memo } from 'react'
import styles from "../../styles/SingleArticle.module.scss"

interface AddNewCommentProps {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  submitComment: (e: MouseEvent<HTMLButtonElement>, description: string) => Promise<void>;
}

const AddNewComment: FC<AddNewCommentProps> = memo(({ setDescription, description, submitComment }) => {
  const [disabledState, setDisabledState] = useState<boolean>(true);
  useEffect(() => {
    if (description.trim() === "") {
      setDisabledState(true);
      return;
    }
    setDisabledState(false);
  }, [description])

  return (
    <form className={styles.addNewComment}>
      <textarea value={description} onChange={(e) => setDescription(e.target.value.split(" ").join(" "))} className={styles.textareaComment} placeholder='Напишите комментарий' />
      <button disabled={disabledState} onClick={(e) => submitComment(e, description)} className={styles.submitComment}>Отправить</button>
    </form>
  )
})

export default AddNewComment