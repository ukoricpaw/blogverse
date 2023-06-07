import { FC, memo, Dispatch, SetStateAction } from 'react'
import styles from "../../styles/Article.module.scss"


interface ArticleTagProps {
  articleTag: string;
  setArticleTag: Dispatch<SetStateAction<string>>;
}
const SearchTag: FC<ArticleTagProps> = ({ articleTag, setArticleTag }) => {


  return (
    <div className={styles.tagContainer}>
      <label htmlFor='tag' className={styles.chooseTag}>Выберите тэг</label>
      <input required value={articleTag} id='tag' type='text' onChange={(event) => setArticleTag(event.target.value)} className={styles.tagInput} />
    </div>
  )
}

export default memo(SearchTag)