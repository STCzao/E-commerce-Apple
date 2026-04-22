import { create } from "zustand";

const useCatalogStore = create((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));

export default useCatalogStore;
