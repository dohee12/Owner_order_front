//entities/auth/api/login.ts
import axiosInstance from "@/shared/api/axios-instance";
import { LoginRequest, LoginResponse } from "../model/auth-types";
import axiosInstanceAuth from "@/shared/api/axios-instance-auth";

/**
 * 로그인 API 호출
 * @param credentials 로그인 요청 정보 (전화번호, 비밀번호)
 * @returns {LoginResponse} 로그인 응답
 */
export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/login", credentials);
  // 세션 쿠키 기반이므로 더 이상 accessToken 저장 필요 없음
  if (response.status === 200) {
    // 모든 헤더 이름은 소문자
    const accessToken = response.headers["access_token"]; // 응답헤더에서 토큰 받기
    console.log(accessToken);
    sessionStorage.setItem("accessToken", accessToken);
    axiosInstanceAuth.defaults.headers.common["access_token"] = `${accessToken}`;
  }
  return response.data;
};
