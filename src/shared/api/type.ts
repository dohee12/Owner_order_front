// API 응답을 위한 인터페이스 (응답 코드 포함)
export interface ApiResponse<T> {
  status: number; // HTTP 응답 코드
  data: T | null; // 응답 데이터 (성공 시, 실패 시 null)
  message: string; // 메시지 (성공/실패에 대한 메시지)
}

// 공통 응답 타입
export interface StatusResponse {
  status: string; // 성공 또는 실패 상태
}

export interface MessageResponse {
  message: string; // 성공 또는 실패 상태
}
