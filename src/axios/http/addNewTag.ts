import axios from "axios";
import { $private_host } from "../config"


export const addNewTag = async (name: string) => {
  try {
    const body = {
      name
    }
    const response = await $private_host.post("/api/tag", body);
    return response;
  }
  catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data.message
    }
    return "Произошла ошибка";
  }
}