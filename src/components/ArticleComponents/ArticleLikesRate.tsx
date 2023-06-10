import { FC } from 'react'
import likeIcon from "../../assets/icons/like-1386-svgrepo-com.svg"
import dislikeIcon from "../../assets/icons/dislike.svg"
import styles from "../../styles/SingleArticle.module.scss"
import { SingleArticleInterface } from '../../types/articleTypes'
import likeActive from "../../assets/icons/like_active.svg";
import dislikeActive from "../../assets/icons/dislike_active.svg";
import { useAppDispatch } from '../../hooks/reduxHooks'
import { fetchSingleArticleThunk } from '../../store/action-creators/fetchSingleArticleThunk'
import { rateComment } from '../../utils/RateComment'

const ArticleLikesRate: FC<{ articleData: SingleArticleInterface }> = ({ articleData }) => {

  const dispatch = useAppDispatch();
  let rateByUserCondition;
  if (articleData.user_article_likes)
    rateByUserCondition = articleData.user_article_likes.length > 0 ?
      articleData.user_article_likes[0].isLike : null;

  const likeArticle = async () => {
    await rateComment("like", "article", articleData.id, articleData.user_article_likes);
    dispatch(fetchSingleArticleThunk(articleData.id, true));
  }
  const dislikeArticle = async () => {
    await rateComment("dislike", "article", articleData.id, articleData.user_article_likes)
    dispatch(fetchSingleArticleThunk(articleData.id, true));
  }


  return (
    !articleData.user_article_likes ? <div className={styles.articleRateInfo}>
      <div title={articleData.likes.toString()} className={styles.articleLikesContainer}>
        <img style={{ cursor: "default" }} src={likeIcon} className={styles.articleLikes} />
        <p className={styles.articleLikesTitle}>{articleData.likes}</p>
      </div>
      <div title={articleData.dislikes.toString()} className={styles.articleDisLikesContainer}>
        <img style={{ cursor: "default" }} src={dislikeIcon} className={styles.articleDisLikes} />
        <p className={styles.articleDisLikesTitle}>{articleData.dislikes}</p>
      </div>
    </div>
      :
      <div className={styles.articleRateInfo}>
        <div title={articleData.likes.toString()} onClick={likeArticle} className={styles.articleLikesContainer}>
          {rateByUserCondition ? <img src={likeActive} className={styles.articleLikes} /> :
            <img src={likeIcon} className={styles.articleLikes} />
          }
          <p className={styles.articleLikesTitle}>{articleData.likes}</p>
        </div>
        <div title={articleData.dislikes.toString()} onClick={dislikeArticle} className={styles.articleDisLikesContainer}>
          {rateByUserCondition === null ? <img src={dislikeIcon} className={styles.articleDisLikes} />
            : rateByUserCondition === false ? <img src={dislikeActive} className={styles.articleDisLikes} />
              : <img src={dislikeIcon} className={styles.articleDisLikes} />
          }
          <p className={styles.articleDisLikesTitle}>{articleData.dislikes}</p>
        </div>
      </div>
  )
}

export default ArticleLikesRate