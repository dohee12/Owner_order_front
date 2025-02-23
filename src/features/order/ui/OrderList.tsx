import React, { useEffect, useMemo, useState } from "react";
import { useOrderStore } from "@/entities/order/store/order-store";
import { Order } from "@/entities/order/model/order-types";
import { useGetOrderList } from "@/entities/order/hook/use-get-order-list";
import OrderSection from "./OrderSection";
import { filterOrdersByStatus, selectDefaultOrder } from "@/entities/order/lib/order-utils";

// 더미 데이터 (질문에서 주신 예시 그대로)
export const orders: Order[] = [
  {
    oid: 101,
    order_at: "2025-02-23 16:00",
    order_status: "ACCEPTED", // 진행
    order_type: "포장",
    order_details: [
      {
        menu_name: "아메리카노",
        option_list: [
          { name: "샷 추가", quantity: 2 },
          { name: "우유 제거", quantity: 1 },
        ],
        quantity: 2,
        price: 4500,
      },
      {
        menu_name: "카페라떼",
        option_list: [{ name: "시럽 추가", quantity: 1 }],
        quantity: 1,
        price: 5000,
      },
    ],
    request: "컵홀더 빼주세요.",
  },
  {
    oid: 102,
    order_at: "2024-10-31 14:00",
    order_status: "COMPLETED", // 완료
    order_type: "매장",
    order_details: [
      {
        menu_name: "바닐라 라떼",
        option_list: [{ name: "바닐라 시럽 추가", quantity: 1 }],
        quantity: 1,
        price: 5500,
      },
      {
        menu_name: "치즈 케이크",
        option_list: [],
        quantity: 1,
        price: 7000,
      },
    ],
    request: "따뜻하게 해주세요.",
  },
  {
    oid: 103,
    order_at: "2024-10-31 14:30",
    order_status: "PENDING", // 대기
    order_type: "포장",
    order_details: [
      {
        menu_name: "에스프레소",
        option_list: [],
        quantity: 1,
        price: 3000,
      },
      {
        menu_name: "티라미수",
        option_list: [],
        quantity: 1,
        price: 6500,
      },
    ],
    request: "",
  },
  // ... 나머지 주문에도 order_type 속성을 추가
];

const OrderList: React.FC = () => {
  const { selectedOrder, setSelectedOrder } = useOrderStore();
  const [activeStatus, setActiveStatus] = useState("전체");

  // 상태별로 주문을 분류 (filterOrdersByStatus 함수를 사용)
  const filteredOrders = useMemo(() => {
    return filterOrdersByStatus(orders, activeStatus);
  }, [activeStatus]);

  // 각 상태별 목록을 개별로 추출 (전체일 경우는 섹션 단위로 분리해서 렌더링)
  const PENDINGOrders = filterOrdersByStatus(orders, "대기");
  const acceptedOrders = filterOrdersByStatus(orders, "진행");
  const completedOrders = filterOrdersByStatus(orders, "완료");
  const canceledOrders = filterOrdersByStatus(orders, "취소");

  // 선택된 주문이 없다면 기본적으로 첫 번째 주문 선택
  useEffect(() => {
    if (!selectedOrder && filteredOrders.length > 0) {
      setSelectedOrder(selectDefaultOrder(filteredOrders)!);
    }
  }, [selectedOrder, filteredOrders, setSelectedOrder]);

  // // // 현재 시각(상대 시간 계산용)
  // const now = new Date();

  // // order_at을 "오전/오후 hh:mm" 형식으로 변환하는 함수
  // const formatOrderTime = (dateString: string) => {
  //   const date = new Date(dateString);
  //   // 예: "오후 09:49"
  //   return format(date, "a hh:mm", { locale: ko });
  // };

  // // order_at과 현재 시각의 분 차이(“8분 전” 표시용)
  // const getRelativeMinutes = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const diff = differenceInMinutes(now, date); // 양수(현재가 더 늦음)
  //   if (diff <= 0) return "방금 전";
  //   return `${diff}분 전`;
  // };

  // activeStatus에 따라 섹션 렌더링 (기본은 "전체")
  const renderSectionBasedOnSelection = () => {
    if (activeStatus === "전체")
      return (
        <>
          <OrderSection
            title="대기"
            orderList={PENDINGOrders}
            selectedOrderId={selectedOrder?.oid || null}
            onSelectOrder={setSelectedOrder}
            // onUpdateStatus={}
          />
          <OrderSection
            title="진행"
            orderList={acceptedOrders}
            selectedOrderId={selectedOrder?.oid || null}
            onSelectOrder={setSelectedOrder}
            // onUpdateStatus={}
          />
          <OrderSection
            title="완료"
            orderList={completedOrders}
            selectedOrderId={selectedOrder?.oid || null}
            onSelectOrder={setSelectedOrder}
            // onUpdateStatus={}
          />
          <OrderSection
            title="취소"
            orderList={canceledOrders}
            selectedOrderId={selectedOrder?.oid || null}
            onSelectOrder={setSelectedOrder}
            // onUpdateStatus={}
          />
        </>
      );
    if (activeStatus === "대기")
      return (
        <OrderSection
          title="대기"
          orderList={PENDINGOrders}
          selectedOrderId={selectedOrder?.oid || null}
          onSelectOrder={setSelectedOrder}
          // onUpdateStatus={}
        />
      );
    if (activeStatus === "진행")
      return (
        <OrderSection
          title="진행"
          orderList={acceptedOrders}
          selectedOrderId={selectedOrder?.oid || null}
          onSelectOrder={setSelectedOrder}
          // onUpdateStatus={}
        />
      );
    if (activeStatus === "완료")
      return (
        <OrderSection
          title="완료"
          orderList={completedOrders}
          selectedOrderId={selectedOrder?.oid || null}
          onSelectOrder={setSelectedOrder}
          // onUpdateStatus={}
        />
      );
    if (activeStatus === "취소")
      return (
        <OrderSection
          title="취소"
          orderList={canceledOrders}
          selectedOrderId={selectedOrder?.oid || null}
          onSelectOrder={setSelectedOrder}
          // onUpdateStatus={}
        />
      );
    return null;
  };

  return (
    <aside className="flex flex-col flex-1 min-h-0 bg-white border-r md:w-1/2">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <select
          value={activeStatus}
          onChange={(e) => setActiveStatus(e.target.value)}
          className="text-sm font-semibold text-gray-800 bg-transparent focus:outline-none"
        >
          <option value="전체">전체</option>
          <option value="대기">대기</option>
          <option value="진행">진행</option>
          <option value="완료">완료</option>
          <option value="취소">취소</option>
        </select>
        <button className="text-sm text-blue-500">일시중지</button>
      </div>

      <div className="flex-1 pb-4 overflow-auto">{renderSectionBasedOnSelection()}</div>
    </aside>
  );
};

export default OrderList;
