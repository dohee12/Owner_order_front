import axiosInstance from "@/shared/api/axios-instance";

/**
 * 로그아웃 API 호출
 * @returns {Promise<void>} 로그아웃 응답
 */
export const logoutApi = async (): Promise<void> => {
  await axiosInstance.post("/logout");
};
