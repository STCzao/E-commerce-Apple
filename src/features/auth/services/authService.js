import api from "../../../services/api";

export const authService = {
  login: (credentials) =>
    api.post("/auth/login", credentials),

  register: (userData) =>
    api.post("/auth/registro", userData),

  confirmarEmail: (token) =>
    api.post(`/auth/confirmar/${token}`),

  resetPassword: (token, contraseña) =>
    api.post(`/auth/reset-password/${token}`, { contraseña }),

  forgotPassword: (correo) =>
    api.post("/auth/forgot-password", { correo }),

  // El refreshToken viaja automáticamente via cookie (withCredentials: true)
  refresh: () =>
    api.post("/auth/refresh"),

  logout: () =>
    api.post("/auth/logout"),
};
