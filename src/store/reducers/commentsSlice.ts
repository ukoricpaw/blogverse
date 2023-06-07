import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialStateComments } from "../../types/articleTypes";
import { CommentsListInterface } from "../../types/articleTypes";

const initialState: InitialStateComments = {
  isLoading: true,
  isError: null,
  comments: {} as CommentsListInterface,
  currentPage: 1,
}

const CommentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  reducers: {
    fetchComments(state) {
      state.isError = null;
      state.isLoading = true;
    },
    fetchCommentsWithSuccess(state, action: PayloadAction<CommentsListInterface>) {
      state.comments = action.payload;
      state.isLoading = false;
    },
    fetchCommentsWithError(state, action: PayloadAction<string>) {
      state.isError = action.payload;
      state.isLoading = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  }
})

export const
  { fetchComments, fetchCommentsWithError,
    fetchCommentsWithSuccess, setCurrentPage } = CommentsSlice.actions
export default CommentsSlice.reducer;
