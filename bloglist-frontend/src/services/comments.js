import axios from "axios";
const baseUrl = "/api/blogs/";

const create = async (id, comment) => {
  const comObj = { content: comment, blogId: id };
  const response = await axios.post(`${baseUrl}${id}/comments/`, comObj);
  return response.data;
};

const getAll = async () => {
  const request = await axios.get(`${baseUrl}/comments/`);
  return request.data;
};

const commentService = { create, getAll };
export default commentService;
