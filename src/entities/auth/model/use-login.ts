import { loginApi } from "../api/login";
import type { LoginRequest, LoginResponse, ApiResponse } from "../api/login";
import { useAuthStore } from "./store";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// 로그인 실패 시의 에러 타입
interface LoginError {
  message: string;
}

export const useLogin = () => {
  const { setUser, setError } = useAuthStore();

  const mutation: UseMutationResult<
    ApiResponse<LoginResponse>,
    LoginError,
    LoginRequest
  > = useMutation({
    mutationFn: (payload: LoginRequest) => loginApi(payload), // loginApi에서 반환되는 값은 ApiResponse<LoginResponse>임
    onMutate: () => {},
    onSuccess: (response: ApiResponse<LoginResponse>) => {
      // data.data가 null일 수 있기 때문에 안전하게 처리
      if (response.status === 200 && response.data) {
        const user = {
          id: response.data.id,
          storeName: response.data.storeName,
          storeId: response.data.storeId,
          role: response.data.role,
        };
        setUser(user); // 상태에 저장
      }
    },
    onError: (error: LoginError) => {
      setError(error.message || "로그인 실패");
    },
    onSettled: () => {},
  });

  return mutation;
};
