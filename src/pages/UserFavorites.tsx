import { FC, HTMLAttributes, LegacyRef, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'
import UserArticleContent from './UserArticleContent'
import styles from "../styles/User.module.scss"

const UserFavorites: FC = () => {

  const { id } = useParams()
  const { data } = useAppSelector(state => state.UserReducer);
  const navigate = useNavigate();

  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    console.log(ref.current)
    ref.current?.scrollIntoView({
      behavior: "smooth"
    })
    if (Number(id) !== data.id) {
      navigate(`/user/${id}`)
    }
  }, [id])

  return (
    <>
      <h1 ref={ref} className={styles.favoriteTitle}>Избранное</h1>
      <UserArticleContent articleType={"favorite"} id={Number(id)} />
    </>
  )
}

export default UserFavorites