import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    const content = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    };
    dispatch(createBlog(content));
    dispatch(setNotification(`You created a blog "${content.title}"`, 2));
    setNewBlogTitle("");
    setNewBlogUrl("");
    setNewBlogAuthor("");
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div className="newBlogInputs">
          <div>
            <label>Title:</label>
            <input
              id="title"
              name="title"
              value={newBlogTitle}
              onChange={({ target }) => setNewBlogTitle(target.value)}
            />
          </div>
          <div>
            <label>Author:</label>
            <input
              id="author"
              name="author"
              value={newBlogAuthor}
              onChange={({ target }) => setNewBlogAuthor(target.value)}
            />
          </div>
          <div>
            <label>Url:</label>
            <input
              id="url"
              name="url"
              value={newBlogUrl}
              onChange={({ target }) => setNewBlogUrl(target.value)}
            />
          </div>
        </div>
        <button className="submitNewBlogBtn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};
export default BlogForm;
