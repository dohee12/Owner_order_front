import axiosInstance from "@/shared/api/axios-instance";
import { ApiResponse } from "@/shared/api/type";
import { Order, OrderStatus } from "../model/order-types";

export const getOrderListApi = async (): Promise<ApiResponse<Order[]>> => {
  const response = await axiosInstance.get<ApiResponse<Order[]>>("/orderList");
  return response.data;
};

export const getOrderListTodayApi = async (): Promise<ApiResponse<Order[]>> => {
  const response = await axiosInstance.get<ApiResponse<Order[]>>("/orderListToday");
  return response.data;
};

export const changeOrderStatusApi = async (
  orderId: number,
  status: OrderStatus
): Promise<ApiResponse<Order>> => {
  const response = await axiosInstance.put<ApiResponse<Order>>("/changeorderstatus", {
    orderId,
    status,
  });
  return response.data;
};
