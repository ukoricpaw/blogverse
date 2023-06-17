import { FC, Dispatch, SetStateAction, MouseEvent, useState, useEffect, useContext } from 'react'
import styles from "../../styles/Article.module.scss"
import searchIcon from "../../assets/icons/searchIcon.png"
import { fetchArticlesBySearchThunk } from '../../store/action-creators/fetchArticlesBySearchThunk'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { setCurrentTitle } from '../../store/reducers/articleSlice'
import { TypeArticleContext } from '../../utils/TypeOfArticleContext'

interface SearchArticleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  userId?: number;
  getFavorite?: boolean;
}

const SearchArticle: FC<SearchArticleProps> = ({ setTitle, title, setLoading, userId, getFavorite }) => {

  const { PopularNow, typeOfArticles, tagId } = useContext(TypeArticleContext)

  const { currentTitleState } = useAppSelector(state => state.ArticleReducer)
  const dispatch = useAppDispatch();
  const [disabledState, setDisabledState] = useState<boolean>(true);
  const searchByTitle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true);
    if (getFavorite) {
      await dispatch(fetchArticlesBySearchThunk(title, 1, null, "popular", "favorite", userId));
    }
    else if (userId) {
      await dispatch(fetchArticlesBySearchThunk(title, 1, null, "popular", "user", userId));
    }
    else {
      await dispatch(fetchArticlesBySearchThunk(title, 1, null, PopularNow, typeOfArticles, tagId));
    }
    setLoading(false);
    dispatch(setCurrentTitle(title));
    setDisabledState(true);
  }

  useEffect(() => {
    if (title.trim().toLowerCase() !== currentTitleState.toLowerCase()) {
      setDisabledState(false);
    }
    else setDisabledState(true);
  }, [title])


  return (
    <div className={styles.inputWrapper}>
      <button disabled={disabledState} onClick={searchByTitle} className={styles.searchWrapper}>
        <p>Найти</p>
        <img className={styles.searchIcon} src={searchIcon} alt="searchIcon" />
      </button>
      <input className={styles.searchInput} id="searchInput" type='text' value={title} onChange={(event) => setTitle(event.target.value)} />
    </div>
  )
}

export default SearchArticle