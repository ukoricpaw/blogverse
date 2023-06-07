import { AppDispatch } from ".."
import { fetchUser, fetchUserWithError, fetchUserWithSuccess } from "../reducers/userSlice"
import { $public_host } from "../../axios/config"
import { FormStateType, UserStateData } from "../../types/userTypes"
import { TokenType } from "../../types/userTypes"
import jwtDecode from "jwt-decode"
import axios from 'axios';

export const fetchUserThunk = (fetchType: "login" | "reg", body: FormStateType) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchUser());
      let results;
      if (fetchType === "login") {
        results = await $public_host.post<TokenType>("api/user/login", body);
      }
      else {
        results = await $public_host.post<TokenType>("api/user/registration", body);
      }
      localStorage.setItem("token", results.data.token);
      const decodedData = jwtDecode<UserStateData>(results.data.token);
      dispatch(fetchUserWithSuccess(decodedData));
    }
    catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        dispatch(fetchUserWithError(err.response?.data.message))
        return;
      }

      dispatch(fetchUserWithError("Произошла ошибка"))
    }
  }
}