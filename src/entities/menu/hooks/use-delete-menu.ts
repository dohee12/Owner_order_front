import { ApiResponse, MessageResponse } from "@/shared/api/type";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteMenu } from "../api/delete-menu";
import { DeleteMenuRequest } from "../model/menu-types";

export const useDeleteMenu = () => {
  const mutation: UseMutationResult<
    ApiResponse<MessageResponse>,
    AxiosError,
    DeleteMenuRequest
  > = useMutation({
    mutationFn: ({ menuId }) => deleteMenu(menuId),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("메뉴가 정상적으로 삭제되었습니다.");
      }
    },
    onError: (error) => {
      console.error("메뉴 삭제 실패", error);
    },
  });

  return mutation;
};
