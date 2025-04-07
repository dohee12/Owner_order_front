import { Order } from "../model/order-types";

// 주문 상태별 Badge 클래스 반환 함수
export const getBadgeClasses = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "inline-block px-3 py-1 text-sm text-yellow-600 bg-yellow-100 rounded border-yellow-600 border";
    case "ACCEPTED":
      return "inline-block px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded border-blue-600 border";
    case "COMPLETED":
      return "inline-block px-3 py-1 text-sm text-green-600 bg-green-100 rounded border-green-600 border";
    case "CANCELED":
      return "inline-block px-3 py-1 text-sm text-red-600 bg-red-100 rounded border-red-600 border";
    default:
      return "inline-block px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded border-gray-600 border";
  }
};

// 주문 상태별 한글이름 반환 함수
export const getOrderStatusName = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "대기";
    case "ACCEPTED":
      return "진행";
    case "COMPLETED":
      return "완료";
    case "CANCELED":
      return "취소";
    default:
      return "알 수 없음";
  }
};

// 각 주문의 총 금액 계산
export const getOrderTotal = (order: Order): number => {
  return order.order_details.reduce((total, detail) => total + detail.quantity * detail.price, 0);
};

// 모든 메뉴 요약 (예: "아메리카노 x 2, 카페라떼 x 1")
export const getMenuSummary = (order: Order): string => {
  return order.order_details.map((detail) => `${detail.menu_name} x ${detail.quantity}`).join(", ");
};

// 주문 상태에 따라 주문 목록을 필터링하는 함수
export const filterOrdersByStatus = (orders: Order[], status: string): Order[] => {
  if (status === "전체") return orders;
  if (status === "대기") return orders.filter((o) => o.order_status === "PENDING");
  if (status === "진행") return orders.filter((o) => o.order_status === "ACCEPTED");
  if (status === "완료") return orders.filter((o) => o.order_status === "COMPLETED");
  if (status === "취소") return orders.filter((o) => o.order_status === "CANCELED");
  return orders;
};

// 기본 주문 선택 (리스트가 비어있지 않으면 첫 번째 주문 반환)
export const selectDefaultOrder = (orders: Order[]): Order | null => {
  return orders.length > 0 ? orders[0] : null;
};

// 상태 전환 헬퍼 함수 (다음 상태 값)
export const getNextStatus = (current: string): string | null => {
  if (current === "PENDING") return "ACCEPTED";
  if (current === "ACCEPTED") return "COMPLETED";
  return null;
};

// 버튼에 표시할 텍스트 매핑: WAITING => "수락", ACCEPTED => "완료"
export const getNextButtonLabel = (current: string): string | null => {
  if (current === "PENDING") return "수락";
  if (current === "ACCEPTED") return "완료";
  if (current === "COMPLETED") return "완료됨";
  if (current === "CANCELED") return "취소됨";
  return null;
};
