import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { deleteMenu } from "@/entities/menu/api/delete-menu";
import { DeleteMenuRequest, Menu } from "@/entities/menu/model/menu-types";
import { ApiResponse, MessageResponse } from "@/shared/api/type";
import { AxiosError } from "axios";

export const useDeleteMenu = (): UseMutationResult<
  ApiResponse<MessageResponse>,
  AxiosError,
  DeleteMenuRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId }) => deleteMenu(menuId),

    // ✅ Optimistic Update 적용 (any 제거)
    onMutate: async ({ menuId }) => {
      await queryClient.cancelQueries({ queryKey: ["menus"] });

      // 기존 메뉴 리스트 캐싱
      const previousMenus = queryClient.getQueryData<ApiResponse<Menu[]>>(["menus"]);

      // UI에서 메뉴를 즉시 제거
      queryClient.setQueryData(["menus"], (oldMenus: ApiResponse<Menu[]> | undefined) => {
        if (!oldMenus) return { data: [] };

        return {
          ...oldMenus,
          data: oldMenus.data?.filter((menu) => menu.id !== menuId),
        };
      });

      return { previousMenus }; // onError에서 롤백을 위해 반환
    },

    // 성공 시 서버 데이터로 캐시 최신화
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("✅ 메뉴가 정상적으로 삭제되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["menus"] }); // 서버 데이터 최신화
      }
    },

    // 실패 시 이전 상태로 롤백
    onError: (error, _, context) => {
      console.error("❌ 메뉴 삭제 실패", error);
      if (context?.previousMenus) {
        queryClient.setQueryData(["menus"], context.previousMenus);
      }
    },
  });
};
