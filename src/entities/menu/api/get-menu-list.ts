import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { ApiResponse } from "@/shared/api/type";
import { Menu } from "../model/menu-types";

export const getMenuList = async (): Promise<ApiResponse<Menu[]>> => {
  const response = await axiosInstanceAuth.get<ApiResponse<Menu[]>>("/menuList");
  return response.data;
};
