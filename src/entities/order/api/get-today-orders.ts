import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { Order } from "../model/order-types";
import { ApiResponse } from "@/shared/api/type";

export const getTodayOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await axiosInstanceAuth.get<ApiResponse<Order[]>>(
    "/api/v1/owner/orderListToday"
  );
  return response.data;
};
