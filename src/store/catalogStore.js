import { create } from "zustand";

const useCatalogStore = create((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  categoriaActiva: null,
  setCategoriaActiva: (id) =>
    set((s) => ({ categoriaActiva: s.categoriaActiva === id ? null : id })),
}));

export default useCatalogStore;
