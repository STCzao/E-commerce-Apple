import api from "../../../services/api";

const adminService = {
  crearProducto: (data) => api.post("/productos", data),
  actualizarProducto: (id, data) => api.patch(`/productos/${id}`, data),
  eliminarProducto: (id) => api.delete(`/productos/${id}`),
  toggleEstado: (id, estado) => api.patch(`/productos/${id}`, { estado }),
  crearCategoria: (data) => api.post("/categorias", data),
  actualizarCategoria: (id, data) => api.patch(`/categorias/${id}`, data),
  eliminarCategoria: (id) => api.delete(`/categorias/${id}`),
};

export default adminService;
