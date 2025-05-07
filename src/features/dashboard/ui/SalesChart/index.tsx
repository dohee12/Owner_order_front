import { useEffect, useState } from 'react';
import { useDashboardStore } from '../../model/store';
import { Card } from '@/shared/ui/card';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Area, AreaChart
} from 'recharts';

// 시간별 매출 mock 데이터 생성 함수
const generateHourlyData = (date: string) => {
  return Array.from({ length: 24 }).map((_, hour) => ({
    hour: `${hour}:00`,
    amount: Math.floor(Math.random() * 100000) + 10000, // 1만원~11만원
  }));
};

// 커스텀 툴팁
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow text-xs">
        <div className="font-semibold text-[#3182f6]">{label}</div>
        <div className="mt-1 text-gray-700">{payload[0].value.toLocaleString()}원</div>
      </div>
    );
  }
  return null;
};

export const SalesChart = () => {
  const { salesData, isLoading, error, fetchDashboardData } = useDashboardStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // 날짜 클릭 시 시간별 데이터로 전환
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setHourlyData(generateHourlyData(date));
  };

  // 뒤로가기(일별로 돌아가기)
  const handleBack = () => {
    setSelectedDate(null);
    setHourlyData([]);
  };

  // Y축 단위 포맷
  const yAxisTickFormatter = (value: number) => `${(value / 10000).toFixed(0)}만`;

  return (
    <Card className="bg-white shadow-lg p-4 border border-gray-100 h-full flex flex-col min-h-0">
      <div className="flex items-center mb-2">
        <span className="text-xl font-bold text-[#222]">
          {selectedDate ? `${selectedDate} 시간별 매출` : '매출 추이'}
        </span>
        {selectedDate && (
          <button onClick={handleBack} className="ml-4 px-3 py-1 rounded bg-gray-100 text-gray-600 text-sm hover:bg-gray-200 transition">일별로 돌아가기</button>
        )}
      </div>
      <div className="flex-1 h-full min-h-0 flex items-center justify-center bg-[#f5f7fa] rounded-xl">
        {isLoading ? '로딩 중...' : error ? `에러: ${error}` : (
          <ResponsiveContainer width="100%" height="100%">
            {selectedDate ? (
              <AreaChart data={hourlyData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3182f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3182f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={yAxisTickFormatter} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#3182f6" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} activeDot={{ r: 7, fill: '#3182f6', stroke: '#fff', strokeWidth: 2 }} isAnimationActive={true} />
              </AreaChart>
            ) : (
              <AreaChart data={salesData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3182f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3182f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, cursor: 'pointer' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={yAxisTickFormatter} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="amount" stroke="#3182f6" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} activeDot={{ r: 7, fill: '#3182f6', stroke: '#fff', strokeWidth: 2, onClick: (e: any) => handleDateClick(e.payload.date) }} isAnimationActive={true} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
      {/* 일별 차트 아래에 날짜별 클릭 안내 */}
      {!selectedDate && !isLoading && !error && (
        <div className="text-xs text-gray-400 text-center mt-2">날짜 점을 클릭하면 시간별 매출을 볼 수 있습니다.</div>
      )}
    </Card>
  );
};
