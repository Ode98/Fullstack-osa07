import { useSelector } from "react-redux";
import Togglable from "./Toggable";
import { useRef } from "react";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogsOrdByLikes = [...blogs].sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();
  return (
    <div className="blogsList">
      <h2>Blogs</h2>
      <Togglable
        className="createNew"
        buttonLabel="Create new blog"
        ref={blogFormRef}
      >
        <BlogForm />
      </Togglable>
      {blogsOrdByLikes.map((blog) => (
        <div key={blog.id} className="blogStyle">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
