import axios from "axios";

// 👉 String base URL (what your slices expect)
export const APP_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// 👉 Optional: shared Axios instance if you ever want it
export const API = axios.create({
  baseURL: APP_URL,
  withCredentials: true, // cookies if you use them
});

// Default export (optional convenience)
export default API;
