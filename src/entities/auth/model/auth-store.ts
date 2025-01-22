// entities/auth/model/auth-store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { renewTokenApi } from "../api/renew-token";

interface AuthState {
  accessTokenExpiration: string | null;
  isAuthenticated: boolean;
  error: string | null;
  setAccessTokenExpiration: (expiration: string | null) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessTokenExpiration: null,
        isAuthenticated: false,
        error: null,
        setAccessTokenExpiration: (expiration) =>
          set({
            accessTokenExpiration: expiration,
            isAuthenticated: !!expiration,
          }),
        setError: (error) => set({ error }),
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        logout: () =>
          set({
            accessTokenExpiration: null,
            isAuthenticated: false,
          }),
        // 토큰 재발급 메서드
        refreshAccessToken: async () => {
          try {
            const response = await renewTokenApi();
            const { access_token_expiration } = response.data;
            set({
              accessTokenExpiration: access_token_expiration,
              isAuthenticated: true, // 재발급 후 인증 상태
            });
          } catch (error) {
            console.error("토큰 재발급 실패", error);
            set({ error: "토큰 재발급에 실패했습니다." });
          }
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
