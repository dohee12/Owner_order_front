import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Order, OrderStatusType } from "../model/order-types";
import { updateOrderStatus } from "../api/update-order-status";
import { ApiResponse } from "@/shared/api/type";

export const useUpdateOrderStatus = (): UseMutationResult<
  ApiResponse<{ order: Order }>,
  AxiosError,
  { orderId: number; status: OrderStatusType }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus({ orderId, status }),

    onMutate: async ({ orderId, status }) => {
      await queryClient.cancelQueries({ queryKey: ["orderList"] });

      const previousOrders = queryClient.getQueryData<Order[]>(["orderList"]);

      queryClient.setQueryData<Order[]>(["orderList"], (prev = []) =>
        prev.map((order) => (order.oid === orderId ? { ...order, order_status: status } : order))
      );

      return { previousOrders };
    },

    onError: (err, _variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(["orderList"], context.previousOrders);
      }
      console.error("❌ 주문 상태 변경 실패", err);
    },

    onSuccess: (response) => {
      const updatedOrder = response.data?.order;
      if (!updatedOrder) return; // ✅ 널 체크

      queryClient.setQueryData<Order[]>(["orderList"], (prev = []) =>
        prev.map((order): Order => (order.oid === updatedOrder.oid ? updatedOrder : order))
      );

      console.log("✅ 주문 상태 변경 완료:", updatedOrder);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orderList"] });
    },
  });
};
