import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { updateMenu } from "@/entities/menu/api/update-menu";
import { EditMenuResponse, EditMenuRequest, Menu } from "@/entities/menu/model/menu-types";
import { ApiResponse } from "@/shared/api/type";
import { AxiosError } from "axios";

export const useUpdateMenu = (): UseMutationResult<
  ApiResponse<EditMenuResponse>,
  AxiosError,
  { menuId: number } & EditMenuRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, ...data }) => updateMenu(menuId, data),

    // ✅ Optimistic Update 적용
    onMutate: async ({ menuId, ...updatedMenu }) => {
      await queryClient.cancelQueries({ queryKey: ["menus"] });

      // 기존 캐시된 데이터 가져오기
      const previousMenus = queryClient.getQueryData<ApiResponse<Menu[]>>(["menus"]);

      // UI에서 먼저 업데이트 반영
      queryClient.setQueryData(["menus"], (oldMenus: ApiResponse<Menu[]> | undefined) => {
        if (!oldMenus) return { data: [] };

        return {
          ...oldMenus,
          data: oldMenus.data?.map((menu) =>
            menu.id === menuId ? { ...menu, ...updatedMenu } : menu
          ),
        };
      });

      return { previousMenus }; // onError에서 롤백하기 위해 반환
    },

    // 성공 시 서버 데이터로 캐시 최신화
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("✅ 메뉴가 정상적으로 수정되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["menus"] }); // 서버 데이터 최신화
      }
    },

    // 실패 시 이전 상태로 롤백
    onError: (error, _, context) => {
      console.error("❌ 메뉴 수정 실패", error);
      if (context?.previousMenus) {
        queryClient.setQueryData(["menus"], context.previousMenus);
      }
    },
  });
};
