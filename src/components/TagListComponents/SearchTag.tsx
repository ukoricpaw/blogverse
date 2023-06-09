import { FC, memo, Dispatch, SetStateAction, useContext } from 'react'
import styles from "../../styles/Article.module.scss"
import { tagWindowContext } from '../../utils/TagWindowContext';
import crossIcon from "../../assets/icons/crossIconRed.png"


interface ArticleTagProps {
  articleTag: string;
  setArticleTag: Dispatch<SetStateAction<string>>;
}
const SearchTag: FC<ArticleTagProps> = ({ articleTag, setArticleTag }) => {

  const { choosedTag, setChoosedTag, setTagId, setTags, setTitle } = useContext(tagWindowContext)

  const removeChoosedTagHandler = () => {
    setChoosedTag(null);
    setTagId(null);
    setTags(null);
    setTitle("");
  }

  return (
    <div className={styles.tagContainer}>
      {choosedTag ? <div className={styles.choosedTagContainer}>
        #{choosedTag} <img onClick={removeChoosedTagHandler} className={styles.crossIconTag} src={crossIcon} />
      </div> : <>
        <label htmlFor='tag' className={styles.chooseTag}>Выберите тэг</label>
        <input required value={articleTag} id='tag' type='text' onChange={(event) => setArticleTag(event.target.value)} className={styles.tagInput} />
      </>}
    </div>
  )
}

export default memo(SearchTag)