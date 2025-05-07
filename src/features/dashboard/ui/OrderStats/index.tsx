import { useDashboardStore } from '../../model/store';
import { Card } from '@/shared/ui/card';
import { formatCurrency } from '@/shared/lib/format';

export const OrderStats = () => {
  const { orderStats, isLoading, error } = useDashboardStore();

  return (
    <Card className="bg-white shadow-lg p-4 border border-gray-100 h-full flex flex-col min-h-0">
      <div className="flex items-center mb-2">
        <span className="text-xl font-bold text-[#222]">주문 통계</span>
      </div>
      {isLoading || error || !orderStats ? (
        <div className="text-gray-400 text-center py-12 text-lg font-semibold">
          {isLoading ? '로딩 중...' : `에러: ${error || '데이터를 불러올 수 없습니다.'}`}
        </div>
      ) : (
        <div className="grid grid-cols-2 h-full gap-4">
          <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#f5f7fa]">
            <span className="text-sm text-gray-500">총 주문 수</span>
            <span className="text-xl font-bold text-[#222]">{orderStats.totalOrders.toLocaleString()}건</span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#f5f7fa]">
            <span className="text-sm text-gray-500">총 매출</span>
            <span className="text-xl font-bold text-[#222]">{formatCurrency(orderStats.totalRevenue)}</span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#f5f7fa]">
            <span className="text-sm text-gray-500">평균 주문 금액</span>
            <span className="text-xl font-bold text-[#222]">{formatCurrency(orderStats.averageOrderValue)}</span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#f5f7fa]">
            <span className="text-sm text-gray-500">대기 중인 주문</span>
            <span className="text-xl font-bold text-[#3182f6]">{orderStats.pendingOrders}건</span>
          </div>
        </div>
      )}
    </Card>
  );
}; 