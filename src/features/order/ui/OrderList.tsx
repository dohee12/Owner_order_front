import React, { useEffect, useMemo } from "react";
import { useGetOrderList } from "@/entities/order/hook/use-get-order-list";
import { useUpdateOrderStatus } from "@/entities/order/hook/use-update-order-status";
import { Order, OrderStatusType } from "@/entities/order/model/order-types";
import OrderSection from "./OrderSection";
import { filterOrdersByStatus, selectDefaultOrder } from "@/entities/order/lib/order-utils";

interface OrderListProps {
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ selectedOrder, setSelectedOrder }) => {
  const { data: orders = [], isLoading, error } = useGetOrderList();
  const { mutate: updateStatus } = useUpdateOrderStatus();

  const [activeStatus, setActiveStatus] = React.useState("전체");

  const handleUpdateStatus = (order: Order, newStatus: OrderStatusType) => {
    updateStatus({ orderId: order.oid, status: newStatus });
  };

  const filteredOrders = useMemo(() => {
    return filterOrdersByStatus(orders, activeStatus);
  }, [orders, activeStatus]);

  const pendingOrders = filterOrdersByStatus(orders, "대기");
  const acceptedOrders = filterOrdersByStatus(orders, "진행");
  const completedOrders = filterOrdersByStatus(orders, "완료");
  const canceledOrders = filterOrdersByStatus(orders, "취소");

  useEffect(() => {
    if (!selectedOrder && filteredOrders.length > 0) {
      setSelectedOrder(selectDefaultOrder(filteredOrders)!);
    }
  }, [selectedOrder, filteredOrders, setSelectedOrder]);

  if (isLoading) return <div className="p-4 text-sm">불러오는 중...</div>;
  if (error) return <div className="p-4 text-sm text-red-500">주문 불러오기 실패</div>;

  const renderSectionBasedOnSelection = () => {
    const render = (title: string, orderList: typeof orders) => (
      <OrderSection
        title={title}
        orderList={orderList}
        selectedOrderId={selectedOrder?.oid || null}
        onSelectOrder={setSelectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    );

    if (activeStatus === "전체")
      return (
        <>
          {render("대기", pendingOrders)}
          {render("진행", acceptedOrders)}
          {render("완료", completedOrders)}
          {render("취소", canceledOrders)}
        </>
      );

    const sectionMap: Record<string, typeof orders> = {
      대기: pendingOrders,
      진행: acceptedOrders,
      완료: completedOrders,
      취소: canceledOrders,
    };

    return render(activeStatus, sectionMap[activeStatus]);
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
