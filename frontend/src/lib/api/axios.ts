import axios from "axios";
import { useAuthStore } from "../store/auth";
import { refresh } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      try {
        const result = await refresh();
        const newToken = result.data.data.accessToken;
        useAuthStore.getState().setToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().clearToken();
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  },
);

export default api;
