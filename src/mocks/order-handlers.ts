import { http, HttpResponse } from "msw";

// 주문 상세 정보 인터페이스
interface OrderDetail {
  menu_name: string;
  option_list: string[];
}

// 주문 인터페이스
interface Order {
  oid: number;
  order_at: string;
  modified_at: string;
  order_status: string;
  order_number: number;
  order_details: OrderDetail[];
}

// in-memory 주문 데이터 저장소
const orders: Order[] = [
  {
    oid: 1,
    order_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    order_status: "주문대기",
    order_number: 12345,
    order_details: [{ menu_name: "메뉴1", option_list: ["옵션1", "옵션2"] }],
  },
  {
    oid: 2,
    order_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    order_status: "주문접수",
    order_number: 54321,
    order_details: [{ menu_name: "메뉴2", option_list: ["옵션3"] }],
  },
];

export const orderHandlers = [
  // GET /api/v1/owner/orderList
  http.get("/api/v1/owner/orderList", () => {
    return HttpResponse.json(orders);
  }),

  // GET /api/v1/owner/orderListToday
  http.get("/api/v1/owner/orderListToday", () => {
    const today = new Date().toDateString();
    const todaysOrders = orders.filter(
      (order) => new Date(order.order_at).toDateString() === today
    );
    return HttpResponse.json(todaysOrders);
  }),

  // PUT /api/v1/owner/changeorderstatus
  http.put("/api/v1/owner/changeorderstatus", async ({ request }: { request: Request }) => {
    const { orderId, status } = (await request.json()) as {
      orderId: number;
      status: string;
    };
    const orderIndex = orders.findIndex((order) => order.oid === orderId);
    if (orderIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }
    // 주문 상태 업데이트
    orders[orderIndex].order_status = status;
    orders[orderIndex].modified_at = new Date().toISOString();
    return HttpResponse.json({
      message: "Order status updated successfully",
      order: orders[orderIndex],
    });
  }),
];
