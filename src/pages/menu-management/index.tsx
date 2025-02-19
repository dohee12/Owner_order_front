import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useGetMenuList, useCreateMenu } from "@/entities/menu/hooks/use-menu";
import { Menu } from "@/entities/menu/model/menu-types";
import { MenuCard } from "@/features/menu-management/components/MenuCard";
import {
  AddMenuModal,
  AddMenuFormValues,
} from "@/features/menu-management/components/AddMenuModal";
import { MenuDetailModal } from "@/features/menu-management/components/MenuDetailModal";
import { ConfirmModal } from "@/features/menu-management/components/ConfirmModal";

const MenuManagementPage = () => {
  const { data, isLoading, isError } = useGetMenuList();
  // API 데이터가 data.data에 있다고 가정 (여기서는 간단히 data를 menus로 사용)
  const menus: Menu[] = data || [];
  const createMenuMutation = useCreateMenu();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 삭제/매진 확인 모달 상태
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  // "delete" | "soldout" | null
  const [confirmAction, setConfirmAction] = useState<"delete" | "soldout" | null>(null);
  const [confirmMenuId, setConfirmMenuId] = useState<number | null>(null);

  // 메뉴 추가 핸들러
  const handleAddMenu = (data: AddMenuFormValues) => {
    const payload = {
      menu_name: data.menu_name,
      price: data.price,
      // opt_list는 옵션 객체의 id 값을 문자열 배열로 전송합니다.
      opt_list: data.opt_list.map((opt) => String(opt.id)),
    };

    createMenuMutation.mutate(payload, {
      onSuccess: () => {
        console.log("메뉴가 정상적으로 추가되었습니다.");
        setIsAddModalOpen(false);
      },
      onError: (error) => {
        console.error("메뉴 생성 실패", error);
      },
    });
  };

  // 메뉴 상세 데이터 (간단 예시로 menus 배열에서 찾음)
  const selectedMenuDetail = menus.find((menu) => menu.id === selectedMenuId) || null;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading menus</p>;

  // Confirm modal에서 확인을 눌렀을 때 실행할 동작
  const handleConfirm = () => {
    if (confirmAction === "delete" && confirmMenuId !== null) {
      // 실제 삭제 로직 추가 (예: API 호출)
      console.log("Delete menu", confirmMenuId);
      // 예: 삭제 API 호출 후 리패치 처리
    } else if (confirmAction === "soldout" && confirmMenuId !== null) {
      const menu = menus.find((m) => m.id === confirmMenuId);
      if (menu) {
        console.log("Toggle sold out for menu", confirmMenuId);
        // 실제 매진/매진 취소 처리 로직 추가 (예: API 호출)
        // 예: toggle soldOut 상태
      }
    }
    setConfirmModalOpen(false);
    setConfirmAction(null);
    setConfirmMenuId(null);
  };

  const handleCancelConfirm = () => {
    setConfirmModalOpen(false);
    setConfirmAction(null);
    setConfirmMenuId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <h1 className="text-2xl font-bold">메뉴 관리</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>새 메뉴 추가</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            onEdit={(menuId) => {
              // 수정 로직: 메뉴 상세 정보 모달 열기
              setSelectedMenuId(menuId);
              setIsDetailModalOpen(true);
              console.log("Edit menu", menuId);
            }}
            onDelete={(menuId) => {
              // 삭제 확인 모달 띄우기
              setConfirmAction("delete");
              setConfirmMenuId(menuId);
              setConfirmModalOpen(true);
            }}
            onToggleSoldOut={(menuId, newSoldOut) => {
              // 매진 처리 확인 모달 띄우기
              setConfirmAction("soldout");
              setConfirmMenuId(menuId);
              setConfirmModalOpen(true);
            }}
          />
        ))}
      </div>

      <AddMenuModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMenu}
      />

      <MenuDetailModal
        isOpen={isDetailModalOpen}
        menuDetail={selectedMenuDetail}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* 확인 모달 (삭제/매진 처리) */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        title={
          confirmAction === "delete"
            ? "메뉴 삭제 확인"
            : confirmAction === "soldout"
            ? menus.find((m) => m.id === confirmMenuId)?.isSoldOut
              ? "매진 취소 확인"
              : "매진 처리 확인"
            : ""
        }
        message={
          confirmAction === "delete"
            ? "정말 메뉴를 삭제하시겠습니까?"
            : confirmAction === "soldout"
            ? menus.find((m) => m.id === confirmMenuId)?.isSoldOut
              ? "정말 매진 상태를 취소하시겠습니까?"
              : "정말 이 메뉴를 매진 처리하시겠습니까?"
            : ""
        }
        onConfirm={handleConfirm}
        onCancel={handleCancelConfirm}
      />
    </div>
  );
};

export default MenuManagementPage;
