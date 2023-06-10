import { FC } from 'react'
import styles from "../../styles/User.module.scss"
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

const UserPageNavigation: FC<{ userId: number }> = ({ userId }) => {
  const userProfile = `/user/${userId}`
  const userFavorites = `/user/${userId}/favorites`
  const addNewArticle = `/user/${userId}/newarticle`
  const adminPanel = `/user/${userId}/admin`
  const { data } = useAppSelector(state => state.UserReducer)

  return (<div className={styles.userPage__navigation}>
    <Link to={userProfile}><p className={styles.userPage__navigationItem}>Профиль</p></Link>
    <Link to={userFavorites}><p className={styles.userPage__navigationItem}>Избранное</p></Link>
    <Link to={addNewArticle}><p className={styles.userPage__navigationItem}>Написать статью</p></Link>
    {data.role === "ADMIN" && <Link to={adminPanel}><p className={styles.userPage__navigationItem}>Админ панель</p></Link>}
  </div>
  )
}

export default UserPageNavigation