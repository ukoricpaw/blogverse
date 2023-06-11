import { FC } from 'react'
import styles from "../../styles/User.module.scss"
import defaultImage from "../../assets/imgs/default-avatar-profile.jpg"
import { UserStateData } from '../../types/userTypes'


interface UserItemProps {
  data: UserStateData;
  width: number;
  height: number;
}

const UserItem: FC<UserItemProps> = ({ data, width, height }) => {


  const imgAvatarCondition = data.imgAvatar ? `${process.env.REACT_APP_API_URL}/${data.imgAvatar}` : defaultImage

  const imgCondition = data.fileName ? `${process.env.REACT_APP_API_URL}/${data.fileName}` : imgAvatarCondition



  return (
    <div className={styles.userImageContainer}>
      <img width={`${width}px`} height={`${height}px`} className={styles.userImage} alt={"profile"} title={data.username} src={imgCondition} loading='lazy' />
    </div>
  )
}

export default UserItem