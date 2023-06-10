import { FC, MouseEvent, useState, useEffect, ChangeEvent } from 'react'
import styles from "../../styles/User.module.scss"
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import UserItem from './UserItem';
import { UserChangePasswordInterface } from '../../types/userTypes';
import { changePassword } from '../../axios/http/changePassword';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../../axios/http/editProfile';
import { UserEditProfileInterface } from '../../types/userTypes';
import { disableButtonForEditing } from '../../utils/DisableButtonEditUserProfile';
import { checkAuthThunk } from '../../store/action-creators/checkAuthThunk';


const passwordBodyInitialState = { oldPassword: "", newPassword: "" }

interface ModalUserProfileEditIProps {
  hideModalHandler: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}


const ModalUserProfileEdit: FC<ModalUserProfileEditIProps> = ({ hideModalHandler }) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const userData = useAppSelector(state => state.UserReducer.data);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [username, setUsername] = useState<string>(userData.username);
  const [disabledPasswordButton, setDisabledPasswordButton] = useState<boolean>(true);

  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [changePasswordBody, setChangePasswordBody] =
    useState<UserChangePasswordInterface>
      (passwordBodyInitialState as UserChangePasswordInterface)
  const [passwordWindow, setPasswordWindow] = useState<boolean>(false);
  const [deleteImg, setDeleteImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editProfileResponse, setEditProfileResponse] = useState<string | null>(null)


  const changeOtherInfoHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const reqBody: UserEditProfileInterface = {
      username,
    }
    if (deleteImg) {
      reqBody["delete_img"] = deleteImg;
    }
    else if (image) {
      reqBody["imgAvatar"] = image;
    }
    setLoading(true);
    await editProfile(reqBody)
      .then(value => {
        setLoading(false);
        if (typeof value === "string") {
          setError(value);
          return;
        }
        setEditProfileResponse("Профиль был успешно изменён");
        dispatch(checkAuthThunk())
      })

  }

  const changePasswordHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await changePassword(changePasswordBody.oldPassword, changePasswordBody.newPassword)
      .then(value => {
        if (typeof value === "string") {
          setError(value);
          return;
        }
        alert("Пароль успешно изменён");
        hideModalHandler(e);
        navigate(`/`);
      })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDeleteImg(false)
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };


  const hidePasswordWindow = (e: MouseEvent<HTMLButtonElement>) => {
    setError(null);
    e.preventDefault();
    setPasswordWindow(false)
    setChangePasswordBody(passwordBodyInitialState)
  }

  const deleteImgHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDeleteImg(true);
  }

  useEffect(() => {
    disableButtonForEditing(setDisabledButton, image, username, userData.username, deleteImg);
  }, [username, image, deleteImg])

  useEffect(() => {
    if (changePasswordBody.newPassword.trim() === "" || changePasswordBody.oldPassword.trim() === "") {
      setDisabledPasswordButton(true);
      return;
    }
    setDisabledPasswordButton(false);
  }, [changePasswordBody])



  return (
    <div onClick={(e) => {
      if (loading) return;
      else if (editProfileResponse) {
        navigate("/")
      }
      hideModalHandler(e)
    }} className={styles.userProfileModal}>
      {loading ? <p className={styles.userProfileModalWindow}>Пожалуйста подождите...</p> :
        editProfileResponse ? <p className={styles.userProfileModalWindow}>{editProfileResponse}</p> : <form onClick={(e) => { e.stopPropagation() }} className={styles.userProfileModalWindow}>
          {passwordWindow ?
            <div className={styles.changeOtherInfo}>
              <div className={styles.oldPasswordContainer}>
                <label htmlFor='old'>Старый пароль: </label>
                <input value={changePasswordBody.oldPassword}
                  onChange={(e) => setChangePasswordBody(curr => { return { ...curr, oldPassword: e.target.value } })} id='old' type='password' />
              </div>
              <div className={styles.newPasswordContainer}>
                <label htmlFor='new'>Новый пароль: </label>
                <input onChange={(e) => setChangePasswordBody(curr => { return { ...curr, newPassword: e.target.value } })} value={changePasswordBody.newPassword} id='new' type='password' />
              </div>
              {error && <p>{error}</p>}
              <div className={styles.submitButtons}>
                <button disabled={disabledPasswordButton} onClick={e => changePasswordHandler(e)} className={styles.submit}>Сохранить</button>
                <button onClick={(e) => hidePasswordWindow(e)} className={styles.cancel}>Отмена</button>
              </div>
            </div>
            :
            <>
              <div className={styles.userAvatar}>
                <p className={styles.userAvatar__title}>Ваше фото:</p>
                {(!image && !deleteImg) && <UserItem width={100} height={100} data={userData} />}
                <div className={styles.changeImageContainer}>
                  <input type='file' onChange={(e) => handleFileChange(e)} accept='image/jpeg, image/png, image/gif' className={styles.changePhotoButton} />
                  {(userData.fileName && !image && !deleteImg) && <button onClick={(e) => deleteImgHandler(e)} className={styles.removePhotoButton}>Удалить фото</button>}
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
                  <button onClick={(e) => changeOtherInfoHandler(e)} disabled={disabledButton} className={styles.submit}>Сохранить</button>
                  <button onClick={(e) => hideModalHandler(e)} className={styles.cancel}>Отмена</button>
                </div>
              </div>
            </>}
        </form>}
    </div>
  )
}

export default ModalUserProfileEdit