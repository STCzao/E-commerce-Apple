import api from "../../../services/api";

export const favoritesService = {
  getFavoritos: () => api.get("/favorito"),
  addFavorito: (productoId) => api.post(`/favorito/${productoId}`),
  removeFavorito: (productoId) => api.delete(`/favorito/${productoId}`),
};
