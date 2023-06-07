import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserStateData, UserStateInterface } from "../../types/userTypes"

const initialState: UserStateInterface = {
  isLoading: true,
  isError: null,
  isAuth: false,
  data: {} as UserStateData,
}


const UserReducer = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    fetchUser(state) {
      state.isLoading = true;
    },
    fetchUserWithError(state, action: PayloadAction<string>) {
      state.isAuth = false;
      state.isLoading = false;
      state.isError = action.payload;
    },
    fetchUserWithSuccess(state, action: PayloadAction<UserStateData>) {
      state.isAuth = true;
      state.isError = null;
      state.isLoading = false;
      state.data = action.payload;
    },
    clearError(state) {
      state.isError = null;
    },
    logoutUser(state) {
      state.data = {} as UserStateData;
      state.isAuth = false;
      state.isError = null;
    }
  }
})

export const { logoutUser, fetchUser, fetchUserWithError, fetchUserWithSuccess, clearError } = UserReducer.actions;
export default UserReducer.reducer;