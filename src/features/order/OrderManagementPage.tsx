import OrderList from "./ui/OrderList";
import OrderDetails from "./ui/OrderDetails";
import { useOrderStore } from "@/entities/order/store/order-store";

const OrderManagementPage: React.FC = () => {
  const { selectedOrder } = useOrderStore();

  return (
    <div className="flex flex-1">
      {/* 주문 상세 정보 영역: 고정 크기로 표시 */}
      <OrderDetails order={selectedOrder} />
      {/* 주문 목록 영역: 이 영역만 스크롤 */}
      <OrderList />
    </div>
  );
};

export default OrderManagementPage;
