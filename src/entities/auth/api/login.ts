import axios from "axios";

// 로그인 요청을 위한 인터페이스
export interface LoginRequest {
  id: string;
  password: string;
}

// 로그인 성공 시의 응답을 위한 인터페이스
export interface LoginResponse {
  id: string;
  storeName: string;
  storeId: string;
  role: string;
}

// 로그인 API 응답을 위한 인터페이스 (응답 코드 포함)
export interface ApiResponse<T> {
  status: number; // HTTP 응답 코드
  data: T | null; // 응답 데이터 (성공 시, 실패 시 null)
  message: string; // 메시지 (성공/실패에 대한 메시지)
}

// 더미 로그인 API 호출 (응답 코드 포함)
export const loginApi = async (
  credentials: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  // 더미 데이터로 설정된 아이디와 비밀번호
  const dummyCredentials = {
    id: "admin",
    password: "admin",
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 서버 내부 오류를 유발하는 조건
      if (credentials.id === "serverError") {
        reject({
          status: 500, // 실패 시 500 Internal Server Error
          data: null,
          message: "서버 내부 오류가 발생했습니다. 나중에 다시 시도해주세요.",
        });
        return;
      }

      // 아이디가 틀린 경우
      if (credentials.id !== dummyCredentials.id) {
        reject({
          status: 401, // 실패 시 401 Unauthorized
          data: null,
          message: "아이디가 올바르지 않습니다.",
        });
        return;
      }

      // 비밀번호가 틀린 경우
      if (credentials.password !== dummyCredentials.password) {
        reject({
          status: 401, // 실패 시 401 Unauthorized
          data: null,
          message: "비밀번호가 올바르지 않습니다.",
        });
        return;
      }

      // 로그인에 성공한 경우
      resolve({
        status: 200, // 성공 시 200 OK
        data: {
          id: credentials.id,
          storeName: "데미데이터 카페",
          storeId: "12345",
          role: "admin",
        },
        message: "로그인 성공",
      });
    }, 1000); // 1초 지연으로 실제 API 호출처럼 모방
  });
};
