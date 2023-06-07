import { FC } from 'react'
import TagItem from './TagItem'
import { TagArticle } from '../../types/articleTypes';

interface SearchTagResultsProps {
  tags: TagArticle[];
}

const SearchTagResults: FC<SearchTagResultsProps> = ({ tags }) => {
  return (
    <>
      {tags.map(tag => <TagItem key={tag.id} tag={tag} />)}
    </>
  )
}

export default SearchTagResults