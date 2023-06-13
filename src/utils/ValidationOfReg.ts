import { Dispatch, SetStateAction } from "react"
import { FormStateType } from "../types/userTypes"

const RegExEmail = /\w{5,12}@((gmail)|(mail)|(yandex)|(outlook))\.((com)|(ru)|(kz))/g
const RegExPassword = /\w{6,20}/g
const RegExUsername = /\w{8,20}/g

export const validationOfReg = (setValidationError: Dispatch<SetStateAction<string | null>>, formState: FormStateType) => {
  const emailMatch = formState.email.match(RegExEmail);
  const passwordMatch = formState.password.match(RegExPassword);
  const usernameMatch = formState.username?.match(RegExUsername);
  if (!usernameMatch || usernameMatch.length > 1) {
    setValidationError("Имя пользователя должно быть в диапазоне от 8 - 20 символов")
    return false;
  }
  else if (!emailMatch || emailMatch.length > 1) {
    setValidationError("Некорректный email")
    return false;
  }
  else if (!passwordMatch || passwordMatch.length > 1) {
    setValidationError("Пароль должен быть в диапазоне от 8 - 20 символов")
    return false;
  }
  return true;
}