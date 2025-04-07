import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { ApiResponse } from "@/shared/api/type";
import { CreateMenuRequest, CreateMenuResponse } from "../model/menu-types";

export const createMenu = async (
  menuData: CreateMenuRequest
): Promise<ApiResponse<CreateMenuResponse>> => {
  const response = await axiosInstanceAuth.post<ApiResponse<CreateMenuResponse>>(
    "/menu/create",
    menuData
  );
  return response.data;
};
