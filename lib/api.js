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
  headers: {
    Authorization: `	
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I5NTYyNzA4NWNlYmY3NjNkMmE4MDYiLCJpYXQiOjE3NDQ3NjM1MTksImV4cCI6MTc0NDg0OTkxOX0.P2M1-JyoYZ5Y0nFnWq5rnOvDJm5sx91EJank66k44ds`,
  },
});

export default api;
