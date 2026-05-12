import axios from "axios";
import api from "../../../services/api";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const authService = {
  login: (credentials) =>
    api.post("/auth/login", credentials),

  register: (userData) =>
    api.post("/auth/registro", userData),

  confirmarEmail: (token) =>
    api.post(`/auth/confirmar/${token}`),

  resetPassword: (token, contrasena) =>
    api.post(`/auth/reset-password/${token}`, { ["contrase\u00f1a"]: contrasena }),

  forgotPassword: (correo) =>
    api.post("/auth/forgot-password", { correo }),

  // El refreshToken viaja automaticamente via cookie (withCredentials: true)
  refresh: () =>
    axios.post(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true }),

  logout: () =>
    api.post("/auth/logout"),
};
