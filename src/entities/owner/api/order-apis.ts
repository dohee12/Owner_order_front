import { ApiResponse } from "@/shared/api/type";
import { Order, OrderStatus } from "../model/order-types";
import axiosInstanceAuth from "@/shared/api/axios-instance-auth";

export const getOrderListApi = async (): Promise<ApiResponse<Order[]>> => {
  const response = await axiosInstanceAuth.get<ApiResponse<Order[]>>("/orderList");
  return response.data;
};

export const getOrderListTodayApi = async (): Promise<ApiResponse<Order[]>> => {
  const response = await axiosInstanceAuth.get<ApiResponse<Order[]>>("/orderListToday");
  return response.data;
};

export const changeOrderStatusApi = async (
  orderId: number,
  status: OrderStatus
): Promise<ApiResponse<Order>> => {
  const response = await axiosInstanceAuth.put<ApiResponse<Order>>("/changeorderstatus", {
    orderId,
    status,
  });
  return response.data;
};
