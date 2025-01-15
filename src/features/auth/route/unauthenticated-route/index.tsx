import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/entities/auth/model/auth-store";

export const UnauthenticatedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // 인증된 사용자가 접근 시 대시보드로 리디렉션
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    // 인증된 사용자는 null을 반환하여 자식 컴포넌트가 렌더링되지 않도록 함
    return null;
  }

  // 인증되지 않은 사용자는 Outlet을 사용하여 자식 컴포넌트를 렌더링
  return <Outlet />;
};
