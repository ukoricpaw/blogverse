import { FC } from 'react'
import { UserStateData } from '../../types/userTypes'
import styles from "../../styles/User.module.scss"

const UserProfileInfo: FC<{ data: UserStateData }> = ({ data }) => {
  return (
    <div className={styles.userProfile__info}>
      <div className={styles.userProfile__infoItem}>
        <h2 className={styles.userProfile__infoItem__title}>ID:</h2>
        <p className={styles.userProfile__infoItem__value}>{data.id}</p>
      </div>
      |
      <div className={styles.userProfile__infoItem}>
        <p className={styles.userProfile__infoItem__value}>{data.username}</p>
      </div>
      |
      <div className={styles.userProfile__infoItem}>
        <p className={styles.userProfile__infoItem__value}>{data.email}</p>
      </div>
    </div>
  )
}

export default UserProfileInfo