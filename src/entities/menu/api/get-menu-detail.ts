import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { ApiResponse } from "@/shared/api/type";
import { Menu } from "../model/menu-types";

export const getMenuDetail = async (menuId: number): Promise<ApiResponse<Menu>> => {
  const response = await axiosInstanceAuth.get<ApiResponse<Menu>>(`/menu/detail`, {
    params: { menu_id: menuId },
  });
  return response.data;
};
