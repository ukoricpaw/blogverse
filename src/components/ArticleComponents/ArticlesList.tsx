import { FC, memo } from 'react'
import styles from "../../styles/Main.module.scss"
import ArticleItem from './ArticleItem'
import { FavArticleType } from '../../types/articleTypes'




const ArticlesList: FC<{ articles: FavArticleType }> = memo(({ articles }) => {
  return (
    <div className={styles.articlesList}>
      {

        articles.favArticles ?

          articles.data.rows.map(item => <ArticleItem key={item.id} articleData={item.article} />) :

          articles.data.rows.map(item => <ArticleItem key={item.id} articleData={item} />)
      }
    </div>

  )
})

export default ArticlesList