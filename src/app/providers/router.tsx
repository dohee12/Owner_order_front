import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Loader } from "@/shared/ui/loader";
import { AuthenticatedRoute } from "@/features/auth/route/authenticated-route";
import { UnauthenticatedRoute } from "@/features/auth/route/unauthenticated-route";
import { AuthLayout } from "../layout/auth-layout";
import { MainLayout } from "../layout/main-layout";
import { LoginPage } from "../../pages/login";

const DashboardPage = lazy(() => import("@/pages/dashboard"));
const MenuPage = lazy(() => import("@/pages/menu"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const OrderPage = lazy(() => import("@/pages/order-management"));
const UnauthorizedPage = lazy(() => import("@/pages/unauthorized"));

export const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* 로그인하지 않은 사용자가 접근해야 할 페이지 */}
        <Route element={<UnauthenticatedRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>

        {/* 로그인한 사용자만 접근할 수 있는 페이지들 */}
        <Route element={<AuthenticatedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 접근 불가 페이지 */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Suspense>
  );
};
