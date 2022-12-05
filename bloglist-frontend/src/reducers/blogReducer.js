import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    voteBlog(state, action) {
      const newState = state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      );
      return newState.sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      const newState = state.filter((a) => a.id !== action.payload);
      return newState;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const vote = (blog) => {
  return async (dispatch) => {
    const votedBlog = await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });
    dispatch(voteBlog(votedBlog));
  };
};

export const remove = (blog) => {
  return async (dispatch) => {
    const removedBlog = await blogService.remove(blog.id);
    dispatch(removeBlog(blog.id));
  };
};

export const { appendBlog, setBlogs, voteBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
