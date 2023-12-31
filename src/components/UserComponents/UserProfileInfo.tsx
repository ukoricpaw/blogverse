import { FC, useState, MouseEvent, useEffect } from 'react'
import { UserStateData } from '../../types/userTypes'
import styles from "../../styles/User.module.scss"
import { useAppSelector } from '../../hooks/reduxHooks'
import ModalUserProfileEdit from './ModalUserProfileEdit'
import { hideBodyScroll } from '../../utils/HideBodyScroll'

const UserProfileInfo: FC<{ data: UserStateData }> = ({ data }) => {



  const userData = useAppSelector(state => state.UserReducer.data);
  const [modalActive, setModalActive] = useState<boolean>(false)
  useEffect(() => {
    return () => {
      hideModalHandler();
    }
  }, [])

  const setModalActiveHandler = () => {
    setModalActive(true);
    hideBodyScroll("hide");
  }


  const hideModalHandler = (e?: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    if (e) e.preventDefault()
    hideBodyScroll("show")
    setModalActive(false);
  }


  return (
    <div className={styles.userProfile__info}>
      <div className={styles.userProfile__infoItem}>
        <h2 className={styles.userProfile__infoItem__title}>ID:</h2>
        <p className={styles.userProfile__infoItem__value}>{data.id}</p>
      </div>
      <p className={styles.splitter}>|</p>
      <div className={styles.userProfile__infoItem}>
        <p className={styles.userProfile__infoItem__value}>{data.username}</p>
      </div>
      <p className={styles.splitter}>|</p>
      <div className={styles.userProfile__infoItem}>
        <p className={styles.userProfile__infoItem__value}>{data.email}</p>
      </div>
      {data.id === userData.id && <>
        <p className={styles.splitter}>|</p>
        <button onClick={setModalActiveHandler} className={styles.editUserButton}>
          Редактировать
        </button>
        {modalActive && <ModalUserProfileEdit hideModalHandler={hideModalHandler} />}
      </>}
    </div>
  )
}

export default UserProfileInfo