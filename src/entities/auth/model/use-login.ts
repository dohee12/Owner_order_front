import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ApiResponse } from "@/shared/api/type";
import { loginApi } from "../api/login";
import { LoginRequest } from "../api/type";
import { useAuthStore, User } from "./auth-store";
import { AxiosError } from "axios";

export const useLogin = () => {
  const { setUser, setError } = useAuthStore();

  const mutation: UseMutationResult<
    ApiResponse<User>,
    AxiosError<{ error: string }>,
    LoginRequest
  > = useMutation({
    mutationFn: (payload: LoginRequest) => loginApi(payload),
    onSuccess: (response: ApiResponse<User>) => {
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
    onError: (error) => {
      setError(error?.response?.data.error || "로그인 실패");
    },
  });

  return mutation;
};
