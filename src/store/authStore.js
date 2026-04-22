import { create } from "zustand";
import { tokenService } from "./tokenService";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  setAuth: (user, accessToken) => {
    tokenService.set(accessToken);
    set({ user, isAuthenticated: true });
  },

  clearAuth: () => {
    tokenService.clear();
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
