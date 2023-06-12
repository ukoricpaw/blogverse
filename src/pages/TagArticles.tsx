import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import ArticlesContent from '../components/ArticleComponents/ArticlesContent'
import { $public_host } from '../axios/config'
import { fetchTags } from '../store/reducers/articleSlice'
import { TagArticle } from '../types/articleTypes'


const TagArticles: FC = () => {

  const { tags } = useAppSelector(state => state.ArticleReducer)
  const dispatch = useAppDispatch()

  const { id } = useParams()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    if (!tags[0]) {
      (async () => {
        const newTags = await $public_host.get<TagArticle[]>(`/api/tag?limit=15`);
        dispatch(fetchTags(newTags.data));
      })()
    }
  }, [])


  return (
    <div className="mainContainer">
      <div className='contentWrapperColumn'>
        <ArticlesContent typeOfArticles={"tag"} tagId={Number(id)} />
      </div>
    </div>
  )
}

export default TagArticles