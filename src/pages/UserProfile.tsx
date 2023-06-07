import { FC, useEffect, useState } from 'react'
import styles from "../styles/User.module.scss"
import { useParams, useNavigate } from 'react-router-dom'
import UserItem from '../components/UserComponents/UserItem'
import { UserStateData } from '../types/userTypes'
import { fetchUser } from '../axios/http/fetchUser'
import UserProfileInfo from '../components/UserComponents/UserProfileInfo'
import { useAppSelector } from '../hooks/reduxHooks'
import UserArticleContent from './UserArticleContent'

const UserProfile: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setData] = useState<UserStateData>({} as UserStateData)
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<null | string>(null);
  const { data } = useAppSelector(state => state.UserReducer)

  useEffect(() => {
    if (!id) {
      navigate("/")
    }
    (async () => {
      await fetchUser(Number(id)).then(
        value => {
          if (typeof value === "string") {
            setErr(value);
          }
          else {
            setData(value)
          }
          setLoading(false);
        }
      )
    })()
  }, [id])


  if (loading) {
    return <div>Loading...</div>
  }

  if (err) {
    return <div>{err}</div>
  }




  return (
    <>
      <div className={styles.userProfile}>
        <UserItem width={120} height={120} data={userData} />
        <UserProfileInfo data={userData} />
      </div>
      <h1 className={styles.userBlogTitle}>{
        Number(id) === data.id ? "Мой блог" : `Блог ${userData.username}`}</h1>
      <UserArticleContent articleType={"user"} id={Number(id)} />
    </>
  )
}

export default UserProfile