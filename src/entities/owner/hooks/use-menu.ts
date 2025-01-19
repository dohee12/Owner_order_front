import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";

import { AxiosError } from "axios";
import { ApiResponse, MessageResponse } from "@/shared/api/type";
import {
  getMenuListApi,
  getMenuDetailApi,
  createMenuApi,
  updateMenuApi,
  deleteMenuApi,
  addOptionToMenuApi,
  removeOptionFromMenuApi,
} from "../api/menu-apis";
import {
  Menu,
  CreateMenuResponse,
  CreateMenuRequest,
  EditMenuResponse,
  EditMenuRequest,
  DeleteMenuRequest,
  AddMenuOptionsRequest,
  RemoveMenuOptionRequest,
} from "../model/menu-types";

// 메뉴 리스트 가져오기
export const useGetMenuList = () => {
  const query = useQuery<ApiResponse<Menu[]>, AxiosError>({
    queryKey: ["menuList"],
    queryFn: getMenuListApi,
  });

  return query;
};

// 특정 메뉴의 상세 정보 가져오기
export const useGetMenuDetail = (menuId: number) => {
  const query = useQuery<ApiResponse<Menu>, AxiosError>({
    queryKey: ["menuDetail", menuId],
    queryFn: () => getMenuDetailApi(menuId),
  });

  return query;
};

// 메뉴 생성
export const useCreateMenu = () => {
  const mutation: UseMutationResult<
    ApiResponse<CreateMenuResponse>,
    AxiosError,
    CreateMenuRequest
  > = useMutation({
    mutationFn: (data) => createMenuApi(data),
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

// 메뉴 수정
export const useUpdateMenu = () => {
  const mutation: UseMutationResult<
    ApiResponse<EditMenuResponse>,
    AxiosError,
    { menuId: number } & EditMenuRequest
  > = useMutation({
    mutationFn: ({ menuId, ...data }) => updateMenuApi(menuId, data),
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

// 메뉴 삭제
export const useDeleteMenu = () => {
  const mutation: UseMutationResult<
    ApiResponse<MessageResponse>,
    AxiosError,
    DeleteMenuRequest
  > = useMutation({
    mutationFn: ({ menuId }) => deleteMenuApi(menuId),
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

// 메뉴에 옵션 추가
export const useAddOptionToMenu = () => {
  const mutation: UseMutationResult<
    ApiResponse<MessageResponse>,
    AxiosError,
    AddMenuOptionsRequest
  > = useMutation({
    mutationFn: ({ menuId, optList }) =>
      addOptionToMenuApi({ menuId, optList }),
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

// 메뉴에서 특정 옵션 제거
export const useRemoveOptionFromMenu = () => {
  const mutation: UseMutationResult<
    ApiResponse<MessageResponse>,
    AxiosError,
    RemoveMenuOptionRequest
  > = useMutation({
    mutationFn: ({ menuId, optionId }) =>
      removeOptionFromMenuApi({ menuId, optionId }),
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
