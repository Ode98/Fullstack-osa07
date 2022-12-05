import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setUser(user));
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", 2));
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.clear();
  };
};

export const { setUser } = loggedUserSlice.actions;
export default loggedUserSlice.reducer;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};
