import { useState } from "react";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Menu } from "@/entities/menu/model/menu-types";
import { Option } from "@/entities/option/store/option-types";

interface MenuCardProps {
  menu: Menu;
  onEdit: (menuId: number) => void;
  onDelete: (menuId: number) => void;
  onToggleSoldOut: (menuId: number, isSoldOut: boolean) => void;
}

export const MenuCard = ({ menu, onEdit, onDelete, onToggleSoldOut }: MenuCardProps) => {
  const [isSoldOut, setIsSoldOut] = useState(menu.isSoldOut);

  return (
    <Card
      className={`relative flex flex-col justify-between h-full p-4 transition ${
        isSoldOut ? "bg-gray-300 cursor-default" : "hover:shadow-lg"
      }`}
    >
      {/* ✅ 매진 상태 배지 */}
      {isSoldOut && (
        <span className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded top-2 left-2">
          비활성화
        </span>
      )}

      {/* 메뉴 정보 (이름, 가격, 매진 토글 포함) */}
      <div className={`flex items-center justify-between `}>
        {/* 메뉴 텍스트 정보 */}
        <div className="flex items-center gap-4">
          {/* 메뉴 이미지 */}
          {menu.menuImg && (
            <div className="flex-shrink-0 w-16 h-16">
              <img
                src={menu.menuImg}
                alt={menu.name}
                className="object-cover w-full h-full rounded"
              />
            </div>
          )}

          {/* 메뉴 이름 & 가격 */}
          <div className="flex-1">
            <h3 className={`text-lg font-semibold truncate ${isSoldOut ? "text-gray-500" : ""}`}>
              {menu.name}
            </h3>
            <p className={`text-gray-500 ${isSoldOut ? "text-gray-600" : ""}`}>
              ₩{menu.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* ✅ 매진 상태 토글 (이름 옆 배치, Hover 효과 적용) */}
        <div className="flex items-center">
          <div className="relative inline-block w-10 h-6 transition-transform hover:scale-110">
            <input
              id={`soldout-switch-${menu.id}`}
              type="checkbox"
              checked={isSoldOut}
              onChange={() => {
                setIsSoldOut(!isSoldOut);
                onToggleSoldOut(menu.id, !isSoldOut);
              }}
              className="absolute z-10 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor={`soldout-switch-${menu.id}`}
              className={`block overflow-hidden h-6 rounded-full cursor-pointer transition ${
                isSoldOut ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              <span
                className={`absolute left-0 top-0 h-6 w-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  isSoldOut ? "translate-x-4" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        </div>
      </div>

      {/* 옵션 및 버튼 영역 */}
      <div className="flex flex-col mt-2">
        {/* 옵션들 */}
        {menu.o_list && menu.o_list.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {menu.o_list.map((option) => (
              <span key={option.id} className="px-2 py-1 text-xs truncate bg-gray-200 rounded">
                {option.name} {option.price > 0 && `+₩${option.price}`}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ✅ 매진된 경우 수정/삭제 버튼 비활성화 */}
      <div className="flex gap-2 mt-2 ">
        <Button
          size="sm"
          className="w-full px-4 py-2 text-sm font-semibold text-white transition bg-blue-500 rounded hover:bg-blue-600 hover:bg-opacity-80"
          onClick={() => onEdit(menu.id)}
        >
          수정
        </Button>

        <Button
          size="sm"
          className="w-full px-4 py-2 text-sm font-semibold text-white transition bg-red-500 rounded hover:bg-red-600 hover:bg-opacity-80"
          onClick={() => onDelete(menu.id)}
        >
          삭제
        </Button>
      </div>
    </Card>
  );
};
