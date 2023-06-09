import { FC, useContext } from 'react'
import { TagArticle } from '../../types/articleTypes'
import styles from "../../styles/Article.module.scss"
import { Link } from 'react-router-dom'
import { tagWindowContext } from '../../utils/TagWindowContext'

interface TagItemProps {
  tag: TagArticle
}

const TagItem: FC<TagItemProps> = ({ tag }) => {

  const { setTagId, setChoosedTag, page, setTags } = useContext(tagWindowContext);

  const chooseTagHandler = () => {
    setTagId(tag.id);
    setChoosedTag(tag.name);
    setTags(null);
  }

  return (
    <>
      {!page || page === "main" ? <Link to={`/tagArticles/${tag.id}`}><p className={styles.tagItem}>#{tag.name}</p></Link>
        : <p onClick={chooseTagHandler} className={styles.tagItem}>#{tag.name}</p>
      }
    </>
  )
}

export default TagItem