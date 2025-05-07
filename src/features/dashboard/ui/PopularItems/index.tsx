import { useDashboardStore } from '../../model/store';
import { Card } from '@/shared/ui/card';
import { formatCurrency } from '@/shared/lib/format';

const rankColors = [
  'bg-[#3182f6] text-white', // 1위
  'bg-[#6c8cff] text-white', // 2위
  'bg-[#a0b6ff] text-white', // 3위
  'bg-gray-200 text-gray-700', // 4위 이하
];

export const PopularItems = () => {
  const { popularItems, isLoading, error } = useDashboardStore();

  return (
    <Card className="bg-white shadow-lg border border-gray-100 h-full flex flex-col">
      <div className="flex items-center mb-2">
        <span className="text-xl font-bold text-[#222]">인기 상품</span>
      </div>
      <div className="flex-1 overflow-auto min-h-0">
        {isLoading || error ? (
          <div className="text-center py-8 text-gray-400">
            {isLoading ? '로딩 중...' : `에러: ${error}`}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {popularItems.map((item, idx) => (
              <li key={item.id} className="flex items-center gap-3 py-2.5 px-2">
                <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg shrink-0 ${rankColors[idx] || rankColors[3]}`}>{idx + 1}</span>
                <span className="flex-1 font-medium text-[#222] truncate">{item.name}</span>
                <span className="text-sm text-gray-500 mr-2">{item.quantity.toLocaleString()}개</span>
                <span className="text-base font-semibold text-[#3182f6]">{formatCurrency(item.revenue)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}; 