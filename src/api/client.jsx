import axios from "axios";

const client = axios.create({
  baseURL: "https://clownfish-app-8irth.ondigitalocean.app/",
});

export default client;
