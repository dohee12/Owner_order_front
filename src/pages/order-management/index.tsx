import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { useOrderList, useChangeOrderStatus } from "@/entities/owner/hooks/use-order";

export type OrderStatus = "주문대기" | "주문접수" | "주문완료" | "주문취소";

export interface Order {
  oid: number;
  order_at: string;
  modified_at: string;
  order_status: OrderStatus;
  order_number: number;
  quantity: number;
  order_details: {
    menu_name: string;
    option_list: string[];
    quantity: number;
  }[];
}

const OrderManagementPage = () => {
  const { data, isLoading, isError } = useOrderList();
  // API에서 받아온 주문 데이터가 data.data에 있다고 가정합니다.
  const changeOrderStatusMutation = useChangeOrderStatus();

  // activeTab: "전체" 또는 OrderStatus 값
  const [activeTab, setActiveTab] = useState<"전체" | OrderStatus>("주문대기");

  const filteredOrders =
    activeTab === "전체" ? data : data?.filter((order) => order.order_status === activeTab);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders</p>;

  // 상태 변경 핸들러
  const handleChangeStatus = (orderId: number, status: OrderStatus) => {
    changeOrderStatusMutation.mutate({
      orderId: orderId,
      status,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">주문 관리</h1>

      {/* 탭 UI */}
      <div className="flex mb-6 space-x-4">
        {(["전체", "주문대기", "주문접수", "주문완료", "주문취소"] as const).map((status) => (
          <Button
            key={status}
            variant={activeTab === status ? "default" : "outline"}
            onClick={() => setActiveTab(status)}
            className="w-24"
          >
            {status === "전체"
              ? "전체"
              : status === "주문대기"
              ? "대기"
              : status === "주문접수"
              ? "접수"
              : status === "주문완료"
              ? "완료"
              : "취소"}
          </Button>
        ))}
      </div>

      {/* 주문 목록 Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredOrders.map((order) => (
          <Card key={order.oid} className="p-3 shadow-sm">
            <div className="flex items-start justify-between space-x-3">
              <div className="w-3/4">
                <h3 className="text-lg font-medium">주문번호: {order.order_number}</h3>
                <p className="text-sm text-gray-500">{new Date(order.order_at).toLocaleString()}</p>
              </div>
            </div>

            {/* 주문 상세 정보: 각 주문 항목 */}
            <div className="mt-2 space-y-1">
              {order.order_details.map((detail, idx) => (
                <div key={idx} className="text-sm">
                  <p>{detail.menu_name}</p>
                  {detail.option_list && detail.option_list.length > 0 && (
                    <p className="text-xs text-gray-500">ㄴ {detail.option_list.join(", ")}</p>
                  )}
                  <p className="text-xs text-gray-500">수량: {detail.quantity}</p>
                </div>
              ))}
            </div>

            {/* 품목 총 개수 */}
            <div className="mt-2 font-bold">
              <span className="text-blue-500">
                {order.order_details.reduce((total, item) => total + item.quantity, 0)}
              </span>
              개 품목
            </div>

            {/* 주문 상태에 따른 상태 변경 버튼 */}
            {order.order_status === "주문대기" && (
              <div className="flex justify-between mt-4 space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => handleChangeStatus(order.oid, "주문접수")}
                >
                  접수
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleChangeStatus(order.oid, "주문취소")}
                >
                  취소
                </Button>
              </div>
            )}
            {order.order_status === "주문접수" && (
              <div className="flex justify-between mt-4 space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => handleChangeStatus(order.oid, "주문완료")}
                >
                  완료
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleChangeStatus(order.oid, "주문취소")}
                >
                  취소
                </Button>
              </div>
            )}
            {order.order_status === "주문완료" && (
              <div className="mt-4 text-sm text-gray-500">완료된 주문입니다.</div>
            )}
            {order.order_status === "주문취소" && (
              <div className="mt-4 text-sm text-gray-500">취소된 주문입니다.</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderManagementPage;
