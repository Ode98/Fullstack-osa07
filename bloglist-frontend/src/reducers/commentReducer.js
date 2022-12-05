import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";

const commentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeComments = () => {
  return async (dispatch) => {
    const comments = await commentService.getAll();
    dispatch(setComments(comments));
  };
};

export const createComment = (id, content) => {
  return async (dispatch) => {
    const newComment = await commentService.create(id, content);
    dispatch(appendComment(newComment));
  };
};

export const { setComments, appendComment } = commentSlice.actions;
export default commentSlice.reducer;
