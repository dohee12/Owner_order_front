import { ApiResponse, MessageResponse } from "@/shared/api/type";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { removeMenuOption } from "../api/remove-menu-option";
import { RemoveMenuOptionRequest } from "../model/menu-types";

export const useRemoveMenuOption = () => {
  const mutation: UseMutationResult<
    ApiResponse<MessageResponse>,
    AxiosError,
    RemoveMenuOptionRequest
  > = useMutation({
    mutationFn: ({ menuId, optionId }) => removeMenuOption({ menuId, optionId }),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("메뉴에서 옵션이 제거되었습니다.");
      }
    },
    onError: (error) => {
      console.error("옵션 제거 실패", error);
    },
  });

  return mutation;
};
