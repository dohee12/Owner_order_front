//entities/auth/api/login.ts
import axiosInstance from "@/shared/api/axios-instance";
import { LoginRequest, LoginResponse } from "../model/auth-types";

/**
 * 로그인 API 호출
 * @param credentials 로그인 요청 정보 (전화번호, 비밀번호)
 * @returns {LoginResponse} 로그인 응답
 */
export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/login", credentials);
  // 세션 쿠키 기반이므로 더 이상 accessToken 저장 필요 없음
  return response.data;
};
