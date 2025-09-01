// export const APP_URL = "https://clownfish-app-8irth.ondigitalocean.app/";

const ROOT = import.meta.env.VITE_API_URL.replace(/\/+$/, "");
export const APP_URL = `${ROOT}/api`;

//addded
