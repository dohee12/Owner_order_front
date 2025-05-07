import { SalesChart } from '@/features/dashboard/ui/SalesChart';
import { OrderStats } from '@/features/dashboard/ui/OrderStats';
import { PopularItems } from '@/features/dashboard/ui/PopularItems';
import { RecentOrders } from '@/features/dashboard/ui/RecentOrders';

export const DashboardPage = () => {
  return (
    <div className="w-full h-full p-6 overflow-auto ">
      <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
          {/* 좌측 2/3: 매출추이 + 최근주문 (반반) */}
          <div className="lg:col-span-2 h-full flex flex-col min-h-0 gap-4">
            <div className="flex-1 min-h-0 flex flex-col">
              <SalesChart />
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
              <RecentOrders />
            </div>
          </div>
          {/* 우측 1/3: 주문통계, 인기상품 */}
          <div className="h-full flex flex-col min-h-0 gap-4">
            <div className="flex-1 min-h-0 flex flex-col">
              <OrderStats />
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
              <PopularItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
