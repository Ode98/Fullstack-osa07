import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeUsers } from "../reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  const namesList = users.map((user) => (
    <div key={user.id} className="blogStyle">
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </div>
  ));

  const numOfBlogsList = users.map((user) => (
    <div className="blogStyle" key={user.id}>
      {user.blogs.length}
    </div>
  ));

  if (users === null) {
    return;
  }
  return (
    <div className="blogsList">
      <div className="userInf">
        <h2>Users</h2>
        {namesList}
      </div>
      <div className="userInf">
        <h2>Blogs created</h2>
        {numOfBlogsList}
      </div>
    </div>
  );
};

export default Users;
