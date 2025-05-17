// Set up an axios instance
import axios from "axios";
import { toast } from "sonner";

export const currentBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: currentBaseUrl,
});

api.interceptors.response.use(
  (response) => {
    return {
      success: true,
      ...response,
    };
  },
  (error) => {
    const errMessage = error.response?.data?.message ?? error.message;
    toast(errMessage ?? "Hata Meydana Geldi");
    return Promise.reject({
      ...error,
    });
  },
);

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const clearAuthToken = () => {
  api.defaults.headers.common.Authorization = ``;
};

export default api;
