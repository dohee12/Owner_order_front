import axiosInstanceAuth from "@/shared/api/axios-instance-auth";
import { Order } from "../model/order-types";

export const getOrderList = async (): Promise<Order[]> => {
  const response = await axiosInstanceAuth.get<Order[]>("/orderList");
  return response.data;
};
