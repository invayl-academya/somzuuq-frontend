import axios from "axios";

export const API = import.meta.env.VITE_API_URL || "http://localhost:5000"; // fallback for local dev

const APP_URL = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default APP_URL;
