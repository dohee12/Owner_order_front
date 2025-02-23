import { ApiResponse } from "@/shared/api/type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Order } from "../model/order-types";
import { getTodayOrders } from "../api/get-today-orders";

// 오늘의 주문 리스트 가져오기
export const useGetTodayOrders = () => {
  const query = useQuery<ApiResponse<Order[]>, AxiosError>({
    queryKey: ["orderListToday"],
    queryFn: getTodayOrders,
  });

  return query;
};
