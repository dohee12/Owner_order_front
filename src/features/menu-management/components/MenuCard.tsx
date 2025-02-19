import { useState } from "react";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Menu } from "@/entities/menu/model/menu-types";
import { Option } from "@/entities/owner/model/option-types";

interface MenuCardProps {
  menu: Menu;
  onEdit: (menuId: number) => void;
  onDelete: (menuId: number) => void;
  onToggleSoldOut: (menuId: number, isSoldOut: boolean) => void;
}

// 더미 카테고리 할당 함수 (옵션에 category 필드가 아직 없으므로 더미 데이터로 처리)
const getDummyCategory = (option: Option) => {
  if (option.name === "ICE" || option.name === "HOT") {
    return "Temperature";
  }
  if (option.name === "샷 추가") {
    return "Shot";
  }
  return "기타";
};

export const MenuCard = ({ menu, onEdit, onDelete, onToggleSoldOut }: MenuCardProps) => {
  // 로컬 상태로 매진 상태를 관리 (초기값은 menu.isSoldOut)
  const [isSoldOut, setIsSoldOut] = useState(menu.isSoldOut);

  // 옵션들을 더미 카테고리별로 그룹핑
  const optionsByCategory =
    menu.o_list?.reduce((acc, option) => {
      const category = getDummyCategory(option);
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(option);
      return acc;
    }, {} as Record<string, Option[]>) || {};

  // 스위치 토글 핸들러 (임의로 로컬 상태를 바꿉니다)
  const handleToggleSoldOut = () => {
    const newState = !isSoldOut;
    setIsSoldOut(newState);
    // 선택적 콜백 호출 (예: API 호출)
    onToggleSoldOut(menu.id, newState);
  };

  return (
    <Card className="p-4 cursor-pointer">
      <div className="flex flex-row gap-4">
        {/* 왼쪽 이미지 영역 */}
        {menu.menuImg && (
          <div className="w-1/2">
            <img
              src={menu.menuImg}
              alt={menu.name}
              className="object-cover w-full h-full rounded"
            />
          </div>
        )}
        {/* 오른쪽 정보 영역 */}
        <div className="flex flex-col justify-between w-1/2">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{menu.name}</h3>
              {/* 메뉴 이름 옆에 매진 처리 스위치 */}
              <div className="flex items-center">
                <span className="mr-2 text-xs">매진</span>
                <div className="relative inline-block w-10 h-6">
                  <input
                    id={`soldout-switch-${menu.id}`}
                    type="checkbox"
                    checked={isSoldOut}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleToggleSoldOut();
                    }}
                    className="absolute z-10 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor={`soldout-switch-${menu.id}`}
                    className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
                      isSoldOut ? "bg-green-500" : "bg-gray-300"
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
            <p className="font-semibold">₩{menu.price.toLocaleString()}</p>
            <div className="mt-2">
              <p className="text-sm font-semibold">옵션:</p>
              {menu.o_list && menu.o_list.length > 0 ? (
                <div className="mt-1 space-y-2">
                  {Object.entries(optionsByCategory).map(([category, options]) => (
                    <div key={category}>
                      <p className="text-xs font-medium text-gray-600">{category}</p>
                      <ul className="mt-1 ml-2 space-y-1 text-xs">
                        {options.map((option) => (
                          <li key={option.id}>
                            {option.name} {option.required && "(필수)"}{" "}
                            {option.price > 0 && `+ ₩${option.price.toLocaleString()}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400">옵션 없음</p>
              )}
            </div>
          </div>
          {/* 수정/삭제 버튼 */}
          <div className="flex mt-4 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(menu.id);
              }}
            >
              수정
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(menu.id);
              }}
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
