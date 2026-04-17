import axios from "axios";

const API = axios.create({
  baseURL: "https://bloodmanagement-9tbn.onrender.com",
  withCredentials: true,
});

export default API;
