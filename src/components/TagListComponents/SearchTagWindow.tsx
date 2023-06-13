import { FC, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react'
import SearchTag from './SearchTag'
import SearchTagResults from './SearchTagResults'
import { TagArticle } from '../../types/articleTypes'
import { searchTagReq } from '../../axios/http/searchTag'
import styles from '../../styles/Article.module.scss'
import { tagWindowContext } from '../../utils/TagWindowContext'
import { tagWindowContextInterface } from '../../utils/TagWindowContext'
import useDebounce from '../../hooks/useDebounce'


interface SearchTagWindowIProps {
  requireMessage?: boolean;
  page: "main" | "articleEdit";
  setTag?: Dispatch<SetStateAction<string>>;
  choosed?: string | null;
  tag?: number | null;
}

const SearchTagWindow: FC<SearchTagWindowIProps> = ({ requireMessage, page, setTag, choosed, tag }) => {

  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<TagArticle[] | null>([]);
  const [choosedTag, setChoosedTag] = useState<string | null>(null);
  const [tagId, setTagId] = useState<number | null>(null);

  const debouncedTitleTag = useDebounce({ value: title, ms: 500 });

  useEffect(() => {
    if (choosed && tag) {
      setChoosedTag(choosed);
      setTagId(tag);
    }
  }, [])

  useEffect(() => {
    if (title === "") {
      setTags(null)
      return;
    }
    if (debouncedTitleTag) {
      searchTagReq(title).then(
        value => setTags(value.data),
      )
        .catch(value => setTags(null))
    }
  }, [debouncedTitleTag])

  useEffect(() => {
    if (setTag) {
      setTag(String(tagId));
    }
  }, [tagId])

  const windowContext: tagWindowContextInterface = {
    choosedTag,
    setChoosedTag,
    tagId,
    setTagId,
    page,
    setTags,
    setTitle
  }

  return (
    <div>
      <tagWindowContext.Provider value={windowContext}>
        <SearchTag articleTag={title} setArticleTag={setTitle} />
        {!tags || tags.length === 0 ? requireMessage && <p className={styles.noResults}>Нет результатов</p> : <SearchTagResults tags={tags} />}
      </tagWindowContext.Provider>
    </div>
  )
}

export default SearchTagWindow