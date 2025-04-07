import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { ApiResponse, MessageResponse } from "@/shared/api/type";
import { AddMenuOptionsRequest } from "../model/menu-types";

export const addMenuOption = async ({
  menuId,
  optList,
}: AddMenuOptionsRequest): Promise<ApiResponse<MessageResponse>> => {
  const response = await axiosInstanceAuth.post<ApiResponse<MessageResponse>>(
    `/menu/option/add?menu_id=${menuId}`,
    { optList }
  );
  return response.data;
};
