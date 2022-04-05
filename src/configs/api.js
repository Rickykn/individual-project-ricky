import axios from "axios";
import jsCookie from "js-cookie";

export const API_URL = "http://localhost:2000";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  // config.headers.token = "testing123"
  config.headers.authorization = jsCookie.get("auth_token") || "";

  return config;
});
