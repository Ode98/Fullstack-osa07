import React, { useEffect } from "react";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/loginReducer";
import Users from "./components/Users";
import User from "./components/User";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  if (user === null) {
    return <Login />;
  }

  return (
    <div className="app">
      <NavigationBar />
      <div className="header">
        <h1>Blog App</h1>
        <Notification className="notification" />
      </div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id/" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
