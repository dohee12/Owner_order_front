//entities/auth/api/login.ts
import axiosInstance from "@/shared/api/axios-instance";
import { ApiResponse } from "@/shared/api/type";
import { LoginRequest, LoginResponse } from "../model/auth-types";

/**
 * 로그인 API 호출
 * @param credentials 로그인 요청 정보 (전화번호, 비밀번호)
 * @returns {Promise<ApiResponse<User>>} 로그인 응답
 */
export const loginApi = async (
  credentials: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
    "/api/v1/owner/login",
    credentials
  );
  return response.data;
};
