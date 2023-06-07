import { FC, Dispatch, SetStateAction, memo } from 'react'
import { TagArticle } from '../../types/articleTypes'
import styles from "../../styles/Article.module.scss"
import TagItem from './TagItem'

interface SlicedTagListProps {
  tags: TagArticle[],
  setShowMore: Dispatch<SetStateAction<boolean>>;
  showMore: boolean;
}

const SlicedTagList: FC<SlicedTagListProps> = memo(({ setShowMore, tags, showMore }) => {
  return (
    <div className={styles.tagList}>{
      tags.map(tag => {
        return <TagItem key={tag.id} tag={tag} />
      })
    }
      {!showMore && <button onClick={() => setShowMore(true)}
        className={styles.moreTagsButton}>Больше тэгов</button>}
    </div>
  )
})

export default SlicedTagList