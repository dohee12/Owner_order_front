import { useTokenRenewal } from "@/entities/auth/hooks/use-token-renewal";
import { useAuthStore } from "@/entities/auth/model/auth-store";
import { Loader } from "@/shared/ui/loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthenticatedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessTokenExpiration = useAuthStore((state) => state.accessTokenExpiration);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const location = useLocation();
  const { mutate, isPending } = useTokenRenewal();

  // 인증 상태가 초기화되지 않은 경우 로딩 UI 표시
  if (!isInitialized) {
    return <Loader />;
  }

  if (location.pathname === "/") {
    const redirectPath = isAuthenticated ? "/orders" : "/login";
    return <Navigate to={redirectPath} replace />;
  }

  if (isAuthenticated) {
    if (accessTokenExpiration) {
      const expirationTime = new Date(accessTokenExpiration).getTime();
      const currentTime = new Date().getTime();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration <= 10000 && !isPending) {
        mutate();
      }
    }
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};
