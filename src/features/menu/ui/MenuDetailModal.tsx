import { Button } from "@/shared/ui/button";
import { Menu } from "@/entities/menu/model/menu-types";

interface MenuDetailModalProps {
  isOpen: boolean;
  menuDetail: Menu | null;
  onClose: () => void;
}

export const MenuDetailModal = ({ isOpen, menuDetail, onClose }: MenuDetailModalProps) => {
  if (!isOpen) return null;
  if (!menuDetail) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-full p-6 overflow-auto bg-white rounded shadow-lg w-96">
        <h2 className="mb-4 text-xl font-bold">메뉴 상세 정보</h2>
        <p className="mb-2">
          <strong>메뉴 이름:</strong> {menuDetail.name}
        </p>
        <p className="mb-2">
          <strong>가격:</strong> ₩{menuDetail.price.toLocaleString()}
        </p>
        {menuDetail.menuImg && (
          <img
            src={menuDetail.menuImg}
            alt={menuDetail.name}
            className="object-cover w-full h-40 mb-2 rounded"
          />
        )}
        <div>
          <p className="font-semibold">옵션:</p>
          {menuDetail.o_list && menuDetail.o_list.length > 0 ? (
            <ul className="mt-1 space-y-1 text-sm">
              {menuDetail.o_list.map((option) => (
                <li key={option.id}>
                  {option.name} {option.required && "(필수)"}{" "}
                  {option.price > 0 && `+ ₩${option.price.toLocaleString()}`}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-gray-400">옵션 없음</p>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};
