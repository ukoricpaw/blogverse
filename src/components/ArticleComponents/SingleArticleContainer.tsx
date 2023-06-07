import { FC, memo } from 'react'
import styles from "../../styles/SingleArticle.module.scss"
import { ArticleImage, TagArticle } from '../../types/articleTypes'
import { Link } from 'react-router-dom'

interface SingleArticleContainerProps {
  func: () => {
    info: {
      tag: TagArticle,
      article_imgs: ArticleImage[],
      title: string,
    },
    html: string;
  };
}

const SingleArticleContainer: FC<SingleArticleContainerProps> = memo(({ func }) => {


  const { info, html } = func()

  if (!info || !html) {
    return <div>Loading...</div>
  }


  return (
    <>
      <div className={styles.articleInfo}>
        {info.article_imgs[0] && <img className={styles.articleImage}
          src={`${process.env.REACT_APP_API_URL}/${info.article_imgs[0].imgName}`} />}
        <div className={styles.articleMoreInfo}>
          <h1 className={styles.articleTitle}>{info.title}</h1>
          <Link to={`/tagArticles/${info.tag.id}`}>
            <h2 className={styles.articleTagName}>#{info.tag.name}</h2>
          </Link>
        </div>
      </div>
      <div className={styles.fullArticle} dangerouslySetInnerHTML={{ __html: html ?? "" }} />
    </>
  )
})

export default SingleArticleContainer