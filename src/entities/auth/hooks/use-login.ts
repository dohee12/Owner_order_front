//entities/auth/model/use-login.ts
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginApi } from "../api/login";
import { AxiosError } from "axios";
import { useAuthStore } from "../model/auth-store";
import { LoginResponse, LoginRequest } from "../model/auth-types";

export const useLogin = () => {
  const { setAccessTokenExpiration, setError } = useAuthStore();

  const mutation: UseMutationResult<
    LoginResponse,
    AxiosError<{ error: string }>,
    LoginRequest
  > = useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: LoginRequest) => loginApi(payload),
    onSuccess: (data: LoginResponse) => {
      if (data) {
        const { access_token_expiration } = data;
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
