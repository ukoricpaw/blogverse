import { FC, useState } from 'react'
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
  const [exitModal, setExitModal] = useState<boolean>(false);


  const accountLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    setExitModal(false);
    navigate("/")
  }

  const checkLocation = location.pathname.split("/");

  const checkUserLocationCondition = checkLocation[1] === "user"
  const navShowItemsCondition = checkUserLocationCondition ? Number(checkLocation[2]) !== data.id ? true : false : true;
  console.log(exitModal)
  return (
    <nav className={styles.navBarContainer} aria-label='primary-navigation'>
      <ul className={styles.navBarWrapper}>
        <Link to={RouterPaths.MAINPAGE}><li className={styles.logoWrapper}>
          <span className={styles.leftTitle}>Blog</span>
          <span className={styles.rightTitle}>Verse</span>
        </li></Link>
        {!isAuth ? <ul className={styles.navItems}>
          {checkLocation[1] === "login" ? <Link to={RouterPaths.REGISTRATION}><li className={styles.navItem}>Зарегистрироваться</li></Link> :
            <Link to={RouterPaths.LOGIN}><li className={styles.navItem}>Войти</li></Link>}
        </ul> :
          <ul className={styles.navItems}>
            {navShowItemsCondition && <Link to={`user/${data.id}`}><li className={`${styles.navItem}`}>Мой блог</li></Link>}
            {navShowItemsCondition && <Link to={`user/${data.id}/favorites`}><li className={`${styles.navItem} ${styles.favoriteItem}`}>Избранное</li></Link>}
            <li onClick={() => setExitModal(true)} style={{ display: checkUserLocationCondition ? "block" : "none" }} className={`${styles.navItem} ${styles.exitItem}`}>Выйти</li>
            <Link to={`/user/${data.id}`}><UserItem width={40} height={40} data={data} /></Link>
          </ul>
        }
      </ul>
      {exitModal && <div className={styles.exitModalContainer} onClick={() => setExitModal(false)}>
        <div className={styles.exitModalWindow} onClick={(e) => {
          e.stopPropagation()
        }}>
          <h2 className={styles.exitModalTitle}>Вы уверены что хотите выйти?</h2>
          <div className={styles.exitModal}>
            <p onClick={accountLogout} className={styles.exitModal__exit}>Выйти</p>
            <p onClick={() => setExitModal(false)} className={styles.exitModal__cancel}>Отмена</p>
          </div>
        </div>
      </div>}
    </nav>
  )
}

export default Navbar