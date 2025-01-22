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
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정 (응답을 받은 후 처리)
axiosInstanceAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 인증 오류 처리
    if (error.response && error.response.status === 401) {
      console.error("로그인 세션이 만료되었습니다.");
      // 여기에 토큰 만료 처리 로직 추가
    }
    return Promise.reject(error);
  }
);

export default axiosInstanceAuth;
