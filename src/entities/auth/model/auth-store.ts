// entities/auth/model/auth-store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { renewTokenApi } from "../api/renew-token";

interface AuthState {
  accessTokenExpiration: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isInitialized: boolean; // 추가된 플래그
  setAccessTokenExpiration: (expiration: string | null) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  setInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessTokenExpiration: null,
        isAuthenticated: false,
        error: null,
        isInitialized: false, // 초기값
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
        refreshAccessToken: async () => {
          try {
            const response = await renewTokenApi();
            const { access_token_expiration } = response.data;
            set({
              accessTokenExpiration: access_token_expiration,
              isAuthenticated: true,
            });
          } catch (error) {
            console.error("토큰 재발급 실패", error);
            set({ error: "토큰 재발급에 실패했습니다." });
          }
        },
        setInitialized: (value: boolean) => set({ isInitialized: value }),
      }),
      {
        name: "auth-storage",
        // Zustand persist의 rehydrate 콜백을 활용할 수도 있음
        onRehydrateStorage: () => (state) => {
          console.log("onRehydrateStorage state", state);
          if (state) {
            state.setInitialized(true);
          }
        },
      }
    )
  )
);
