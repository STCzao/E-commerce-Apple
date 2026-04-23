import { authService } from "../services/authService";
import useAuthStore from "../../../store/authStore";
import useFavoritesStore from "../../../store/favoritesStore";

const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const { fetchFavorites, clear: clearFavorites } = useFavoritesStore();

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    setAuth(data.usuario, data.accessToken);
    fetchFavorites();
    return data;
  };

  const register = async (userData) => {
    const { data } = await authService.register(userData);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    clearAuth();
    clearFavorites();
  };

  return { user, isAuthenticated, login, register, logout };
};

export default useAuth;
