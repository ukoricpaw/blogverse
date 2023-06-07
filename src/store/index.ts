import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./reducers/userSlice"
import ArticleReducer from "./reducers/articleSlice"
import CommentsReducer from "./reducers/commentsSlice"

const reducers = combineReducers({
  CommentsReducer,
  UserReducer,
  ArticleReducer
})

export const store = configureStore({
  reducer: reducers,
})

export type AppStore = typeof store;
export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];


