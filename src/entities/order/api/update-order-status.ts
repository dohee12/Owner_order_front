import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { OrderStatusType } from "../model/order-types";
import { ApiResponse } from "@/shared/api/type";

export type UpdateOrderStatusRequest = {
  orderId: number;
  status: OrderStatusType;
};

export const updateOrderStatus = async ({
  orderId,
  status,
}: UpdateOrderStatusRequest): Promise<ApiResponse<void>> => {
  const response = await axiosInstanceAuth.put<ApiResponse<void>>(
    "/api/v1/owner/changeorderstatus",
    { orderId, status }
  );
  return response.data;
};
