import { FC, Dispatch, SetStateAction, ChangeEvent, MouseEvent } from 'react'
import styles from "../../styles/User.module.scss"
import UserItem from './UserItem'
import { UserStateData } from '../../types/userTypes';

interface EditUserProfileIProps {
  setUsername: Dispatch<SetStateAction<string>>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteImgHandler: (e: MouseEvent<HTMLButtonElement>) => void;
  changeOtherInfoHandler: (e: MouseEvent<HTMLButtonElement>) => void;
  hideModalHandler: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  setPasswordWindow: Dispatch<SetStateAction<boolean>>;
  username: string;
  userData: UserStateData;
  error: string | null;
  image: File | null;
  deleteImg: boolean;
  disabledButton: boolean;
  editProfileResponse: string | null
}

const EditUserProfile: FC<EditUserProfileIProps> = ({ setUsername, handleFileChange, deleteImgHandler,
  changeOtherInfoHandler, hideModalHandler,
  setPasswordWindow, username, userData, error, image, deleteImg, disabledButton, editProfileResponse
}) => {
  return (
    <>
      <div className={styles.userAvatar}>
        <p className={styles.userAvatar__title}>Ваше фото:</p>
        {(!image && !deleteImg) && <UserItem width={100} height={100} data={userData} />}
        <div className={styles.changeImageContainer}>
          <input type='file' onChange={handleFileChange} accept='image/jpeg, image/png, image/gif' className={styles.changePhotoButton} />
          {(userData.fileName && !image && !deleteImg) && <button onClick={deleteImgHandler} className={styles.removePhotoButton}>Удалить фото</button>}
        </div>
      </div>
      <div className={styles.changeOtherInfo}>
        <div className={styles.changeUsername}>
          <label className={styles.usernameLabel} htmlFor="username">Ваше имя:</label>
          <input className={styles.usernameInput} id="username" type='text' value={username}
            onChange={e => setUsername(e.target.value)} />

        </div>
        {(error || editProfileResponse) && <p>{error || editProfileResponse}</p>}
        <button onClick={() => setPasswordWindow(true)} className={styles.changePasswordButton}>Изменить пароль</button>
        <div className={styles.submitButtons}>
          <button onClick={changeOtherInfoHandler} disabled={disabledButton} className={styles.submit}>Сохранить</button>
          <button onClick={hideModalHandler} className={styles.cancel}>Отмена</button>
        </div>
      </div>
    </>
  )
}

export default EditUserProfile