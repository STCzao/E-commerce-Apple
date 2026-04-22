import api from "../../../services/api";

export const favoritesService = {
  getFavoritos: () =>
    api.get("/favoritos"),

  addFavorito: (productoId) =>
    api.post("/favoritos", { productoId }),

  removeFavorito: (favoritoId) =>
    api.delete(`/favoritos/${favoritoId}`),
};
