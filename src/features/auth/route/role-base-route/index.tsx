// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthStore } from "@/entities/auth/model/auth-store";

// interface RoleBasedRouteProps {
//   allowedRoles: string[];
// }

// export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles }) => {
//   const { user } = useAuthStore();
//   // 추후에 계정 권한이 생겼을 경우
//   if (!user || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };
