import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

interface OrderItem {
  id: number;
  menuName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  orderTime: Date;
}

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: "ORD-001",
      items: [
        { id: 1, menuName: "아메리카노", quantity: 2, price: 4500 },
        { id: 2, menuName: "카페라떼", quantity: 1, price: 5000 },
      ],
      totalAmount: 14000,
      status: "pending",
      orderTime: new Date(),
    },
  ]);

  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">주문 관리</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">주문번호: {order.orderNumber}</h3>
                <p className="text-sm text-gray-500">
                  주문시간: {order.orderTime.toLocaleString()}
                </p>
                <div className="mt-2 space-y-1">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-sm">
                      {item.menuName} x {item.quantity} - ₩
                      {item.price * item.quantity}
                    </p>
                  ))}
                </div>
                <p className="mt-2 font-bold">
                  총 금액: ₩{order.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="space-y-2">
                <Button
                  variant={order.status === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange(order.id, "processing")}
                >
                  접수
                </Button>
                <Button
                  variant={
                    order.status === "processing" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleStatusChange(order.id, "completed")}
                >
                  완료
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(order.id, "cancelled")}
                >
                  취소
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderManagementPage;
