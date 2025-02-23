import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getOrderList } from "../api/get-order-list";
import { Order } from "../model/order-types";

// 전체 주문 리스트 가져오기
export const useGetOrderList = () => {
  const query = useQuery<Order[], AxiosError>({
    queryKey: ["orderList"],
    queryFn: getOrderList,
  });

  return query;
};
