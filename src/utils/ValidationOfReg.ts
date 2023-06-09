import { Dispatch, SetStateAction } from "react"
import { FormStateType } from "../types/userTypes"


export const validationOfReg = (setValidationError: Dispatch<SetStateAction<string | null>>, formState: FormStateType) => {
  if (!formState.email.includes("@") && !formState.email.includes(".")) {
    setValidationError("Некорректный email")
    return false;
  }
  else if (formState.password.length <= 8) {
    setValidationError("Пароль должен быть больше 8 символов")
    return false;
  }
  else if (formState.username && formState.username.length <= 8) {
    setValidationError("Имя пользователя должно быть больше 8 символов")
    return false;
  }
  return true;
}