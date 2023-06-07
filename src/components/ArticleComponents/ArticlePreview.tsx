import { FC, memo, Dispatch, SetStateAction, ChangeEvent } from 'react'
import styles from "../../styles/Article.module.scss"


interface ArticleTitleProps {
  setArticlePreview: Dispatch<SetStateAction<File | null>>;
}

const ArticlePreview: FC<ArticleTitleProps> = ({ setArticlePreview }) => {


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArticlePreview(e.target.files[0]);
    }
  };


  return (
    <div className={styles.articlePreviewContainer}>
      <p className={styles.articlePreviewTitle}>Превью: </p>
      <div className={styles.articlePreviewWrapper}>
        <label htmlFor='avatar' className={styles.articlePreviwTitle} />
        <input onChange={(event) => handleFileChange(event)} className={styles.articlePreviwInput} type="file"
          id="avatar" name="avatar"
          accept="image/png, image/jpeg" />
      </div>
    </div>
  )
}

export default memo(ArticlePreview)