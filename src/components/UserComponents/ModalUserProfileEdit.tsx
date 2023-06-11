import { FC, MouseEvent, useState, useEffect, ChangeEvent } from 'react'
import styles from "../../styles/User.module.scss"
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import { editProfile } from '../../axios/http/editProfile';
import { UserEditProfileInterface } from '../../types/userTypes';
import { disableButtonForEditing } from '../../utils/DisableButtonEditUserProfile';
import { checkAuthThunk } from '../../store/action-creators/checkAuthThunk';
import { UserChangePasswordInterface } from '../../types/userTypes';
import ChangeProfilePassword from './ChangeProfilePassword';
import EditUserProfile from './EditUserProfile';


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

  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [passwordWindow, setPasswordWindow] = useState<boolean>(false);
  const [deleteImg, setDeleteImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editProfileResponse, setEditProfileResponse] = useState<string | null>(null)

  const [changePasswordBody, setChangePasswordBody] =
    useState<UserChangePasswordInterface>
      (passwordBodyInitialState as UserChangePasswordInterface)

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
            <ChangeProfilePassword error={error} hidePasswordWindow={hidePasswordWindow} hideModalHandler={hideModalHandler} setChangePasswordBody={setChangePasswordBody} setError={setError} changePasswordBody={changePasswordBody} />
            :

            <EditUserProfile
              setUsername={setUsername} username={username} image={image}
              deleteImg={deleteImg} editProfileResponse={editProfileResponse} deleteImgHandler={deleteImgHandler}
              disabledButton={disabledButton} userData={userData} handleFileChange={handleFileChange} error={error} changeOtherInfoHandler={changeOtherInfoHandler} hideModalHandler={hideModalHandler} setPasswordWindow={setPasswordWindow}
            />}
        </form>}
    </div>
  )
}

export default ModalUserProfileEdit