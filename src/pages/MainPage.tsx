import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { fetchArticlesThunk } from '../store/action-creators/fetchArticlesThunk'
import Header from '../components/GeneralComponents/Header'
import styles from "../styles/Main.module.scss"
import ArticlesContent from '../components/ArticleComponents/ArticlesContent'


const MainPage: FC = () => {


  const dispatch = useAppDispatch();
  const { headerArticles, isError } = useAppSelector(state => state.ArticleReducer)
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    (async () => {
      await dispatch(fetchArticlesThunk())
      setLoading(false);
    })()
  }, [])


  if (loading) {
    return <div>Loading..</div>
  }

  if (isError || headerArticles.rows.length == 0) {
    return <div>{isError}</div>
  }

  return (
    <div className={styles.mainContentWrapper}>
      <Header articles={headerArticles} />
      <ArticlesContent typeOfArticles={"article"} />
    </div>
  )
}

export default MainPage