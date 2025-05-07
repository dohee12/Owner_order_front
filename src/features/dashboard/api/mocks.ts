import { http, HttpResponse } from 'msw';
import { addDays, subDays, format } from 'date-fns';

// 최근 7일간의 매출 데이터 생성
const generateSalesData = () => {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, index) => ({
    date: format(subDays(today, 6 - index), 'yyyy-MM-dd'),
    amount: Math.floor(Math.random() * 1000000) + 500000, // 50만원 ~ 150만원
  }));
};

// 인기 상품 데이터 생성
const popularItems = [
  { id: '1', name: '아메리카노', quantity: 150, revenue: 450000 },
  { id: '2', name: '카페라떼', quantity: 120, revenue: 480000 },
  { id: '3', name: '카푸치노', quantity: 90, revenue: 360000 },
  { id: '4', name: '에스프레소', quantity: 80, revenue: 240000 },
  { id: '5', name: '바닐라라떼', quantity: 70, revenue: 315000 },
];

// 최근 주문 데이터 생성
const generateRecentOrders = () => {
  const statuses = ['pending', 'completed', 'cancelled'] as const;
  return Array.from({ length: 10 }).map((_, index) => ({
    id: `ORD${String(index + 1).padStart(5, '0')}`,
    customerName: `고객${index + 1}`,
    amount: Math.floor(Math.random() * 50000) + 5000,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: format(subDays(new Date(), Math.floor(Math.random() * 3)), "yyyy-MM-dd'T'HH:mm:ss"),
  }));
};

export const dashboardHandlers = [
  http.get('/api/dashboard', () => {
    const salesData = generateSalesData();
    const totalRevenue = salesData.reduce((sum, day) => sum + day.amount, 0);
    const totalOrders = Math.floor(totalRevenue / 10000); // 평균 주문금액을 1만원으로 가정

    return HttpResponse.json({
      salesData,
      orderStats: {
        totalOrders,
        totalRevenue,
        averageOrderValue: Math.floor(totalRevenue / totalOrders),
        pendingOrders: Math.floor(totalOrders * 0.1), // 전체 주문의 10%가 대기 중
      },
      popularItems,
      recentOrders: generateRecentOrders(),
    });
  }),
]; 