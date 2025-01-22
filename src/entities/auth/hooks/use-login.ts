//entities/auth/model/use-login.ts
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/shared/api/type";
import { loginApi } from "../api/login";
import { AxiosError } from "axios";
import { useAuthStore } from "../model/auth-store";
import { LoginResponse, LoginRequest } from "../model/auth-types";

export const useLogin = () => {
  const { setAccessTokenExpiration, setError } = useAuthStore();

  const mutation: UseMutationResult<
    ApiResponse<LoginResponse>,
    AxiosError<{ error: string }>,
    LoginRequest
  > = useMutation({
    mutationFn: (payload: LoginRequest) => loginApi(payload),
    onSuccess: (response: ApiResponse<LoginResponse>) => {
      if (response.status === 200 && response.data) {
        const { access_token_expiration } = response.data;

        // 토큰 만료 시간 저장
        setAccessTokenExpiration(access_token_expiration);
      }
    },
    onError: (error) => {
      setError(error?.response?.data.error || "로그인 실패");
    },
  });

  return mutation;
};
