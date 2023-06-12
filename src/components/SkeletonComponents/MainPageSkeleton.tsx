import { FC } from 'react'
import styles from "../../styles/Main.module.scss"
import articleStyles from "../../styles/Article.module.scss"

const MainPageSkeleton: FC = () => {
  return (
    <div className={styles.mainContentWrapper}>
      <div className='mainContainer'>
        <div className='contentWrapper'>
          <header className={styles.header}>
            <div className={styles.titleContainer}>
              <h1 className={styles.headerTitle}>Блог</h1>
              <div className={styles.lineThrough}></div>
            </div>
            <div className={styles.headerItemsContainer}>
              <div className={`${styles.articleItemsContainer__Item} ${styles.articlesContainerItem__skeleton}`}></div>
              <div className={`${styles.articleItemsContainer__Item} ${styles.articlesContainerItem__skeleton}`}></div>
              <div className={`${styles.articleItemsContainer__Item} ${styles.articlesContainerItem__skeleton}`}></div>
            </div>
          </header>
        </div>
      </div>
      <div className='articlesListContainer'>
        <div className='contentWrapper'>
          <div className={styles.articlesContainer}>
            <div className={articleStyles.changeTypeButton}>
            </div>
            <div className={styles.articlesList}>
              <div className={`${styles.articleItemsContainer__Item} ${styles.articlesContainerItem__skeleton}`}></div>
              <div className={`${styles.articleItemsContainer__Item} ${styles.articlesContainerItem__skeleton}`}></div>
              <div className={`${styles.articleItemsContainer__Item} ${styles.articlesContainerItem__skeleton}`}></div>
            </div>
          </div>
          <div className={styles.tagsContainer}>
            <p className={styles.tagsTitle}>Популярные тэги</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPageSkeleton