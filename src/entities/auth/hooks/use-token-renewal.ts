// entities/auth/hooks/use-token-renewal.ts
import { useAuthStore } from "../model/auth-store";
import { renewTokenApi } from "../api/renew-token";
import { useMutation } from "@tanstack/react-query";

// 만료 시간을 주기적으로 확인하고, 재발급 요청을 자동으로 처리하는 훅
export const useTokenRenewal = () => {
  const { setAccessTokenExpiration } = useAuthStore(); // 토큰 만료 시간 설정

  const mutation = useMutation({
    mutationFn: renewTokenApi, // 토큰 재발급 API 호출
    onSuccess: (data) => {
      // 토큰 재발급 성공 시, 새로운 만료 시간 저장
      setAccessTokenExpiration(data?.access_token_expiration);
    },
    onError: (error) => {
      // 에러 처리
      console.error("토큰 재발급 실패", error);
    },
  });

  return mutation;
};
