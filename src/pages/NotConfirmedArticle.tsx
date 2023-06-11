import { FC, useEffect, useCallback, useState } from 'react'
import SingleArticleContainer from '../components/ArticleComponents/SingleArticleContainer'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useParams } from 'react-router-dom';
import { setLoadHtml, fetchSingleArticleWithSuccess, setLoading } from '../store/reducers/articleSlice';
import { fetchSingleArticleThunk } from '../store/action-creators/fetchSingleArticleThunk';
import { SingleArticleInterface } from '../types/articleTypes';
import draftToHtml from 'draftjs-to-html';
import { SingleInfoProps } from '../types/articleTypes';
import styles from "../styles/SingleArticle.module.scss"
import { deleteNotConfirmedArticle } from '../axios/http/deleteNotConfirmedArticle';
import { useNavigate } from 'react-router-dom';
import { postNewArticle } from '../axios/http/postNewArticle';

const NotConfirmedArticle: FC = () => {

  let html = "";
  const { id } = useParams();
  const { currentArticle, isArticlesError, isLoadingArticles, loadHtml } = useAppSelector(state => state.ArticleReducer);
  const { data } = useAppSelector(state => state.UserReducer)
  const dispatch = useAppDispatch();
  const [resLoading, setResLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    window.scrollTo({
      top: 0,
    });
    (async () => {
      await dispatch(fetchSingleArticleThunk(Number(id), false))
      dispatch(setLoadHtml(false));
    })()
    return () => {
      dispatch(fetchSingleArticleWithSuccess({} as SingleArticleInterface))
      dispatch(setLoading(true));
      dispatch(setLoadHtml(true));
    }
  }, [])

  const deleteArticleHandler = async () => {
    setResLoading(true);
    await deleteNotConfirmedArticle(Number(id))
      .then(
        val => {
          setResLoading(false);
          if (typeof val === "string") {
            alert("Произошла ошибка");
            return
          }
          alert("Статья была удалена");
          navigate(`/user/${data.id}/admin`)
        }
      )
  }

  const postArticleHandler = async () => {
    setResLoading(true);
    await postNewArticle(Number(id))
      .then(
        val => {
          setResLoading(false);
          if (typeof val === "string") {
            alert("Произошла ошибка");
            return
          }
          alert("Статья была добавлена");
          navigate(`/user/${data.id}/admin`)
        }
      )
  }


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
    return <div>Загрузка...</div>
  }

  if (isArticlesError) {
    return <div>{isArticlesError}</div>
  }


  return (
    <div className="mainContainer">
      <div className='contentWrapperColumn'>
        <div className={styles.articleContainer}>
          <SingleArticleContainer func={callbackFunction} />
        </div>
        {resLoading ? <p className={styles.editButtons}>Пожалуйста подождите</p> : <div className={styles.editButtons}>
          <button onClick={deleteArticleHandler} className={styles.deleteNotConfirmedArticle}>Удалить</button>
          <button onClick={postArticleHandler} className={styles.addNotConfirmedArticle}>Добавить</button>
        </div>}
      </div>
    </div>
  )
}

export default NotConfirmedArticle