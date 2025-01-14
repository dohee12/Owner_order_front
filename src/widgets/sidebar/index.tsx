import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

const navigation = [
  { name: "대시보드", path: "/dashboard" },
  { name: "메뉴 관리", path: "/menu" },
  { name: "주문 관리", path: "/orders" },
  { name: "설정", path: "/settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-sm">
      <nav className="px-2 mt-5">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "group flex items-center px-2 py-2 text-base font-medium rounded-md",
                {
                  "bg-gray-100 text-gray-900": isActive,
                  "text-gray-600 hover:bg-gray-50 hover:text-gray-900":
                    !isActive,
                }
              )
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
