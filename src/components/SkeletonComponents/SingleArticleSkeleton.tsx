import { ForwardRefRenderFunction, forwardRef, HTMLProps } from 'react'
import styles from "../../styles/SingleArticle.module.scss"


const SingleArticleSkeleton: ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
  return (
    <div ref={ref} className="mainContainer">
      <div className='contentWrapperColumn'>
        <div className={`${styles.articleContainer} ${styles.skeletonArticleAnimContainer}`}>
        </div>
        <div className={`${styles.articleContainer} ${styles.skeletonArticleAnimSecondContainer}`}>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(SingleArticleSkeleton)