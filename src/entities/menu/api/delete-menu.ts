import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { ApiResponse, MessageResponse } from "@/shared/api/type";

export const deleteMenu = async (menuId: number): Promise<ApiResponse<MessageResponse>> => {
  const response = await axiosInstanceAuth.delete<ApiResponse<MessageResponse>>(
    `/menu/delete?menu_id=${menuId}`
  );
  return response.data;
};
