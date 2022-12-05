import { createSlice } from "@reduxjs/toolkit";

let timeOut;
const initialState = null;

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationChange(state, action) {
      const content = action.payload;
      state = content;
      return state;
    },
    resetNotification(state, action) {
      return initialState;
    },
  },
});

export const setNotification = (content, time) => {
  return async (dispatch) => {
    clearTimeout(timeOut);
    dispatch(notificationChange(content));
    timeOut = setTimeout(() => {
      dispatch(resetNotification());
    }, time * 1000);
  };
};

export const { notificationChange, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
