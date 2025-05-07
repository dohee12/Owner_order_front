import { create } from 'zustand';
import { OrderStats, PopularItem, RecentOrder, SalesData } from './types';
import { getDashboardData } from '../api/dashboard';

interface DashboardStore {
  salesData: SalesData[];
  orderStats: OrderStats | null;
  popularItems: PopularItem[];
  recentOrders: RecentOrder[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  salesData: [],
  orderStats: null,
  popularItems: [],
  recentOrders: [],
  isLoading: false,
  error: null,
  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getDashboardData();
      set({
        salesData: response.salesData,
        orderStats: response.orderStats,
        popularItems: response.popularItems,
        recentOrders: response.recentOrders,
      });
    } catch (error) {
      set({ error: '데이터를 불러오는데 실패했습니다.' });
    } finally {
      set({ isLoading: false });
    }
  },
})); 