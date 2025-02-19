import { ApiResponse } from "@/shared/api/type";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateMenu } from "../api/update-menu";
import { EditMenuResponse, EditMenuRequest } from "../model/menu-types";

export const useUpdateMenu = () => {
  const mutation: UseMutationResult<
    ApiResponse<EditMenuResponse>,
    AxiosError,
    { menuId: number } & EditMenuRequest
  > = useMutation({
    mutationFn: ({ menuId, ...data }) => updateMenu(menuId, data),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("메뉴가 정상적으로 수정되었습니다.");
      }
    },
    onError: (error) => {
      console.error("메뉴 수정 실패", error);
    },
  });

  return mutation;
};
