import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

interface OrderItem {
  id: number;
  menuName: string;
  quantity: number;
  price: number;
  options?: string[]; // 선택 옵션 추가
}

interface Order {
  id: number;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  orderTime: Date;
}

const COMPLETED_STATUS = "completed";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: "ORD-001",
      items: [
        { id: 1, menuName: "아메리카노", quantity: 2, price: 4500, options: ["라지 사이즈"] },
        { id: 2, menuName: "카페라떼", quantity: 1, price: 5000 },
      ],
      totalAmount: 14000,
      status: "pending",
      orderTime: new Date(),
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      items: [
        { id: 3, menuName: "카푸치노", quantity: 1, price: 4800 },
        { id: 4, menuName: "모카", quantity: 3, price: 5500, options: ["소이 밀크"] },
      ],
      totalAmount: 21100,
      status: "processing",
      orderTime: new Date(),
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      items: [{ id: 5, menuName: "라떼", quantity: 2, price: 5500 }],
      totalAmount: 11000,
      status: "completed",
      orderTime: new Date(),
    },
  ]);

  const [activeTab, setActiveTab] = useState<"pending" | "processing" | "completed" | "all">(
    "pending"
  );

  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const filteredOrders =
    activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">주문 관리</h1>

      {/* 탭 UI */}
      <div className="flex mb-6 space-x-4">
        {["all", "pending", "processing", "completed"].map((status) => (
          <Button
            key={status}
            variant={activeTab === status ? "default" : "outline"}
            onClick={() => setActiveTab(status as "pending" | "processing" | "completed" | "all")}
            className="w-24"
          >
            {status === "all"
              ? "전체"
              : status === "pending"
              ? "대기"
              : status === "processing"
              ? "접수"
              : "완료"}
          </Button>
        ))}
      </div>

      {/* 필터된 주문 목록: Grid로 레이아웃 변경 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-3 shadow-sm">
            <div className="flex items-start justify-between space-x-3">
              {/* 헤더: 주문번호, 주문시간 */}
              <div className="w-3/4">
                <h3 className="text-lg font-medium">주문번호: {order.orderNumber}</h3>
                <p className="text-sm text-gray-500">{order.orderTime.toLocaleString()}</p>
              </div>
            </div>

            {/* 메뉴 항목: 메뉴명, 수량, 선택 옵션 */}
            <div className="mt-2 space-y-1">
              {order.items.map((item) => (
                <div key={item.id} className="text-sm">
                  <div className="flex items-center justify-between">
                    <p>{item.menuName}</p>
                    <p> {item.quantity}</p>
                  </div>
                  {/* 선택 옵션 표시 */}
                  {item.options && item.options.length > 0 && (
                    <p className="text-xs text-gray-500">ㄴ {item.options.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>

            {/* 푸터: 메뉴 개수 */}
            <div className="mt-2 font-bold">
              <span className="text-blue-500">
                {order.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
              품목
            </div>

            {/* 상태 변경 버튼 */}
            {order.status === "pending" && (
              <div className="flex justify-between mt-4 space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => handleStatusChange(order.id, "processing")}
                >
                  접수
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleStatusChange(order.id, "cancelled")}
                >
                  취소
                </Button>
              </div>
            )}
            {order.status === "processing" && (
              <div className="flex justify-between mt-4 space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => handleStatusChange(order.id, "completed")}
                >
                  완료
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleStatusChange(order.id, "cancelled")}
                >
                  취소
                </Button>
              </div>
            )}
            {order.status === COMPLETED_STATUS && (
              <div className="mt-4 text-sm text-gray-500">완료된 주문입니다.</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderManagementPage;
