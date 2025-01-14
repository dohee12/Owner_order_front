import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/entities/auth/model/store";

export const AuthenticatedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
