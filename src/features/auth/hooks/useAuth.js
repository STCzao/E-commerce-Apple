import { authService } from "../services/authService";
import useAuthStore from "../../../store/authStore";

const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    // El backend devuelve { accessToken, usuario }
    // El refreshToken llega como HttpOnly cookie automáticamente
    setAuth(data.usuario, data.accessToken);
    return data;
  };

  const register = async (userData) => {
    const { data } = await authService.register(userData);
    // El registro requiere verificación de email — no hay accessToken aún
    return data;
  };

  const logout = async () => {
    await authService.logout();
    clearAuth();
  };

  return { user, isAuthenticated, login, register, logout };
};

export default useAuth;
