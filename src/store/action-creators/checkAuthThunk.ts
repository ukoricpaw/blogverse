import { AppDispatch } from ".."
import { fetchUserWithError, fetchUserWithSuccess } from "../reducers/userSlice"
import { $private_host } from "../../axios/config"
import { UserStateData } from "../../types/userTypes"
import { TokenType } from "../../types/userTypes"
import jwtDecode from "jwt-decode"
import axios from 'axios';

export const checkAuthThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let results;
      results = await $private_host.get<TokenType>("api/user/authcheck");
      localStorage.setItem("token", results.data.token);
      const decodedData = jwtDecode<UserStateData>(results.data.token);
      dispatch(fetchUserWithSuccess(decodedData));
    }
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        dispatch(fetchUserWithError(err.response?.data.message))
        return;
      }
      localStorage.removeItem("token");
      dispatch(fetchUserWithError("Произошла ошибка"))
    }
  }
}