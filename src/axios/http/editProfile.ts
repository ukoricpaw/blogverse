import { TokenType, UserEditProfileInterface } from "../../types/userTypes";
import { $private_host } from "../config";
import axios from "axios";

export const editProfile = async (body: UserEditProfileInterface) => {
  try {
    const formData = new FormData();
    if (body.delete_img) {
      formData.append("delete_img", String(body.delete_img));
    }
    else if (body.imgAvatar) {
      formData.append("imgAvatar", body.imgAvatar);
    }


    if (body.username) {
      formData.append("username", body.username);
    }

    const token = await $private_host.put<TokenType>("/api/user", formData);
    localStorage.setItem("token", token.data.token);
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data.message;
    }
    return "Произошла ошибка"
  }
}