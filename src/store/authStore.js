import { create } from "zustand";
import { tokenService } from "./tokenService";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  setAuth: (user, accessToken) => {
    tokenService.set(accessToken);
    set({ user, isAuthenticated: true });
  },

  updateUser: (data) =>
    set((s) => ({ user: s.user ? { ...s.user, ...data } : s.user })),

  clearAuth: () => {
    tokenService.clear();
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
