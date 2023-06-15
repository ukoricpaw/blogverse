import { FC, RefObject, useEffect, useRef } from 'react'
import styles from "../../styles/User.module.scss"
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

const UserPageNavigation: FC<{ userId: number }> = ({ userId }) => {
  const location = useLocation()
  const userProfile = `/user/${userId}`
  const userFavorites = `/user/${userId}/favorites`
  const addNewArticle = `/user/${userId}/newarticle`
  const adminPanel = `/user/${userId}/admin`
  const { data } = useAppSelector(state => state.UserReducer)
  const profileRef = useRef<HTMLParagraphElement>(null)
  const favoritesRef = useRef<HTMLParagraphElement>(null)
  const newArticleRef = useRef<HTMLParagraphElement>(null)
  const adminPageRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let curRef: RefObject<HTMLParagraphElement>;
    switch (location.pathname.split("/")[3]) {
      case "favorites":
        curRef = favoritesRef;
        break;
      case "admin":
        curRef = adminPageRef;
        break;
      case "newarticle":
        curRef = newArticleRef;
        break;
      default:
        curRef = profileRef;
        break;
    }
    curRef?.current?.classList.add(styles.userPage__navigationItemActivated);
    return () => {
      curRef?.current?.classList.remove(styles.userPage__navigationItemActivated);
    }
  }, [location])

  return (<div className={styles.userPage__navigation}>
    <Link to={userProfile}><p ref={profileRef} className={`${styles.userPage__navigationItem}`}>Профиль</p></Link>
    <Link to={userFavorites}><p ref={favoritesRef} className={`${styles.userPage__navigationItem}`}>Избранное</p></Link>
    <Link to={addNewArticle}><p ref={newArticleRef} className={`${styles.userPage__navigationItem}`}>Написать статью</p></Link>
    {data.role === "ADMIN" && <Link to={adminPanel}><p ref={adminPageRef} className={`${styles.userPage__navigationItem}`}>Админ панель</p></Link>}
  </div>
  )
}

export default UserPageNavigation