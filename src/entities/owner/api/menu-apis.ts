import axiosInstance from "@/shared/api/axios-instance";
import { ApiResponse, MessageResponse } from "@/shared/api/type";
import {
  AddMenuOptionsRequest,
  CreateMenuRequest,
  CreateMenuResponse,
  EditMenuRequest,
  EditMenuResponse,
  Menu,
  RemoveMenuOptionRequest,
} from "../model/menu-types";

// 메뉴 리스트 가져오기
export const getMenuListApi = async (): Promise<ApiResponse<Menu[]>> => {
  const response = await axiosInstance.get<ApiResponse<Menu[]>>(
    "/api/v1/owner/menuList"
  );
  return response.data;
};

// 특정 메뉴의 상세 정보 가져오기
export const getMenuDetailApi = async (
  menuId: number
): Promise<ApiResponse<Menu>> => {
  const response = await axiosInstance.get<ApiResponse<Menu>>(
    `/api/v1/owner/menu/detail`,
    {
      params: {
        menuId: menuId,
      },
    }
  );
  return response.data;
};

// 메뉴 생성
export const createMenuApi = async (
  menuData: CreateMenuRequest
): Promise<ApiResponse<CreateMenuResponse>> => {
  const response = await axiosInstance.post<ApiResponse<CreateMenuResponse>>(
    "/api/v1/owner/menu/create",
    menuData
  );
  return response.data;
};

// 메뉴 수정
export const updateMenuApi = async (
  menuId: number,
  menuData: EditMenuRequest
): Promise<ApiResponse<EditMenuResponse>> => {
  const response = await axiosInstance.put<ApiResponse<EditMenuResponse>>(
    `/api/v1/owner/menu/edit?menu_id=${menuId}`,
    menuData
  );
  return response.data;
};

// 메뉴 삭제
export const deleteMenuApi = async (
  menuId: number
): Promise<ApiResponse<MessageResponse>> => {
  const response = await axiosInstance.delete<ApiResponse<MessageResponse>>(
    `/api/v1/owner/menu/delete?menu_id=${menuId}`
  );
  return response.data;
};

// 특정 메뉴에 옵션 추가
export const addOptionToMenuApi = async ({
  menuId,
  optList,
}: AddMenuOptionsRequest): Promise<ApiResponse<MessageResponse>> => {
  const response = await axiosInstance.post<ApiResponse<MessageResponse>>(
    `/api/v1/owner/menu/option/add?menu_id=${menuId}`,
    { optList }
  );
  return response.data;
};

// 특정 메뉴에서 특정 옵션 제거
export const removeOptionFromMenuApi = async ({
  menuId,
  optionId,
}: RemoveMenuOptionRequest): Promise<ApiResponse<MessageResponse>> => {
  const response = await axiosInstance.delete<ApiResponse<MessageResponse>>(
    `/api/v1/owner/menu/option/remove?menu_id=${menuId}&option_id=${optionId}`
  );
  return response.data;
};
