import { Navigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";

const AdminRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const initializing = useAuthStore((s) => s.initializing);
  const rol = useAuthStore((s) => s.user?.rol);

  if (initializing) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (rol !== "ADMIN_ROLE") return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
