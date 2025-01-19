import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LoginResponse } from "../model/auth-types";

interface AuthState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  error: string | null;
  setUser: (user: LoginResponse | null) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        error: null,
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
          }),
        setError: (error) => set({ error }),
        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: "auth-storage", // localStorage에 저장되는 키
      }
    )
  )
);
