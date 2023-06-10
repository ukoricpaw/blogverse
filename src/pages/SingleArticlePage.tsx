import { FC, useEffect, useCallback } from 'react'
import { fetchSingleArticleThunk } from '../store/action-creators/fetchSingleArticleThunk'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { useParams } from 'react-router-dom'
import { fetchSingleArticleWithSuccess, setLoadHtml, setLoading } from '../store/reducers/articleSlice'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "../styles/SingleArticle.module.scss"
import mainStyles from "../styles/Main.module.scss"
import draftToHtml from "draftjs-to-html"
import ArticleOtherInfo from '../components/ArticleComponents/ArticleOtherInfo'
import CommentsContent from '../components/CommentComponents/CommentsContent'
import { SingleArticleInterface, SingleInfoProps } from '../types/articleTypes'
import SingleArticleContainer from '../components/ArticleComponents/SingleArticleContainer'
import ModalComponent from '../components/ArticleComponents/ModalComponent'

const SingleArticlePage: FC = () => {

  let html = "";
  const { id } = useParams();
  const { currentArticle, isArticlesError, isLoadingArticles, loadHtml } = useAppSelector(state => state.ArticleReducer);
  const { data } = useAppSelector(state => state.UserReducer)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!id) {
      return;
    }
    window.scrollTo({
      top: 0,
    });
    (async () => {
      await dispatch(fetchSingleArticleThunk(Number(id), true))
      dispatch(setLoadHtml(false));
    })()
    return () => {
      dispatch(fetchSingleArticleWithSuccess({} as SingleArticleInterface))
      dispatch(setLoading(true));
      dispatch(setLoadHtml(true));
    }
  }, [])


  const callbackFunction = useCallback(() => {
    if (currentArticle.description) {
      const contentState = JSON.parse(currentArticle.description);
      html = draftToHtml(contentState);
      const result = {
        info: {
          tag: currentArticle.tag,
          article_imgs: currentArticle.article_imgs,
          title: currentArticle.title
        },
        html: html
      }
      return result
    }
    return {} as SingleInfoProps;
  }, [loadHtml])

  if (isLoadingArticles && !currentArticle.description) {
    return <div>Loading...</div>
  }

  if (isArticlesError) {
    return <div className={styles.articlesError}>{isArticlesError}</div>
  }


  return (
    <div className="mainContainer">
      <div className='contentWrapperColumn'>
        <div className={styles.articleContainer}>
          <SingleArticleContainer func={callbackFunction} />
          <ArticleOtherInfo currentArticle={currentArticle} />
        </div>
        <div className={styles.articleCommentsContainer}>
          <div className={mainStyles.trashEdit}>
            {(data.id === currentArticle.user.id || data.role === "ADMIN") && <ModalComponent id={currentArticle.id} title={currentArticle.title} />}
          </div>
          <CommentsContent id={Number(id)} />
        </div>
      </div>
    </div>
  )
}

export default SingleArticlePage