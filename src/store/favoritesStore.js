import { create } from "zustand";
import { favoritesService } from "../features/favorites/services/favoritesService";

const productId = (item) =>
  item?.producto?._id ?? item?.producto?.id ?? item?._id ?? item?.id;

const useFavoritesStore = create((set, get) => ({
  items: [],
  loading: false,

  isFavorite: (id) => get().items.some((i) => productId(i) === id),

  toggle: async (product, isAuthenticated) => {
    const id      = product._id ?? product.id;
    const already = get().isFavorite(id);

    if (!isAuthenticated) {
      set((s) => ({
        items: already
          ? s.items.filter((i) => productId(i) !== id)
          : [...s.items, { producto: product }],
      }));
      return;
    }

    if (already) {
      const snapshot = get().items;
      set((s) => ({ items: s.items.filter((i) => productId(i) !== id) }));
      try {
        await favoritesService.removeFavorito(id);
      } catch {
        set({ items: snapshot });
      }
    } else {
      set((s) => ({ items: [...s.items, { producto: product }] }));
      try {
        await favoritesService.addFavorito(id);
      } catch {
        set((s) => ({ items: s.items.filter((i) => productId(i) !== id) }));
      }
    }
  },

  fetchFavorites: async () => {
    set({ loading: true });
    try {
      const { data } = await favoritesService.getFavoritos();
      set({ items: data.favoritos ?? [] });
    } catch {
      /* silencioso — favoritos locales persisten */
    } finally {
      set({ loading: false });
    }
  },

  clear: () => set({ items: [] }),
}));

export default useFavoritesStore;
