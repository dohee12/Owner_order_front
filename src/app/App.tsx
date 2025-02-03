import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "@/widgets/layouts/auth-layout";
import { MainLayout } from "@/widgets/layouts/main-layout";
import { LoginPage } from "@/pages/auth/login";
import { AuthenticatedRoute } from "@/features/auth/route/authenticated-route";
import { UnauthenticatedRoute } from "@/features/auth/route/unauthenticated-route";
import { Loader } from "@/shared/ui/loader";
// import { RoleBasedRoute } from "@/features/auth/route/role-base-route";

const DashboardPage = lazy(() => import("@/pages/dashboard"));
const MenuManagementPage = lazy(() => import("@/pages/menu-management"));
const OrderManagementPage = lazy(() => import("@/pages/order-management"));
// const SettingsPage = lazy(() => import("@/pages/settings"));
const UnauthorizedPage = lazy(() => import("@/pages/unauthorized"));

const App = () => {
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
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/menu" element={<MenuManagementPage />} />
            <Route path="/orders" element={<OrderManagementPage />} />

            {/* 관리자만 접근 가능한 페이지
            <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
              <Route path="/settings" element={<SettingsPage />} />
            </Route> */}
          </Route>
        </Route>

        {/* 접근 불가 페이지 */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
