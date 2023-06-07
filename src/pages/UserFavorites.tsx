import { FC, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'
import UserArticleContent from './UserArticleContent'
import styles from "../styles/User.module.scss"

const UserFavorites: FC = () => {

  const { id } = useParams()

  const { data } = useAppSelector(state => state.UserReducer);

  const navigate = useNavigate();
  useEffect(() => {
    if (Number(id) !== data.id) {
      navigate(`/user/${id}`)
    }
  }, [])

  return (
    <>
      <h1 className={styles.favoriteTitle}>Избранное</h1>
      <UserArticleContent articleType={"favorite"} id={Number(id)} />
    </>
  )
}

export default UserFavorites