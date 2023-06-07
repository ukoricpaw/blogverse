import { FC, useContext, Dispatch, SetStateAction } from 'react'
import styles from "../../styles/Article.module.scss"
import { fetchArticlesBySearchThunk } from '../../store/action-creators/fetchArticlesBySearchThunk'
import { ArticleType } from '../../types/articleTypes'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { setCurrentPage } from '../../store/reducers/articleSlice'
import { TypeArticleContext } from '../../utils/TypeOfArticleContext'

interface PopularNewProps {
  typeArticle: ArticleType | null;
  setType: Dispatch<SetStateAction<ArticleType | null>>;
}

const PopularNew: FC<PopularNewProps> = ({ typeArticle, setType }) => {

  const { typeOfArticles, tagId } = useContext(TypeArticleContext)

  const dispatch = useAppDispatch();
  const handleClick = (type: ArticleType) => {
    if (type === typeArticle) return;
    if (type === "popular") {
      dispatch(fetchArticlesBySearchThunk("", 1, null, "popular", typeOfArticles, tagId));
      dispatch(setCurrentPage(1));
    }
    else {
      dispatch(fetchArticlesBySearchThunk("", 1, null, "now", typeOfArticles, tagId));
      dispatch(setCurrentPage(1));
    }
    setType(type);
  }

  return (
    <div className={styles.changeTypeButton}>
      <p onClick={() => handleClick("popular")} className={styles.changeTypeItem}>Популярные</p>
      |
      <p onClick={() => handleClick("now")} className={styles.changeTypeItem}>Новые</p>
    </div>
  )
}

export default PopularNew