import { FC, useEffect } from 'react'
import styles from "../../styles/SingleArticle.module.scss"
import defaultAvatar from "../../assets/imgs/default-avatar-profile.jpg"
import eyeIcon from "../../assets/icons/303-3037570_eye-logo-png.png"
import { SingleArticleInterface } from '../../types/articleTypes'
import ArticleLikesRate from './ArticleLikesRate'
import AddFavoriteArticle from './AddFavoriteArticle'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { viewedArticle } from '../../axios/http/viewedArticle'



interface ArticleOtherInfoProps {
  currentArticle: SingleArticleInterface;
}

const ArticleOtherInfo: FC<ArticleOtherInfoProps> = ({ currentArticle }) => {

  const imageCondition =
    currentArticle.user.fileName ?
      `${process.env.REACT_APP_API_URL}/${currentArticle.user.fileName}` :
      currentArticle.user.imgAvatar ?
        `${process.env.REACT_APP_API_URL}/${currentArticle.user.imgAvatar}` : defaultAvatar

  const { ref, inView } = useInView(
    {
      threshold: 1,
      triggerOnce: true
    }
  )
  useEffect(() => {
    if (inView) {
      viewedArticle(currentArticle.id);
    }
  }, [inView])


  return (
    <div ref={ref} className={styles.articleOtherInfo}>
      <div className={styles.articleAvatarContainer}>
        <Link to={`/user/${currentArticle.user.id}`}><img className={styles.articleAuthorIcon} src={imageCondition} alt="userProfile" title={currentArticle.user.username} />
        </Link>
        <h2>Автор:</h2>
        <p className={styles.articleAuthor}>{currentArticle.user.username}</p>
      </div>
      <div className={styles.countInfoContainer}>
        <div className={styles.articleViews}>
          <img className={styles.eyeIcon} src={eyeIcon} />
          <p title={currentArticle.views.toString()} className={styles.articleViewsCount}>{currentArticle.views}</p>
        </div>
        <ArticleLikesRate articleData={currentArticle} />
        {currentArticle.article_favorite && <AddFavoriteArticle favoriteArticle={currentArticle.article_favorite} articleId={currentArticle.id} />}
      </div>
    </div>
  )
}

export default ArticleOtherInfo