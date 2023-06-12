import { FC, memo, Dispatch, SetStateAction, ChangeEvent, MouseEvent } from 'react'
import styles from "../../styles/Article.module.scss"
import { ArticleImage } from '../../types/articleTypes';


interface ArticleTitleProps {
  setArticlePreview: Dispatch<SetStateAction<File | null>>;
  articleImage?: ArticleImage[];
  setDeletedPreview?: Dispatch<SetStateAction<boolean>>;
  deletedPreview?: boolean;
  file?: File | null;
}

const ArticlePreview: FC<ArticleTitleProps> = ({ setArticlePreview, articleImage, setDeletedPreview, deletedPreview, file }) => {


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setDeletedPreview)
      setDeletedPreview(false)
    if (e.target.files) {
      setArticlePreview(e.target.files[0]);
    }
  };

  const setDeletedHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (setDeletedPreview)
      setDeletedPreview(true)
  }


  return (
    <div className={styles.articlePreviewContainer}>
      <p className={styles.articlePreviewTitle}>Превью: </p>
      {articleImage && articleImage.length > 0 ? <>
        {!deletedPreview && !file && <img className={styles.articlePreviewImage} src={`${process.env.REACT_APP_API_URL}/api/images/${articleImage[0].imgName}`} />}
        <div className={styles.buttonsPreview}>
          <div className={styles.articlePreviewWrapper}>
            <label htmlFor='avatar' className={styles.articlePreviwTitle} />
            <input onChange={(event) => handleFileChange(event)} className={styles.articlePreviwInput} type="file"
              id="avatar" name="avatar"
              accept="image/png, image/jpeg" />
          </div>
          {!deletedPreview && !file && <button onClick={(e) => setDeletedHandler(e)} className={styles.deleteImageButton}>Удалить</button>}
        </div>
      </>
        :
        <div className={styles.articlePreviewWrapper}>
          <label htmlFor='avatar' className={styles.articlePreviwTitle} />
          <input onChange={(event) => handleFileChange(event)} className={styles.articlePreviwInput} type="file"
            id="avatar" name="avatar"
            accept="image/png, image/jpeg" />
        </div>}
    </div>
  )
}

export default memo(ArticlePreview)