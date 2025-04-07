// src/mocks/order-handlers.ts
import { http, HttpResponse } from "msw";

interface OrderDetail {
  menu_name: string;
  option_list: {
    name: string;
    quantity: number;
  }[];
  quantity: number;
  price: number;
}

interface Order {
  oid: number;
  order_at: string;
  order_status: "PENDING" | "ACCEPTED" | "COMPLETED" | "CANCELED";
  order_type: "포장" | "매장";
  order_details: OrderDetail[];
  request: string;
}

const orders: Order[] = [
  {
    oid: 101,
    order_at: "2025-02-23 16:00",
    order_status: "ACCEPTED",
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
    order_status: "COMPLETED",
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
    order_status: "PENDING",
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
];

export const orderHandlers = [
  // GET 전체 주문 목록
  http.get("/api/v1/owner/orderList", () => {
    return HttpResponse.json(orders);
  }),

  // GET 오늘 주문만 필터링
  http.get("/api/v1/owner/orderListToday", () => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const todaysOrders = orders.filter((order) => order.order_at.startsWith(today));
    return HttpResponse.json(todaysOrders);
  }),

  // PUT 주문 상태 변경
  http.put("/api/v1/owner/changeorderstatus", async ({ request }) => {
    const { orderId, status } = (await request.json()) as {
      orderId: number;
      status: Order["order_status"];
    };
    const orderIndex = orders.findIndex((order) => order.oid === orderId);
    if (orderIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }
    orders[orderIndex].order_status = status;
    return HttpResponse.json({
      message: "Order status updated",
      order: orders[orderIndex],
    });
  }),
];
