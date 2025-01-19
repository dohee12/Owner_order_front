import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/entities/auth/model/auth-store";

export const UnauthenticatedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    // 인증된 사용자는 바로 대시보드로 리디렉션
    return <Navigate to="/dashboard" replace />;
  }

  // 인증되지 않은 사용자는 자식 컴포넌트를 렌더링
  return <Outlet />;
};
