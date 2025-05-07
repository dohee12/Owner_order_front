import { OrderStats, PopularItem, RecentOrder, SalesData } from '../model/types';

interface DashboardResponse {
  salesData: SalesData[];
  orderStats: OrderStats;
  popularItems: PopularItem[];
  recentOrders: RecentOrder[];
}

export const getDashboardData = async (): Promise<DashboardResponse> => {
  const response = await fetch('/api/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}; 