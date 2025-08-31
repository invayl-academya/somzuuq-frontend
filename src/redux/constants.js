const ROOT = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(
  /\/+$/,
  ""
);

export const APP_URL = `${ROOT}/api`;
