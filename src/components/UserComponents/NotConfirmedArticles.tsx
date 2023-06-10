import { FC, useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import { setCurrentPage, setCurrentTitle } from '../../store/reducers/articleSlice'
import Pagination from '../PaginationComponents/Pagination'
import ArticlesList from '../ArticleComponents/ArticlesList'
import { fetchArticlesBySearchThunk } from '../../store/action-creators/fetchArticlesBySearchThunk'
import { ArticlesInterface, ArticleInterface } from '../../types/articleTypes'
import styles from "../../styles/User.module.scss"

const NotConfirmedArticles: FC = () => {

  const dispatch = useAppDispatch();
  const { data, isArticlesError, currentPage } = useAppSelector(state => state.ArticleReducer)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(fetchArticlesBySearchThunk("", currentPage, null, null, "notconfirmed"))
      setLoading(false);
    })()
  }, [currentPage])
  useEffect(() => {
    return () => {
      dispatch(setCurrentPage(1));
      dispatch(setCurrentTitle(""));
    }
  }, [])

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className={styles.articlesNotConfirmedList}>
      <h1 className={styles.articlesNotConfirmedTitle}>Новые статьи</h1>
      {data.rows && data.rows.length > 0 ? <><ArticlesList notConfirmed={true} articles={{
        data: data as ArticlesInterface<ArticleInterface>,
        favArticles: false
      }} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} count={Math.ceil(data.count / 6)} />
      </> : <div>Новых статей нет</div>}
      {isArticlesError && <p>{isArticlesError}</p>}
    </div>
  )
}

export default NotConfirmedArticles