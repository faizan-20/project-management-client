import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
