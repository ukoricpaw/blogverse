import { TokenType } from "../../types/userTypes";
import { $private_host } from "../config";
import axios from "axios";

export const changePassword = async (oldPassword: string, newPassword: string) => {
  try {
    const reqBody = {
      oldPassword,
      newPassword
    }
    const token = await $private_host.put<TokenType>("/api/user/changepassword", reqBody);
    localStorage.setItem("token", token.data.token);
    return token.data;
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data.message;
    }
    return "Произошла ошибка"
  }
}