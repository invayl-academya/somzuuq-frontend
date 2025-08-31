// src/constants.js
import axios from "axios";

// ✅ String value (good for debugging or if you need plain URL)
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ✅ Axios instance with baseURL
const APP_URL = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default APP_URL;
