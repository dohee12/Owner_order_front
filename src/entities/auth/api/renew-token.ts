// entities/auth/api/renew-token.ts
import axiosInstance from "@/shared/api/axios-instance";

/**
 * 토큰 재발급 API 호출
 */
export const renewTokenApi = async () => {
  const response = await axiosInstance.post(
    "/renew" // 토큰 재발급 엔드포인트
  );

  return response.data;
};
