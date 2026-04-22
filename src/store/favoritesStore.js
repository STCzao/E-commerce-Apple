import { create } from "zustand";

const useFavoritesStore = create((set) => ({
  items: [],

  toggle: (product) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === product.id);
      return {
        items: exists
          ? state.items.filter((i) => i.id !== product.id)
          : [...state.items, product],
      };
    }),
}));

export default useFavoritesStore;
