import { useAuthStore } from "@/entities/auth/model/store";
import { Button } from "@/shared/ui/button";

export const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow">
      <div className="px-4 mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">카페 관리 시스템</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4">{user?.storeName}</span>
            <Button variant="outline" onClick={logout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
