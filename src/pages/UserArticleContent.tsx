import { FC, useState, useEffect, useMemo } from 'react'
import styles from "../styles/User.module.scss"
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import SearchArticle from '../components/ArticleComponents/SearchArticle'
import { setCurrentPage, setCurrentTitle } from '../store/reducers/articleSlice'
import { fetchArticlesBySearchThunk } from '../store/action-creators/fetchArticlesBySearchThunk'
import Pagination from '../components/PaginationComponents/Pagination'
import ArticlesList from '../components/ArticleComponents/ArticlesList'
import { FavArticleType } from '../types/articleTypes'

interface UserArticleContentProps {
  id?: number;
  articleType: "favorite" | "user";
}

const UserArticleContent: FC<UserArticleContentProps> = ({ id, articleType }) => {

  const dispatch = useAppDispatch();
  const { data, currentPage, isArticlesError, currentTitleState } = useAppSelector(state => state.ArticleReducer)
  const [title, setTitle] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(fetchArticlesBySearchThunk(title, currentPage, null, "popular", articleType, id))
      setLoading(false);
    })()
  }, [currentPage])

  useEffect(() => {
    return () => {
      dispatch(setCurrentTitle(""))
    }
  }, [])

  const getData = useMemo(() => {
    return {
      data: data,
      favArticles: articleType === "favorite" ? true : false
    } as FavArticleType
  }, [data])

  return (
    <div className={styles.blogWrapper}>
      {loading ? <></> : !isArticlesError ? data.count === 0 && title === ""
        && currentTitleState === "" ? <></> : <>
        <SearchArticle setLoading={setLoading} title={title} setTitle={setTitle}
          userId={id} getFavorite={articleType === "favorite" ? true : false} />
      </> : <></>}

      {loading ? <div>Loading...</div>
        : isArticlesError ? <div style={{ margin: "30px 0" }}>{isArticlesError}</div>
          : data.rows && data.count === 0 && title === "" && currentTitleState === "" ?
            articleType === "favorite" ? "Нет избранных статей" : "Нет статей" :
            data.rows.length > 0 ? <ArticlesList articles={
              getData
            } /> : "Статей по запросу не найдено"
      }
      {loading ? <></> : !isArticlesError && <Pagination currentPage={currentPage} count={Math.ceil(data.count / 6)} setCurrentPage={setCurrentPage} />}
    </div>
  )

}

export default UserArticleContent