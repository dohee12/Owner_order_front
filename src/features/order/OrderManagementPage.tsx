import OrderList from "./ui/OrderList";
import OrderDetails from "./ui/OrderDetails";
import OrderRequest from "./ui/OrderRequest";
import { useOrderStore } from "@/entities/order/store/order-store";

const OrderManagementPage = () => {
  // Zustand를 사용해 선택된 주문 가져오기
  const { selectedOrder } = useOrderStore();

  return (
    <div className="space-y-6">
      <div className="flex h-screen">
        {/* 주문 목록 */}
        <OrderList />
        {/* 주문 상세 정보 */}
        <OrderDetails order={selectedOrder} />
        {/* 요청 사항 */}
        {selectedOrder && <OrderRequest orderId={selectedOrder.oid} />}
      </div>
    </div>
  );
};

export default OrderManagementPage;
