import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Menu } from "@/entities/menu/model/menu-types";
import { MenuCard } from "@/features/menu/ui/MenuCard";
import { AddMenuModal } from "@/features/menu/ui/AddMenuModal";
import { ConfirmModal } from "@/features/menu/ui/ConfirmModal";
import { useConfirmAction } from "@/features/menu/model/use-confirm-action";
import { useGetMenuList } from "@/features/menu/model/queries/use-get-menu-list";
import { useMenuActions } from "@/features/menu/model/use-menu-actions";
import { MenuDetailModal } from "@/widgets/menu/MenuDetailModal";

const dummyData = [
  {
    id: 7,
    name: "앞메리카노",
    price: 1500,
    menuImg:
      "https://raw.githubusercontent.com/BlooMir/imageShare/refs/heads/main/images/americano.png",
    o_list: [
      {
        id: 1,
        name: "ICE",
        price: 0,
        required: true,
        storeId: 0,
      },
      {
        id: 2,
        name: "HOT",
        price: 0,
        required: true,
        storeId: 0,
      },
      {
        id: 3,
        name: "샷 추가",
        price: 500,
        required: false,
        storeId: 0,
      },
    ],
    store_id: 4,
  },
  {
    id: 8,
    name: "라떼",
    price: 2500,
    menuImg:
      "https://raw.githubusercontent.com/BlooMir/imageShare/refs/heads/main/images/latte.png",
    o_list: [
      {
        id: 4,
        name: "ICE",
        price: 0,
        required: true,
        storeId: 0,
      },
      {
        id: 5,
        name: "HOT",
        price: 0,
        required: true,
        storeId: 0,
      },
      {
        id: 6,
        name: "샷 추가",
        price: 500,
        required: false,
        storeId: 0,
      },
    ],
    store_id: 4,
  },
  {
    id: 9,
    name: "카푸치노",
    price: 2800,
    menuImg:
      "https://raw.githubusercontent.com/BlooMir/imageShare/refs/heads/main/images/cappuccino.png",
    o_list: [
      {
        id: 7,
        name: "ICE",
        price: 0,
        required: true,
        storeId: 0,
      },
      {
        id: 8,
        name: "HOT",
        price: 0,
        required: true,
        storeId: 0,
      },
      {
        id: 9,
        name: "시나몬 추가",
        price: 300,
        required: false,
        storeId: 0,
      },
    ],
    store_id: 4,
  },
  {
    id: 10,
    name: "카라멜 마끼아또",
    price: 3200,
    menuImg:
      "https://raw.githubusercontent.com/BlooMir/imageShare/refs/heads/main/images/caramel-macchiato.png",
    o_list: [
      {
        id: 10,
        name: "ICE",
        price: 0,
        required: true,
        storeId: 0,
      },
      {
        id: 11,
        name: "HOT",
        price: 0,
        required: true,
        storeId: 0,
      },
      {
        id: 12,
        name: "카라멜 추가",
        price: 400,
        required: false,
        storeId: 0,
      },
    ],
    store_id: 4,
  },
];

const MenuPage = () => {
  const { data, isLoading, isError } = useGetMenuList();
  // const menus: Menu[] = data || [];
  const menus: Menu[] = dummyData || [];

  const { addMenu } = useMenuActions();
  const {
    isConfirmModalOpen,
    confirmAction,
    confirmMenuId,
    openConfirmModal,
    handleConfirm,
    closeConfirmModal,
  } = useConfirmAction();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 메뉴 상세 데이터
  const selectedMenuDetail =
    menus.find((menu) => menu.id === selectedMenuId) || null;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading menus</p>;

  return (
    <div className="w-full p-6 space-y-5">
      {/* 상단 헤더 */}
      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <h1 className="text-2xl font-bold">메뉴 관리</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>새 메뉴 추가</Button>
      </div>

      {/* 좌우 레이아웃 */}
      <div className="flex gap-6">
        {/* 왼쪽: 메뉴 리스트 */}
        <div className="w-1/2 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
          {menus.map((menu) => (
            <div key={menu.id} onClick={() => setSelectedMenuId(menu.id)}>
              <MenuCard
                menu={menu}
                onEdit={() => {
                  setSelectedMenuId(menu.id);
                  setIsAddModalOpen(true);
                }}
                onDelete={() => openConfirmModal("delete", menu.id)}
                onToggleSoldOut={() => openConfirmModal("soldout", menu.id)}
              />
            </div>
          ))}
        </div>

        {/* 오른쪽: 선택한 메뉴 상세 */}
        <div className="w-1/2">
          {selectedMenuDetail ? (
            <MenuCard
              menu={selectedMenuDetail}
              onEdit={() => setIsDetailModalOpen(true)}
              onDelete={() => openConfirmModal("delete", selectedMenuDetail.id)}
              onToggleSoldOut={() =>
                openConfirmModal("soldout", selectedMenuDetail.id)
              }
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              왼쪽에서 메뉴를 선택해주세요
            </div>
          )}
        </div>
      </div>

      {/* 모달들 */}
      <AddMenuModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(data) => addMenu(data, () => setIsAddModalOpen(false))}
      />

      <MenuDetailModal
        isOpen={isDetailModalOpen}
        menuDetail={selectedMenuDetail}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={confirmAction === "delete" ? "메뉴 삭제 확인" : "매진 처리 확인"}
        message={
          confirmAction === "delete"
            ? "정말 메뉴를 삭제하시겠습니까?"
            : "정말 이 메뉴를 매진 처리하시겠습니까?"
        }
        onConfirm={handleConfirm}
        onCancel={closeConfirmModal}
      />
    </div>
  );
};

export default MenuPage;
