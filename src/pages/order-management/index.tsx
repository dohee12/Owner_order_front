import { useOrderStore } from "@/entities/order/store/order-store";
import OrderDetails from "@/features/order/ui/OrderDetails";
import OrderList from "@/features/order/ui/OrderList";

const OrderPage: React.FC = () => {
  const { selectedOrder, setSelectedOrder } = useOrderStore();

  return (
    <div className="flex flex-1">
      {/* 주문 상세 정보 영역: 고정 크기로 표시 */}
      <OrderDetails order={selectedOrder} />
      {/* 주문 목록 영역: 이 영역만 스크롤 */}
      <OrderList selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
    </div>
  );
};

export default OrderPage;
