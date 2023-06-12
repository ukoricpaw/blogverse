import { FC, useState, MouseEvent, useEffect, Dispatch, SetStateAction } from 'react'
import styles from "../../styles/User.module.scss"
import { UserChangePasswordInterface } from '../../types/userTypes';
import { changePassword } from '../../axios/http/changePassword';
import { useNavigate } from 'react-router-dom';

interface ChangeProfilePasswordIProps {
  changePasswordBody: UserChangePasswordInterface;
  setChangePasswordBody: Dispatch<SetStateAction<UserChangePasswordInterface>>;
  setError: Dispatch<SetStateAction<string | null>>;
  error: string | null;
  hideModalHandler: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  hidePasswordWindow: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ChangeProfilePassword: FC<ChangeProfilePasswordIProps> = (
  { changePasswordBody, setChangePasswordBody, setError, error, hideModalHandler, hidePasswordWindow }) => {

  const navigate = useNavigate();


  useEffect(() => {
    if (changePasswordBody.newPassword.trim() === "" || changePasswordBody.oldPassword.trim() === "") {
      setDisabledPasswordButton(true);
      return;
    }
    setDisabledPasswordButton(false);
  }, [changePasswordBody])

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



  const [disabledPasswordButton, setDisabledPasswordButton] = useState<boolean>(true);

  return (
    <div className={styles.changeOtherInfo}>
      <div className={styles.oldPasswordContainer}>
        <label htmlFor='old'>Старый пароль: </label>
        <input autoComplete='off' value={changePasswordBody.oldPassword}
          onChange={(e) => setChangePasswordBody(curr => { return { ...curr, oldPassword: e.target.value } })} id='old' type='password' />
      </div>
      <div className={styles.newPasswordContainer}>
        <label htmlFor='new'>Новый пароль: </label>
        <input autoComplete='off' onChange={(e) => setChangePasswordBody(curr => { return { ...curr, newPassword: e.target.value } })} value={changePasswordBody.newPassword} id='new' type='password' />
      </div>
      {error && <p>{error}</p>}
      <div className={styles.submitButtons}>
        <button disabled={disabledPasswordButton} onClick={e => changePasswordHandler(e)} className={styles.submit}>Сохранить</button>
        <button onClick={(e) => hidePasswordWindow(e)} className={styles.cancel}>Отмена</button>
      </div>
    </div>
  )
}

export default ChangeProfilePassword