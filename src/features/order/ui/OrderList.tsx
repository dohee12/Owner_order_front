import { useGetOrderList } from "@/entities/order/hooks/use-get-order-list";
import { useOrderStore } from "@/entities/order/store/order-store";
import { Order } from "@/entities/order/model/order-types";

const OrderList = () => {
  const { data: orders, isLoading, isError } = useGetOrderList();
  const { setSelectedOrder } = useOrderStore();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders</p>;

  return (
    <aside className="w-1/4 overflow-auto">
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold">주문 내역</h2>
        <ul className="space-y-2">
          {orders?.map((order: Order) => {
            // `order`에 `Order` 타입을 명시
            const orderDetails = order.order_details?.[0] ?? { menu_name: "메뉴 정보 없음" };

            return (
              <li
                key={order.oid}
                className="p-2 bg-white border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedOrder(order)} // 주문 클릭 시 상태 업데이트
              >
                <div className="text-sm text-gray-500">{order.order_at ?? "날짜 없음"}</div>
                <div className="flex items-center justify-between">
                  <span>{orderDetails.menu_name}</span>
                  <span className="text-xs text-blue-500">{order.order_status ?? "상태 없음"}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default OrderList;
