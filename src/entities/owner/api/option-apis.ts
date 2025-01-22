import axiosInstance from "@/shared/api/axios-instance";
import { ApiResponse } from "@/shared/api/type";
import { Option } from "../model/option-types";

export const getOptionListApi = async (): Promise<ApiResponse<Option[]>> => {
  const response = await axiosInstance.get<ApiResponse<Option[]>>("/option/list");
  return response.data;
};

export const addOptionApi = async (name: string, price: number): Promise<ApiResponse<Option>> => {
  const response = await axiosInstance.post<ApiResponse<Option>>("/option/add", { name, price });
  return response.data;
};

export const editOptionApi = async (
  optionId: number,
  name: string,
  price: number
): Promise<ApiResponse<Option>> => {
  const response = await axiosInstance.put<ApiResponse<Option>>("/option/edit", {
    option_id: optionId,
    name,
    price,
  });
  return response.data;
};

export const deleteOptionApi = async (optionId: number): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.delete<ApiResponse<null>>("/option/delete", {
    params: { option_id: optionId },
  });
  return response.data;
};
