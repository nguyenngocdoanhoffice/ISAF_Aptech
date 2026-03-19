import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = () => axios.get(API);

export const createPost = (data) => axios.post(API, data);

export const updatePost = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deletePost = (id) =>
  axios.delete(`${API}/${id}`);