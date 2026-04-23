import api from "./api";

const userService = {
  getProfile: () => api.get("/usuario/perfil"),
  updateProfile: (data) => api.patch("/usuario/perfil", data),
  changePassword: (data) => api.post("/usuario/cambiar-contrasena", data),
};

export default userService;
