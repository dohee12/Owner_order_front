import { useDashboardStore } from '../../model/store';
import { Card } from '@/shared/ui/card';
import { format } from 'date-fns';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <span className="inline-block px-3 py-1 rounded-full bg-[#fff7e0] text-[#ffb300] font-semibold text-xs">대기중</span>;
    case 'completed':
      return <span className="inline-block px-3 py-1 rounded-full bg-[#e6f4ff] text-[#3182f6] font-semibold text-xs">완료</span>;
    case 'cancelled':
      return <span className="inline-block px-3 py-1 rounded-full bg-[#ffeaea] text-[#ff5a5a] font-semibold text-xs">취소</span>;
    default:
      return <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-semibold text-xs">알수없음</span>;
  }
};

export const RecentOrders = () => {
  const { recentOrders, isLoading, error } = useDashboardStore();

  return (
    <Card className="bg-white shadow-lg p-4 border border-gray-100 h-full flex flex-col min-h-0">
      <div className="flex items-center mb-2">
        <span className="text-xl font-bold text-[#222]">최근 주문</span>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {isLoading || error ? (
          <div className="text-center py-8 text-gray-400">
            {isLoading ? '로딩 중...' : `에러: ${error}`}
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#f5f7fa]">
                <th className="py-2 px-2 text-left font-semibold text-gray-500">주문번호</th>
                <th className="py-2 px-2 text-left font-semibold text-gray-500">고객명</th>
                <th className="py-2 px-2 text-right font-semibold text-gray-500">금액</th>
                <th className="py-2 px-2 text-center font-semibold text-gray-500">상태</th>
                <th className="py-2 px-2 text-right font-semibold text-gray-500">주문일시</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'} hover:bg-[#e8f3ff]`}
                >
                  <td className="py-2 px-2 font-mono">{order.id}</td>
                  <td className="py-2 px-2">{order.customerName}</td>
                  <td className="py-2 px-2 text-right font-semibold">{order.amount.toLocaleString()}원</td>
                  <td className="py-2 px-2 text-center">{getStatusBadge(order.status)}</td>
                  <td className="py-2 px-2 text-right">{format(new Date(order.date), 'MM/dd HH:mm')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}; 