import { FC } from 'react'
import { ArticleInterface } from '../../types/articleTypes'
import styles from "../../styles/Main.module.scss"
import UserItem from '../UserComponents/UserItem'
import { parseDate } from '../../utils/ParseDate';
import likeIcon from "../../assets/icons/like-1386-svgrepo-com.svg"
import dislikeIcon from "../../assets/icons/dislike.svg"
import viewIcon from "../../assets/icons/303-3037570_eye-logo-png.png"
import { Link } from 'react-router-dom';

interface ArticleItemProps {
  articleData: ArticleInterface;
}

const ArticleItem: FC<ArticleItemProps> = ({ articleData }) => {
  const date = parseDate(articleData.createdAt)

  return (
    <div className={styles.articleItemsContainer__Item}>
      {articleData.article_imgs[0]?.imgName && <img className={styles.articleImg} src={`${process.env.REACT_APP_API_URL}/${articleData.article_imgs[0].imgName}`}
        title={articleData.title}
      />}
      <Link to={`/article/${articleData.id}`}>
        <div className={styles.articleInfo}>
          {articleData.tag && <>
            <button className={styles.tag_name}>{articleData.tag.name}</button>
          </>}
          <h2 className={styles.articleTitle}>{articleData.title}</h2>
          <div className={styles.articleUserInfo}>
            <UserItem width={35} height={35} data={articleData.user} />
            <div className={styles.articleLineBetween}>
            </div>
            <p className={styles.articleUserName}>
              {articleData.user.username}
            </p>
            <div className={styles.articleLineBetween}>
            </div>
            <p className={styles.updatedAt}>Добавлено: <span className={styles.date}>{date}</span></p>
          </div>
          <div className={styles.articleUserLikes}>
            <div className={styles.viewIconContainer}>
              <img className={styles.viewIcon} alt="views" src={viewIcon} />
              <p className={styles.views}>{articleData.views}</p>
            </div>
            <div className={styles.rate}>
              <div className={styles.likesContainer}>
                <img className={styles.likes} src={likeIcon} />
                <p>{articleData.likes}</p>
              </div>
              <div className={styles.dislikesContainer}>
                <img className={styles.dislikes} src={dislikeIcon} />
                <p>{articleData.dislikes} </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ArticleItem