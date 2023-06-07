import { FC } from 'react'
import { TagArticle } from '../../types/articleTypes'
import styles from "../../styles/Article.module.scss"
import { Link } from 'react-router-dom'

interface TagItemProps {
  tag: TagArticle
}

const TagItem: FC<TagItemProps> = ({ tag }) => {
  return (
    <Link to={`/tagArticles/${tag.id}`}><p className={styles.tagItem}>#{tag.name}</p></Link>
  )
}

export default TagItem