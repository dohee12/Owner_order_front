import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { ApiResponse } from "@/shared/api/type";
import { EditMenuRequest, EditMenuResponse } from "../model/menu-types";

export const updateMenu = async (
  menuId: number,
  menuData: EditMenuRequest
): Promise<ApiResponse<EditMenuResponse>> => {
  const response = await axiosInstanceAuth.put<ApiResponse<EditMenuResponse>>(
    `/menu/edit?menu_id=${menuId}`,
    menuData
  );
  return response.data;
};
