import { ApiResponse, MessageResponse } from "@/shared/api/type";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addMenuOption } from "../api/add-menu-option";
import { AddMenuOptionsRequest } from "../model/menu-types";

// 메뉴에 옵션 추가
export const useAddMenuOption = () => {
  const mutation: UseMutationResult<
    ApiResponse<MessageResponse>,
    AxiosError,
    AddMenuOptionsRequest
  > = useMutation({
    mutationFn: ({ menuId, optList }) => addMenuOption({ menuId, optList }),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("메뉴에 옵션이 추가되었습니다.");
      }
    },
    onError: (error) => {
      console.error("옵션 추가 실패", error);
    },
  });

  return mutation;
};
