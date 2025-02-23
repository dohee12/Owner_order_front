// src/entities/order/model/order-types.ts
export enum OrderStatus {
  PENDING = "주문대기", // 주문대기
  ACCEPTED = "주문접수", // 주문접수
  COMPLETED = "주문완료", // 주문완료
  CANCELED = "주문취소", // 주문취소
}

// `OrderStatus` 타입으로 유효한 상태 값만 지정할 수 있도록 타입을 정의
export type OrderStatusType = keyof typeof OrderStatus;

export type Order = {
  oid: number;
  order_at: string;
  modified_at: string;
  order_status: OrderStatusType;
  order_number: number;
  order_details: OrderDetail[];
  quantity: number;
};

export type OrderDetail = {
  menu_name: string;
  option_list: string[];
  quantity: number;
};
