import axios from "axios";
import useAuthStore from "../store/authStore";
import { tokenService } from "../store/tokenService";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

let refreshPromise = null;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // envia la cookie del refreshToken automaticamente
});

// Agrega el accessToken a cada request
api.interceptors.request.use((config) => {
  const token = tokenService.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Si el servidor responde 401, intenta renovar el accessToken una sola vez
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");

    if (!originalRequest || isRefreshRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = axios
            .post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true })
            .then(({ data }) => {
              tokenService.set(data.accessToken);
              return data.accessToken;
            })
            .catch((err) => {
              console.error("[api] Token refresh failed:", err?.message);
              useAuthStore.getState().clearAuth();
              throw err;
            })
            .finally(() => {
              refreshPromise = null;
            });
        }

        const accessToken = await refreshPromise;
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
