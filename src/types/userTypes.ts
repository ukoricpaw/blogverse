export interface FormStateType {
  "username"?: string,
  "password": string,
  "email": string
}

export type FormTypes = "username" | "password" | "email"


export interface UserStateInterface {
  isLoading: boolean;
  isError: string | null;
  isAuth: boolean;
  data: UserStateData;
}

export interface UserStateData {
  id: number;
  username: string,
  email: string,
  fileName: string,
  imgAvatar?: string,
  role: "ADMIN" | "USER"
}

export type TokenType = {
  token: string;
}

export type ErrType = {
  message: string;
}