// entities/auth/hooks/use-token-renewal.ts
import { useAuthStore } from "../model/auth-store";
import { renewTokenApi } from "../api/renew-token";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 만료 시간을 주기적으로 확인하고, 재발급 요청을 자동으로 처리하는 훅
export const useTokenRenewal = () => {
  const { setAccessTokenExpiration, logout } = useAuthStore(); // 로그아웃 추가

  const mutation = useMutation({
    mutationFn: renewTokenApi, // 토큰 재발급 API 호출
    onSuccess: (data) => {
      // 토큰 재발급 성공 시, 새로운 만료 시간 저장
      setAccessTokenExpiration(data?.access_token_expiration);
    },
    onError: (error: AxiosError) => {
      console.error("토큰 재발급 실패", error);

      // 401 Unauthorized 에러가 발생하면 자동 로그아웃
      if (error?.response?.status === 401) {
        console.warn("401 Unauthorized - 로그아웃 처리");
        logout(); // 로그아웃 실행
      }
    },
  });

  return mutation;
};
