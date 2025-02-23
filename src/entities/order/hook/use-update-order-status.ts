import { ApiResponse } from "@/shared/api/type";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OrderStatusType } from "../model/order-types";
import { updateOrderStatus } from "../api/update-order-status";

export const useUpdateOrderStatus = () => {
  const mutation: UseMutationResult<
    ApiResponse<void>, // 수정된 부분: ApiResponse<Order> -> ApiResponse<void>
    AxiosError,
    { orderId: number; status: OrderStatusType }
  > = useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus({ orderId, status }),
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
