import { create } from "zustand";
import { favoritesService } from "../features/favorites/services/favoritesService";

const useFavoritesStore = create((set, get) => ({
  favoritos: [],
  loading: false,

  fetchFavoritos: async () => {
    set({ loading: true });
    try {
      const { data } = await favoritesService.getFavoritos();
      set({ favoritos: data });
    } finally {
      set({ loading: false });
    }
  },

  addFavorito: async (productoId) => {
    const { data } = await favoritesService.addFavorito(productoId);
    set((state) => ({ favoritos: [...state.favoritos, data] }));
  },

  removeFavorito: async (favoritoId) => {
    await favoritesService.removeFavorito(favoritoId);
    set((state) => ({
      favoritos: state.favoritos.filter((f) => f._id !== favoritoId),
    }));
  },

  isFavorito: (productoId) =>
    get().favoritos.some((f) => f.producto?._id === productoId),
}));

export default useFavoritesStore;
