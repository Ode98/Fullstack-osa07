import React, { useState, useEffect } from "react";
import { vote, remove } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createComment, initializeComments } from "../reducers/commentReducer";

const Blog = () => {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeComments());
  }, [dispatch]);

  const comments = useSelector((state) => state.comments);
  const userComments = comments.filter((c) => c.blogId === id);

  const ShowComments = () => {
    if (userComments.lenght === 0) {
      return null;
    }
    return userComments.map((com) => <li key={com.id}>{com.content}</li>);
  };

  const handleLike = () => {
    dispatch(vote(blog));
    dispatch(setNotification(`You liked blog "${blog.title}"`, 2));
  };

  const handleRemove = () => {
    if (window.confirm("Do you want to delete blog", blog.title)) {
      dispatch(remove(blog));
      dispatch(setNotification(`You removed a blog "${blog.title}"`, 2));
    }
  };

  const sendComment = (event) => {
    event.preventDefault();
    dispatch(createComment(id, comment));
    setComment("");
  };

  if (!blog) {
    return <Navigate to="/blogs" />;
  }

  return (
    <div className="blogInfo">
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      Added by: {blog.user.name}
      <div className="likes">
        Likes: {blog.likes}
        <button className="btnLike" onClick={handleLike}>
          Like Blog
        </button>
        <button className="btnLike" onClick={handleRemove}>
          Remove blog
        </button>
      </div>
      <div></div>
      <div>
        <form onSubmit={sendComment}>
          Comment:
          <input
            id="comment"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          ></input>
          <button>Send comment</button>
        </form>
        Comments: <ShowComments />
      </div>
    </div>
  );
};

export default Blog;
