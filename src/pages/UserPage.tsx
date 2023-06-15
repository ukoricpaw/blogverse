import { FC, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import styles from "../styles/User.module.scss"
import UserPageNavigation from '../components/UserComponents/UserPageNavigation'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

const UserPage: FC = () => {

  const location = useLocation();
  const { data } = useAppSelector(state => state.UserReducer)
  const path = location.pathname.split("/")



  return (
    <div className="mainContainer">
      <div className='contentWrapperColumn'>
        <div className={styles.userPage}>
          {Number(path[2]) === data.id && <UserPageNavigation userId={Number(path[2])} />}
          <div className={styles.userPage__rightSection}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage