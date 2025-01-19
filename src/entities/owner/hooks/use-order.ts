import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";

import { AxiosError } from "axios";
import { ApiResponse } from "@/shared/api/type";
import { Order, OrderStatus } from "../model/order-types";
import {
  changeOrderStatusApi,
  getOrderListApi,
  getOrderListTodayApi,
} from "../api/order-apis";

// 전체 주문 리스트 가져오기
export const useOrderList = () => {
  const query = useQuery<ApiResponse<Order[]>, AxiosError>({
    queryKey: ["orderList"],
    queryFn: getOrderListApi,
  });

  return query;
};

// 오늘의 주문 리스트 가져오기
export const useOrderListToday = () => {
  const query = useQuery<ApiResponse<Order[]>, AxiosError>({
    queryKey: ["orderListToday"],
    queryFn: getOrderListTodayApi,
  });

  return query;
};

// 주문 상태 변경
export const useChangeOrderStatus = () => {
  const mutation: UseMutationResult<
    ApiResponse<Order>,
    AxiosError,
    { orderId: number; status: OrderStatus }
  > = useMutation({
    mutationFn: ({ orderId, status }) => changeOrderStatusApi(orderId, status),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("주문 상태가 변경되었습니다.");
      }
    },
    onError: (error) => {
      console.error("주문 상태 변경 실패", error);
    },
  });

  return mutation;
};
