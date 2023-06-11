import { FC, useState } from 'react'
import likeIcon from "../../assets/icons/like-1386-svgrepo-com.svg"
import dislikeIcon from "../../assets/icons/dislike.svg"
import styles from "../../styles/SingleArticle.module.scss"
import { SingleArticleInterface } from '../../types/articleTypes'
import likeActive from "../../assets/icons/like_active.svg";
import dislikeActive from "../../assets/icons/dislike_active.svg";
import { rateComment } from '../../utils/RateComment'

const ArticleLikesRate: FC<{ articleData: SingleArticleInterface }> = ({ articleData }) => {

  let rateByUserCondition;
  if (articleData.user_article_likes)
    rateByUserCondition = articleData.user_article_likes.length > 0 ?
      articleData.user_article_likes[0].isLike : null;

  const [articleLikes, setArticleLikes] = useState<number>(articleData.likes);
  const [articleDislikes, setArticleDislikes] = useState<number>(articleData.dislikes);
  const [userArticleLikes, setUserArticlesLikes] = useState<boolean | null | undefined>(rateByUserCondition);
  const [disabled, setDisabled] = useState<boolean>(false);

  const likeArticle = async () => {
    if (!disabled) {
      setDisabled(true);
      await rateComment("like", "article", articleData.id, userArticleLikes, setArticleLikes, setArticleDislikes, setUserArticlesLikes);
      setTimeout(() => {
        setDisabled(false);
      }, 1000)
    }

  }
  const dislikeArticle = async () => {
    if (!disabled) {
      setDisabled(true);
      await rateComment("dislike", "article", articleData.id, userArticleLikes, setArticleDislikes, setArticleLikes, setUserArticlesLikes)
      setTimeout(() => {
        setDisabled(false);
      }, 1000)
    }
  }

  return (
    !articleData.user_article_likes ? <div className={styles.articleRateInfo}>
      <div title={articleData.likes.toString()} className={styles.articleLikesContainer}>
        <img style={{ cursor: "default" }} src={likeIcon} className={styles.articleLikes} />
        <p className={styles.articleLikesTitle}>{articleLikes}</p>
      </div>
      <div title={articleData.dislikes.toString()} className={styles.articleDisLikesContainer}>
        <img style={{ cursor: "default" }} src={dislikeIcon} className={styles.articleDisLikes} />
        <p className={styles.articleDisLikesTitle}>{articleDislikes}</p>
      </div>
    </div>
      :
      <div className={styles.articleRateInfo}>
        <div title={articleLikes.toString()} onClick={likeArticle} className={styles.articleLikesContainer}>
          {userArticleLikes ? <img src={likeActive} className={styles.articleLikes} /> :
            <img src={likeIcon} className={styles.articleLikes} />
          }
          <p className={styles.articleLikesTitle}>{articleLikes}</p>
        </div>
        <div title={articleDislikes.toString()} onClick={dislikeArticle} className={styles.articleDisLikesContainer}>
          {userArticleLikes === null ? <img src={dislikeIcon} className={styles.articleDisLikes} />
            : userArticleLikes === false ? <img src={dislikeActive} className={styles.articleDisLikes} />
              : <img src={dislikeIcon} className={styles.articleDisLikes} />
          }
          <p className={styles.articleDisLikesTitle}>{articleDislikes}</p>
        </div>
      </div>
  )
}

export default ArticleLikesRate