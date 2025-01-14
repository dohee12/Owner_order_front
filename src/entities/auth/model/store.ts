import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// User 타입 정의
interface User {
  id: string;
  storeName: string;
  storeId: string;
  role: string; // 역할 추가 (e.g., "admin", "manager", "staff")
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
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
        hasRole: (role) => {
          const { user } = get();
          // user가 null일 수 있으므로 null 체크 추가
          return user ? user.role === role : false;
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
