import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { ApiResponse, MessageResponse } from "@/shared/api/type";
import { RemoveMenuOptionRequest } from "../model/menu-types";

export const removeMenuOption = async ({
  menuId,
  optionId,
}: RemoveMenuOptionRequest): Promise<ApiResponse<MessageResponse>> => {
  const response = await axiosInstanceAuth.delete<ApiResponse<MessageResponse>>(
    `/menu/option/remove?menu_id=${menuId}&option_id=${optionId}`
  );
  return response.data;
};
