import { FC } from 'react'
import styles from "../../styles/General/Navbar.module.scss"
import { Link } from "react-router-dom"
import { RouterPaths } from '../../utils/RouterTypes'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks'
import UserItem from '../UserComponents/UserItem'
import { useLocation, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../store/reducers/userSlice'

const Navbar: FC = () => {
  const navigate = useNavigate()
  const { isAuth, data } = useAppSelector(state => state.UserReducer)
  const dispatch = useAppDispatch();
  const location = useLocation();


  const accountLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser())
    navigate("/")
  }

  const checkLocation = location.pathname.split("/");


  const navShowItemsCondition = checkLocation[1] === "user" ? Number(checkLocation[2]) !== data.id ? true : false : true;

  return (
    <nav className={styles.navBarContainer} aria-label='primary-navigation'>
      <ul className={styles.navBarWrapper}>
        <Link to={RouterPaths.MAINPAGE}><li className={styles.logoWrapper}>
          <span className={styles.leftTitle}>Blog</span>
          <span className={styles.rightTitle}>Verse</span>
        </li></Link>
        {!isAuth ? <ul className={styles.navItems}>
          <Link to={RouterPaths.LOGIN}><li className={styles.navItem}>Войти</li></Link>
          <Link to={RouterPaths.REGISTRATION}><li className={styles.navItem}>Зарегистрироваться</li></Link>
        </ul> :
          <ul className={styles.navItems}>
            {navShowItemsCondition && <Link to={`user/${data.id}`}><li className={`${styles.navItem}`}>Мой блог</li></Link>}
            {navShowItemsCondition && <Link to={`user/${data.id}/favorites`}><li className={`${styles.navItem} ${styles.favoriteItem}`}>Избранное</li></Link>}
            <li onClick={accountLogout} className={`${styles.navItem} ${styles.exitItem}`}>Выйти</li>
            <Link to={`/user/${data.id}`}><UserItem width={40} height={40} data={data} /></Link>
          </ul>
        }
      </ul>
    </nav>
  )
}

export default Navbar