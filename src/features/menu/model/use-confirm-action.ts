import { useState } from "react";
import { useMenuActions } from "./use-menu-actions";
import { useGetMenuList } from "./queries/use-get-menu-list";

// ✅ Enum을 사용하여 confirmAction 타입 안정성 강화
export enum ConfirmAction {
  DELETE = "delete",
  SOLDOUT = "soldout",
  NONE = "none",
}

export const useConfirmAction = () => {
  const { deleteMenu, toggleSoldOut } = useMenuActions();
  const { data: menuList } = useGetMenuList(); // ✅ 현재 메뉴 상태 가져오기

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(ConfirmAction.NONE);
  const [confirmMenuId, setConfirmMenuId] = useState<number | null>(null);

  // ✅ 모달 열기
  const openConfirmModal = (action: ConfirmAction, menuId: number) => {
    setConfirmAction(action);
    setConfirmMenuId(menuId);
    setConfirmModalOpen(true);
  };

  // ✅ 확인 버튼 클릭 시 실행
  const handleConfirm = () => {
    if (confirmMenuId !== null) {
      if (confirmAction === ConfirmAction.DELETE) {
        deleteMenu(confirmMenuId);
      } else if (confirmAction === ConfirmAction.SOLDOUT) {
        // ✅ API에서 가져온 데이터 기반으로 현재 매진 상태 확인
        const menu = menuList?.data?.find((m) => m.id === confirmMenuId);
        const isCurrentlySoldOut = menu?.isSoldOut ?? false;
        toggleSoldOut(confirmMenuId, !isCurrentlySoldOut);
      }
    }
    closeConfirmModal();
  };

  // ✅ 모달 닫기
  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    setConfirmAction(ConfirmAction.NONE);
    setConfirmMenuId(null);
  };

  return {
    isConfirmModalOpen,
    confirmAction,
    confirmMenuId,
    openConfirmModal,
    handleConfirm,
    closeConfirmModal,
  };
};
