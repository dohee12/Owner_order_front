import { Card } from "@/shared/ui/card";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium">오늘의 매출</h3>
          <p className="text-3xl font-bold mt-2">₩ 580,000</p>
          <p className="text-sm text-gray-500 mt-1">전일 대비 12% 증가</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium">주문 건수</h3>
          <p className="text-3xl font-bold mt-2">48건</p>
          <p className="text-sm text-gray-500 mt-1">처리 대기 3건</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium">인기 메뉴</h3>
          <p className="text-3xl font-bold mt-2">아메리카노</p>
          <p className="text-sm text-gray-500 mt-1">오늘 32잔 판매</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
