import { FC, memo } from 'react'
import styles from "../../styles/Main.module.scss"
import ArticleItem from '../ArticleComponents/ArticleItem'
import { ArticleInterface, ArticlesInterface } from '../../types/articleTypes'

interface HeaderProps {
  articles: ArticlesInterface<ArticleInterface>;
}

const Header: FC<HeaderProps> = memo(({ articles }) => {
  return (
    <div className='mainContainer'>
      <div className='contentWrapper'>
        <header className={styles.header}>
          <div className={styles.titleContainer}>
            <h1 className={styles.headerTitle}>Блог</h1>
            <div className={styles.lineThrough}></div>
          </div>
          <div className={styles.headerItemsContainer}>
            <ArticleItem articleData={articles.rows[0]} />
            <ArticleItem articleData={articles.rows[1]} />
            <ArticleItem articleData={articles.rows[2]} />
          </div>
        </header>
      </div>
    </div>
  )
})

export default Header