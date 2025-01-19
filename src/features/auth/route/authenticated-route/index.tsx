import { useAuthStore } from "@/entities/auth/model/auth-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthenticatedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // '/' 경로에서 인증 상태에 맞게 리디렉션 처리
  if (location.pathname === "/") {
    const redirectPath = isAuthenticated ? "/dashboard" : "/login";
    return <Navigate to={redirectPath} replace />;
  }

  // 인증 상태에 따라 접근 가능 여부 결정
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};
