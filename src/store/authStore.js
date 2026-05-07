import { create } from "zustand";
import { tokenService } from "./tokenService";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  initializing: true,

  setAuth: (user, accessToken) => {
    tokenService.set(accessToken);
    set({ user, isAuthenticated: true, initializing: false });
  },

  setInitialized: () =>
    set({ initializing: false }),

  updateUser: (data) =>
    set((s) => ({ user: s.user ? { ...s.user, ...data } : s.user })),

  clearAuth: () => {
    tokenService.clear();
    set({ user: null, isAuthenticated: false, initializing: false });
  },
}));

export default useAuthStore;
