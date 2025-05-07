export interface SalesData {
  date: string;
  amount: number;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
}

export interface PopularItem {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
} 