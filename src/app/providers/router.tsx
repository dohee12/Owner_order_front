import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Loader } from "@/shared/ui/loader";
import { LoginPage } from "@/features/auth/LoginPage";
import { AuthenticatedRoute } from "@/features/auth/route/authenticated-route";
import { UnauthenticatedRoute } from "@/features/auth/route/unauthenticated-route";
import { AuthLayout } from "../layout/auth-layout";
import { MainLayout } from "../layout/main-layout";

const MenuManagementPage = lazy(() => import("@/pages/menu-management"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const OrderManagementPage = lazy(() => import("@/features/order/OrderManagementPage"));
const UnauthorizedPage = lazy(() => import("@/features/auth/UnauthorizedPage"));

export const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* '/' 경로에서 인증 상태를 확인하고 리다이렉트 */}
        <Route path="/" element={<AuthenticatedRoute />} />

        {/* 로그인하지 않은 사용자가 접근해야 할 페이지 */}
        <Route element={<UnauthenticatedRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>

        {/* 로그인한 사용자만 접근할 수 있는 페이지들 */}
        <Route element={<AuthenticatedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/menu" element={<MenuManagementPage />} />
            <Route path="/orders" element={<OrderManagementPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 접근 불가 페이지 */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Suspense>
  );
};
