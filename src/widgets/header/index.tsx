import { useLogout } from "@/entities/auth/hooks/use-logout";
import { Button } from "@/shared/ui/button";

export const Header = () => {
  const { mutate: logout } = useLogout();

  const handleMinimize = () => {
    window.electronAPI.minimize();
  };

  const handleToggleFullScreen = () => {
    window.electronAPI.toggleFullScreen();
  };

  return (
    <header className="bg-white shadow" style={{ WebkitAppRegion: "drag" }}>
      <div className="px-4 mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">카페 관리 시스템</h1>
          </div>
          {/* 버튼 영역은 드래그를 비활성화합니다 */}
          <div className="flex items-center space-x-2" style={{ WebkitAppRegion: "no-drag" }}>
            <Button variant="outline" onClick={handleMinimize}>
              최소화
            </Button>
            <Button variant="outline" onClick={handleToggleFullScreen}>
              전체화면/창모드 전환
            </Button>
            <Button variant="outline" onClick={logout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
