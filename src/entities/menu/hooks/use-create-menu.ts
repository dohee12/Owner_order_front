import { ApiResponse } from "@/shared/api/type";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createMenu } from "../api/create-menu";
import { CreateMenuResponse, CreateMenuRequest } from "../model/menu-types";

// 메뉴 생성
export const useCreateMenu = () => {
  const mutation: UseMutationResult<
    ApiResponse<CreateMenuResponse>,
    AxiosError,
    CreateMenuRequest
  > = useMutation({
    mutationFn: (data) => createMenu(data),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("메뉴가 정상적으로 추가되었습니다.");
      }
    },
    onError: (error) => {
      console.error("메뉴 생성 실패", error);
    },
  });

  return mutation;
};
