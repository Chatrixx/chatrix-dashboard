// Set up an axios instance
import axios from "axios";

const isLocal = false;

const BASE_URLS = {
  LOCAL: "http://localhost:8080/api/",
  PROD: "https://hkaratas.com/api/",
};

const api = axios.create({
  baseURL: isLocal ? BASE_URLS.LOCAL : BASE_URLS.PROD,
});

export default api;
