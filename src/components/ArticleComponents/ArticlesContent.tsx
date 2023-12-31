import { FC, useEffect, useState, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import { fetchArticlesBySearchThunk } from '../../store/action-creators/fetchArticlesBySearchThunk'
import mainStyles from "../../styles/Main.module.scss"
import TagList from '../TagListComponents/TagList'
import { setCurrentPage, setCurrentTitle } from '../../store/reducers/articleSlice'
import { ArticleType } from '../../types/articleTypes'
import ArticlesContainer from './ArticlesContainer'
import { TypeArticleContext } from '../../utils/TypeOfArticleContext';
import { ArticleContext } from '../../utils/TypeOfArticleContext'
import { ArticlesInterface, ArticleInterface } from '../../types/articleTypes'



export interface ArticlesContentProps {
  typeOfArticles: "article" | "tag",
  tagId?: number;
}

const ArticlesContent: FC<ArticlesContentProps> = ({ typeOfArticles, tagId }) => {


  const dispatch = useAppDispatch();

  const { data, currentPage, isArticlesError, tags } = useAppSelector(state => state.ArticleReducer)
  const [title, setTitle] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);
  const [typeArticle, setType] = useState<ArticleType | null>(null);
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState<boolean>(false);



  const typeArticleContext: ArticleContext = {
    typeOfArticles: typeOfArticles,
    tagId: tagId,
    PopularNow: typeArticle
  }

  useEffect(() => {

    (async () => {
      setLoading(true);
      await dispatch(fetchArticlesBySearchThunk(title, currentPage, null, typeArticle, typeOfArticles, tagId))
      setLoading(false);
      if (mounted) {
        ref?.current?.scrollIntoView({
          behavior: "smooth"
        })
      }
      else {
        if (typeOfArticles === "tag") {
          ref?.current?.scrollIntoView({
            behavior: "smooth"
          })
          return;
        }
        setMounted(true)
      }
    })()
  }, [currentPage, tagId])



  useEffect(() => {
    return () => {
      dispatch(setCurrentPage(1));
      dispatch(setCurrentTitle(""))
    }
  }, [])



  return (
    <div ref={ref} className='articlesListContainer'>
      <div className='contentWrapper mainArticlesContainer'>
        <TypeArticleContext.Provider value={typeArticleContext}>
          <ArticlesContainer typeArticle={typeArticle} setCurrentPage={setCurrentPage}
            title={title} setTitle={setTitle} setLoading={setLoading}
            setType={setType} currentPage={currentPage} isArticlesError={isArticlesError}
            data={data as ArticlesInterface<ArticleInterface>} loading={loading} />
        </TypeArticleContext.Provider>
        <div className={mainStyles.tagsContainer}>
          <p className={mainStyles.tagsTitle}>Популярные тэги</p>
          <TagList tags={tags} />
        </div>
      </div>
    </div>
  )
}

export default ArticlesContent