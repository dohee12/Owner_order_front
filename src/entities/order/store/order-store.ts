import { create } from "zustand";
import { Order } from "../model/order-types";

type OrderStore = {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  selectedOrder: Order | null;
  setSelectedOrder: (orders: Order) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  selectedOrder: null, // 선택된 주문 정보
  setSelectedOrder: (order) => set({ selectedOrder: order }),
}));
