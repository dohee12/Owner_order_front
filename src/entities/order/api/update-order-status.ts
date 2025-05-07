import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { OrderStatusType, Order } from "../model/order-types";
import { ApiResponse } from "@/shared/api/type";

export type UpdateOrderStatusRequest = {
  orderId: number;
  status: OrderStatusType;
};

export const updateOrderStatus = async ({
  orderId,
  status,
}: UpdateOrderStatusRequest): Promise<ApiResponse<{ order: Order }>> => {
  const response = await axiosInstanceAuth.put<ApiResponse<{ order: Order }>>(
    "/changeorderstatus",
    {
      orderId,
      status,
    }
  );
  return response.data;
};
