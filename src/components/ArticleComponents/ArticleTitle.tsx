import { FC, Dispatch, SetStateAction, memo } from 'react'
import styles from "../../styles/Article.module.scss"

interface ArticleTitleProps {
  articleTitle: string;
  setArticleTitle: Dispatch<SetStateAction<string>>;
}

const ArticleTitle: FC<ArticleTitleProps> = ({ articleTitle, setArticleTitle }) => {
  return (
    <div className={styles.articleTitle}>
      <label htmlFor={"title"} className={styles.articleLabel}>Заголовок</label>
      <input required id="title" value={articleTitle} className={styles.articleTitleInput}
        onChange={(event) =>
          setArticleTitle(event.target.value)} type={"text"} />
    </div>
  )
}

export default memo(ArticleTitle)