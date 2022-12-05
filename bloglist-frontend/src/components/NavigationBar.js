import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../reducers/loginReducer";

const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <div className="navBar">
      <Link to="/blogs" className="navLink">
        Blogs
      </Link>
      <Link to="/users" className="navLink">
        Users
      </Link>
      <div className="loggedIn">
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default NavigationBar;
