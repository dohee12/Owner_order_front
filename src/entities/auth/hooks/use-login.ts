//entities/auth/model/use-login.ts
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/shared/api/type";
import { loginApi } from "../api/login";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/auth-store";
import { LoginResponse, LoginRequest } from "../model/auth-types";

export const useLogin = () => {
  const { setUser, setError } = useAuthStore();

  const mutation: UseMutationResult<
    ApiResponse<LoginResponse>,
    AxiosError<{ error: string }>,
    LoginRequest
  > = useMutation({
    mutationFn: (payload: LoginRequest) => loginApi(payload),
    onSuccess: (response: ApiResponse<LoginResponse>) => {
      if (response.status === 200 && response.data) {
        const { access_token, access_token_expiration } = response.data;

        // 토큰 및 만료 시간을 상태에 저장
        const user: LoginResponse = {
          access_token, // access_token 저장
          access_token_expiration, // access_token_expiration 저장
        };

        setUser(user); // 상태에 사용자 정보 저장
      }
    },
    onError: (error) => {
      setError(error?.response?.data.error || "로그인 실패");
    },
  });

  return mutation;
};
