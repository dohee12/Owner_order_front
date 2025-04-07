import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { createMenu } from "@/entities/menu/api/create-menu";
import { CreateMenuResponse, CreateMenuRequest, Menu } from "@/entities/menu/model/menu-types";
import { ApiResponse } from "@/shared/api/type";
import { AxiosError } from "axios";

// 메뉴 생성
export const useCreateMenu = (): UseMutationResult<
  ApiResponse<CreateMenuResponse>,
  AxiosError,
  CreateMenuRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createMenu(data),

    // ✅ Optimistic Update 적용 (any 제거)
    onMutate: async (newMenu) => {
      await queryClient.cancelQueries({ queryKey: ["menus"] });

      // 기존 캐시된 데이터 가져오기
      const previousMenus = queryClient.getQueryData<ApiResponse<Menu[]>>(["menus"]);

      // 새로운 메뉴를 기존 리스트에 추가
      queryClient.setQueryData(["menus"], (oldMenus: ApiResponse<Menu[]> | undefined) => {
        if (!oldMenus) return { data: [{ ...newMenu, id: Date.now() }] };

        return {
          ...oldMenus,
          data: [...(oldMenus.data || []), { ...newMenu, id: Date.now() }],
        };
      });

      return { previousMenus }; // onError에서 롤백하기 위해 반환
    },

    // 성공 시 서버 데이터로 캐시 업데이트
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("✅ 메뉴가 정상적으로 추가되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["menus"] }); // 서버 데이터 최신화
      }
    },

    // 요청 실패 시 롤백
    onError: (error, _, context) => {
      console.error("❌ 메뉴 생성 실패", error);
      if (context?.previousMenus) {
        queryClient.setQueryData(["menus"], context.previousMenus);
      }
    },
  });
};
