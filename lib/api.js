// Set up an axios instance
import axios from "axios";

const currentEnv = "LOCAL";

export const BASE_URLS = {
  LOCAL: "http://localhost:8080/api/",
  PROD: "https://hkaratas.com/api/",
  FURKAN: "http://192.168.1.10:8080/api/",
};

export const currentBaseUrl = BASE_URLS[currentEnv];

const api = axios.create({
  baseURL: currentBaseUrl,
});

export default api;
