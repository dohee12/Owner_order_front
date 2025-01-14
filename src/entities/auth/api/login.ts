import axiosInstance from "@/shared/api/axios-instance";
import { ApiResponse } from "@/shared/api/type";
import { LoginRequest } from "./type";
import { User } from "../model/auth-store";

export const loginApi = async (
  credentials: LoginRequest
): Promise<ApiResponse<User>> => {
  const response = await axiosInstance.post<ApiResponse<User>>(
    "/api/login",
    credentials
  );
  return response.data;
};
