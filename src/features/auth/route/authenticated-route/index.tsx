import { useTokenRenewal } from "@/entities/auth/hooks/use-token-renewal";
import { useAuthStore } from "@/entities/auth/model/auth-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AuthenticatedRoute: React.FC = () => {
  const { isAuthenticated, accessTokenExpiration } = useAuthStore();
  const location = useLocation();
  const { mutate, isPending } = useTokenRenewal(); // 토큰 재발급 훅 사용

  // '/' 경로에서 인증 상태에 맞게 리디렉션 처리
  if (location.pathname === "/") {
    const redirectPath = isAuthenticated ? "/dashboard" : "/login";
    return <Navigate to={redirectPath} replace />;
  }

  // 인증 상태에 따라 접근 가능 여부 결정
  if (isAuthenticated) {
    if (accessTokenExpiration) {
      const expirationTime = new Date(accessTokenExpiration).getTime();
      const currentTime = new Date().getTime();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration <= 10000) {
        if (!isPending) {
          mutate(); // 만료 10초 전에 재발급 요청
        }
      }
    }
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};
