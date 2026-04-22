import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      if (state.items.find((i) => i.id === product.id)) return state;
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
