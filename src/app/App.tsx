import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "@/widgets/layouts/auth-layout";
import { MainLayout } from "@/widgets/layouts/main-layout";
import { LoginPage } from "@/pages/auth/login";
import { AuthenticatedRoute } from "@/features/auth/authenticated-route";
import { RoleBasedRoute } from "@/features/auth/role-base-route";

// Lazy loading for pages
const DashboardPage = lazy(() => import("@/pages/dashboard"));
const MenuManagementPage = lazy(() => import("@/pages/menu-management"));
const OrderManagementPage = lazy(() => import("@/pages/order-management"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const UnauthorizedPage = lazy(() => import("@/pages/unauthorized"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* 로그인 안했을 때의 페이지들 */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* 로그인 했을 때의 페이지들 */}
        <Route element={<AuthenticatedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/menu" element={<MenuManagementPage />} />
            <Route path="/orders" element={<OrderManagementPage />} />

            {/* 관리자만 접근 가능한 페이지 */}
            <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Route>

        {/* 접근 불가 페이지 */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
