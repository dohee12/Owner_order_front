import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/utils";
import { FiHome, FiMenu, FiShoppingCart, FiSettings } from "react-icons/fi"; // 아이콘 예시

const navigation = [
  { name: "대시보드", path: "/dashboard", icon: <FiHome size={25} /> },
  { name: "메뉴 관리", path: "/menu", icon: <FiMenu size={25} /> },
  { name: "주문 관리", path: "/orders", icon: <FiShoppingCart size={25} /> },
  { name: "설정", path: "/settings", icon: <FiSettings size={25} /> },
];

export const Sidebar = () => {
  return (
    <aside className="bg-white shadow-sm">
      <nav className="px-2">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "group flex flex-col items-center justify-center w-20 h-20 text-base font-medium rounded-lg transition-all",
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
    </aside>
  );
};
