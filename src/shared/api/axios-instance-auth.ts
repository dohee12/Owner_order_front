import { renewTokenApi } from "@/entities/auth/api/renew-token";
import { useAuthStore } from "@/entities/auth/model/auth-store";

import axios from "axios";

// .env 파일에서 API 기본 URL을 가져옴
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// axios 인스턴스를 생성
// Authorization 헤더가 필요할 때 사용
const axiosInstanceAuth = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 요청 타임아웃 10초
});

// 요청 인터셉터 설정: 요청 전에 토큰을 헤더에 추가
axiosInstanceAuth.interceptors.request.use(
  async (config) => {
    let accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      try {
        const data = await renewTokenApi();
        accessToken = data.accessToken; // 여기서 재할당
        sessionStorage.setItem("accessToken", accessToken);
      } catch (error) {
        console.error("Failed to renew access token:", error);
        return Promise.reject(error);
      }
    }

    // 헤더 이름은 일관되게 사용 (여기서는 "access_token"으로 통일)
    if (accessToken) {
      config.headers["access_token"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정: 응답을 받은 후 처리
axiosInstanceAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { logout } = useAuthStore.getState(); // ✅ useAuthStore에서 로그아웃 함수 가져오기

    // 401 Unauthorized 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const data = await renewTokenApi();
        const newAccessToken = data.accessToken;

        sessionStorage.setItem("accessToken", newAccessToken);
        axiosInstanceAuth.defaults.headers.common["access_token"] = newAccessToken;
        originalRequest.headers["access_token"] = newAccessToken;

        // 실패한 요청 재시도
        return axiosInstanceAuth(originalRequest);
      } catch (tokenRefreshError) {
        console.error("토큰 재발급 실패:", tokenRefreshError);

        // ✅ 토큰 재발급도 실패한 경우, 자동 로그아웃 실행
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstanceAuth;
