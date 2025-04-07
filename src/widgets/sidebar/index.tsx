import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { FiHome, FiMenu, FiShoppingCart, FiSettings } from "react-icons/fi";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/entities/auth/hooks/use-logout";

const navigation = [
  { name: "대시보드", path: "/dashboard", icon: <FiHome size={25} /> },
  { name: "메뉴 관리", path: "/menu", icon: <FiMenu size={25} /> },
  { name: "주문 관리", path: "/orders", icon: <FiShoppingCart size={25} /> },
  { name: "설정", path: "/settings", icon: <FiSettings size={25} /> },
];

export const Sidebar = () => {
  const { mutate: logout } = useLogout();

  return (
    <aside className="flex flex-col w-20 bg-white shadow-sm">
      {/* 네비게이션 영역 (상단) */}
      <nav className="flex flex-col flex-1">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "group flex flex-col items-center justify-center h-20 text-base font-medium transition-all",
                {
                  "bg-gray-100 text-gray-900 font-bold": isActive,
                  "text-gray-600 hover:bg-gray-50 hover:text-gray-900": !isActive,
                }
              )
            }
          >
            <div className="mb-2">{item.icon}</div>
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* 로그아웃 버튼 (하단) */}
      <div className="flex items-center justify-center h-20">
        <Button
          onClick={logout}
          className={cn(
            "group flex flex-col items-center justify-center h-16 w-16 text-base font-medium rounded-lg transition-all text-white bg-red-500 hover:bg-red-600"
          )}
        >
          {/* 필요 시 아이콘 추가 */}
          <span className="text-sm">로그아웃</span>
        </Button>
      </div>
    </aside>
  );
};
