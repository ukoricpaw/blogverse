import { ChangeEvent, FC, useEffect, useState, MouseEvent, useRef } from 'react'
import styles from "../styles/Login.module.scss"
import { loginInputs, registrationInputs } from '../utils/LoginInputs'
import { RouterPaths } from '../utils/RouterTypes'
import { useLocation, useNavigate } from "react-router-dom"
import { FormStateType } from '../types/userTypes'
import { fetchUserThunk } from '../store/action-creators/fetchUserThunk'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { clearError } from '../store/reducers/userSlice'
import { initialLoginState, initialRegState } from '../utils/LoginInputs'
import { validationOfReg } from '../utils/ValidationOfReg'


const Login: FC = () => {

  const dispatch = useAppDispatch();
  const { isError } = useAppSelector(state => state.UserReducer)
  const location = useLocation();


  const LOGIN = location.pathname === RouterPaths.LOGIN;
  const initialState = LOGIN ? initialLoginState : initialRegState

  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormStateType>(initialState);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string | null>(null)
  const refButton = useRef<HTMLButtonElement>(null);


  const NavigateTo = function () {
    LOGIN ? navigate(RouterPaths.REGISTRATION) : navigate(RouterPaths.LOGIN);
  }

  const changeDynamicField = function (e: ChangeEvent<HTMLInputElement>) {
    setFormState(prev => { return { ...prev, [e.target.id]: e.target.value } })
  }

  const loginUser = function (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setValidationError(null);
    dispatch(clearError());
    if (LOGIN) {
      const loginState = { ...formState };
      delete loginState["username"];
      dispatch(fetchUserThunk("login", loginState));
    }
    else {
      const valid = validationOfReg(setValidationError, formState);
      if (!valid) {
        return;
      }
      dispatch(fetchUserThunk("reg", formState));
    }
  }


  useEffect(() => {
    setFormState(initialState)
    dispatch(clearError());
    setValidationError(null);
  }, [location])

  useEffect(() => {
    const set = new Set(Object.values(formState));
    set.forEach(item => item.trim());
    if (refButton.current) {
      if (set.has("")) {
        setDisableButton(true);
        refButton.current.style.cursor = "default";
        return;
      }
      setDisableButton(false);
      refButton.current.style.cursor = "pointer";
    }
  }, [formState])


  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>{LOGIN ? "Выполните вход" : "Регистрация"}</h1>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          {LOGIN ? loginInputs.map(formItem => {
            return <div key={formItem.id} className={styles.formItem}>
              <label className={styles.formLabel} htmlFor={formItem.id}>{formItem.title}</label>
              <input value={formState[formItem.id]} onChange={(e) => changeDynamicField(e)} className={styles.formInput} type={formItem.type} id={formItem.id} placeholder={formItem.placeholder} />
            </div>
          })
            : registrationInputs.map(formItem => {
              return <div key={formItem.id} className={styles.formItem}>
                <label className={styles.formLabel} htmlFor={formItem.id}>{formItem.title}</label>
                <input value={formState[formItem.id]} onChange={(e) => changeDynamicField(e)} className={styles.formInput} type={formItem.type} id={formItem.id} placeholder={formItem.placeholder} />
              </div>
            })
          }
          <div className={styles.submitContainer}>
            {LOGIN ?
              <p className={styles.changePageContainer}>
                Нет аккаунта? <span onClick={NavigateTo} className={styles.changePageButton}>Зарегистрироваться</span>
              </p>
              :
              <p className={styles.changePageContainer}>
                Есть аккаунт? <span onClick={NavigateTo} className={styles.changePageButton}>Войти</span>
              </p>
            }
            <p className={styles.loginAnswer}>
              {validationError || isError || ""}
            </p>
            <button ref={refButton} disabled={disableButton} onClick={(e) => loginUser(e)} className={`${styles.submitBtn}`}>{
              LOGIN ? "Войти" : "Зарегистрироваться"
            }</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login