import axios from "axios"
import { $public_host } from "../config";
import { UserStateData } from "../../types/userTypes";

export const fetchUser = async (id: number) => {
  try {
    const user = await $public_host.get<UserStateData>(`api/user/getuser/${id}`);
    return user.data;
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data.message)
      return err.response?.data.message;
    }
    return "Произошла ошибка"
  }
}