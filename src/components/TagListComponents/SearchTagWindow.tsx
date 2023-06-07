import { FC, useState, useEffect } from 'react'
import SearchTag from './SearchTag'
import SearchTagResults from './SearchTagResults'
import { TagArticle } from '../../types/articleTypes'
import { searchTagReq } from '../../axios/http/searchTag'
import styles from '../../styles/Article.module.scss'

const SearchTagWindow: FC = () => {

  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<TagArticle[] | null>([]);


  useEffect(() => {
    if (title === "") {
      setTags(null)
      return;
    }
    searchTagReq(title).then(
      value => setTags(value.data),
    )
      .catch(value => setTags(null))
  }, [title])

  return (
    <div>
      <SearchTag articleTag={title} setArticleTag={setTitle} />
      {!tags || tags.length === 0 ? <p className={styles.noResults}>Нет результатов</p> : <SearchTagResults tags={tags} />}
    </div>
  )
}

export default SearchTagWindow