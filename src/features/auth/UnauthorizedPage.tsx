import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-3xl font-bold">접근 불가</h1>
        <p className="mb-4 text-gray-600">이 페이지에 접근할 권한이 없습니다.</p>
        <Link to="/orders" className="text-blue-500 hover:underline">
          대시보드로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
