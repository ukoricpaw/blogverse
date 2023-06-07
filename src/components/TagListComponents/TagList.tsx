import { FC, useState, memo } from 'react'
import styles from "../../styles/Article.module.scss"
import { TagArticle } from '../../types/articleTypes'
import SlicedTagList from './SlicedTagList'
import SearchTagWindow from './SearchTagWindow'

interface TagListProps {
  tags: TagArticle[]
}

const TagList: FC<TagListProps> = memo(({ tags }) => {

  const [showMore, setShowMore] = useState<boolean>(false);
  const [searchTag, setSearchTagWindow] = useState<boolean>(false);

  return (
    <div className={styles.tagListContainer}>
      {!showMore ?
        <SlicedTagList showMore={showMore} setShowMore={setShowMore} tags={tags.slice(0, 8)} />
        :
        <div className={styles.tagList}>
          <SlicedTagList showMore={showMore} setShowMore={setShowMore} tags={tags} />
          <button onClick={() => setSearchTagWindow(prev => !prev)} className={styles.moreTagsButton}>
            {!searchTag ? "Искать тэг" : "Скрыть"}</button>
          {searchTag && <SearchTagWindow />}
        </div>
      }
    </div>
  )
})

export default TagList