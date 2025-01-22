//entities/auth/api/auth-type.ts

// 로그인 요청을 위한 인터페이스
export interface LoginRequest {
  phoneNumber: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  access_token_expiration: string;
}
