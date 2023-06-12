import { FC, useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { fetchArticlesThunk } from '../store/action-creators/fetchArticlesThunk'
import Header from '../components/GeneralComponents/Header'
import styles from "../styles/Main.module.scss"
import ArticlesContent from '../components/ArticleComponents/ArticlesContent'
import { hideBodyScroll } from '../utils/HideBodyScroll'
import MainPageSkeleton from '../components/SkeletonComponents/MainPageSkeleton'


const MainPage: FC = () => {


  const dispatch = useAppDispatch();
  const { headerArticles, isError } = useAppSelector(state => state.ArticleReducer)
  const [loading, setLoading] = useState<boolean>(true)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth"
      })
    }
    (async () => {
      await dispatch(fetchArticlesThunk())
      setLoading(false);
      hideBodyScroll("show")
    })()
    return () => {
      hideBodyScroll("show")
    }
  }, [])


  if (loading) {
    hideBodyScroll("hide");
    return <MainPageSkeleton ref={ref} />
  }

  if (isError || headerArticles.rows.length == 0) {
    return <div>{isError}</div>
  }

  return (
    <div className={styles.mainContentWrapper}>
      {headerArticles.rows.length >= 3 && <Header articles={headerArticles} />}
      <ArticlesContent typeOfArticles={"article"} />
    </div>
  )
}

export default MainPage