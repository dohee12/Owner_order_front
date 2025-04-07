// entities/auth/hooks/use-logout
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { logoutApi } from "../api/logout";
import { useAuthStore } from "../model/auth-store";

/**
 * 로그아웃 훅
 * 로그아웃 API 호출 후 상태 초기화
 */
export const useLogout = () => {
  const { logout } = useAuthStore();

  const mutation: UseMutationResult<void, Error> = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      logout(); // 상태에서 사용자 정보 삭제
      sessionStorage.clear();
    },
    onError: () => {
      // 로그아웃 실패 시 처리할 내용
    },
  });

  return mutation;
};
