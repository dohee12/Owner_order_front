import axios from "axios";

// .env 파일에서 API 기본 URL을 가져옴
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// axios 인스턴스를 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 요청 타임아웃 10초
});

export default axiosInstance;
