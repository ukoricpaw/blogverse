import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from "../styles/User.module.scss"
import UserPageNavigation from '../components/UserComponents/UserPageNavigation'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

const UserPage: FC = () => {

  const { id } = useParams();
  const { data } = useAppSelector(state => state.UserReducer)


  return (
    <div className="mainContainer">
      <div className='contentWrapperColumn'>
        <div className={styles.userPage}>
          {Number(id) === data.id && <UserPageNavigation userId={Number(id)} />}
          <div className={styles.userPage__rightSection}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage