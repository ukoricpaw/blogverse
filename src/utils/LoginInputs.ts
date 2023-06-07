import { FormTypes, FormStateType } from "../types/userTypes"

export interface inputInterface {
  id: FormTypes,
  title: string,
  placeholder: string,
  type: string
}

export const initialRegState: FormStateType = {
  username: "",
  email: "",
  password: "",
}
export const initialLoginState: FormStateType = {
  email: "",
  password: "",
}


const loginInputs: inputInterface[] = [{
  id: "email",
  title: "Email: ",
  placeholder: "Введите email",
  type: "email",
},
{
  id: "password",
  title: "Пароль: ",
  placeholder: "Введите пароль",
  type: "password"
},
]

const registrationInputs: inputInterface[] = [{
  id: "username",
  title: "Имя пользователя: ",
  placeholder: "Введите имя",
  type: "text",
},
{
  id: "email",
  title: "Email: ",
  placeholder: "Введите email",
  type: "email",
},
{
  id: "password",
  title: "Пароль: ",
  placeholder: "Введите пароль",
  type: "password"
},
]



export {
  loginInputs, registrationInputs
}