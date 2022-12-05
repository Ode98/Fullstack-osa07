import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { initializeUsers } from "../reducers/userReducer";

const User = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const user = users.find((u) => u.id === id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  const userBlogs = blogs.filter(
    (blog) => blog.user.username === user.username
  );

  return (
    <div className="userAddedBlogs">
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
