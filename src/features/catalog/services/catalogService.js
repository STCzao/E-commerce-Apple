import api from "../../../services/api";

export const catalogService = {
  getProductos: (params) =>
    api.get("/productos", { params }),

  getProductoById: (id) =>
    api.get(`/productos/${id}`),

  getCategorias: () =>
    api.get("/categorias"),

  getCategoriaById: (id) =>
    api.get(`/categorias/${id}`),
};
