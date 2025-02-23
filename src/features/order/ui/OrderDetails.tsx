import React from "react";
import { Order } from "@/entities/order/model/order-types";
import {
  getBadgeClasses,
  getNextButtonLabel,
  getNextStatus,
  getOrderStatusName,
  getOrderTotal,
} from "@/entities/order/lib/order-utils";
import { Button } from "@/shared/ui/button";

interface OrderDetailsProps {
  order: Order | null;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  if (!order) {
    return (
      <section className="flex-1 p-6 overflow-auto bg-gray-50">
        <h2 className="mb-6 text-2xl font-bold text-gray-700">주문 상세 정보</h2>
        <p className="text-gray-500">선택된 주문이 없습니다.</p>
      </section>
    );
  }

  const overallTotal = getOrderTotal(order);

  return (
    <section className="flex-1 p-4 overflow-auto bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-bold">주문 상세 정보</h2>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 flex justify-center items-center text-sm font-medium ${getBadgeClasses(
                order.order_status
              )}`}
            >
              {getOrderStatusName(order.order_status)}
            </span>
            <span className="flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 border border-gray-400 rounded">
              {order.order_type}
            </span>
            <div>
              <p className="font-semibold">{order.oid}</p>
              <p>{order.order_at}</p>
            </div>
          </div>
          {/* 주문 번호 (세 번째) */}

          <div className="flex gap-2">
            {/* 주문 취소 버튼 (같은 위치에 배치) */}
            <Button
              variant="outline"
              className="w-24 h-10 text-sm font-bold text-red-500 border-red-500 hover:bg-red-100"
            >
              주문 취소
            </Button>
            <button
              className={`w-24 h-10 text-sm font-bold rounded ${
                order.order_status === "COMPLETED" || order.order_status === "CANCELED"
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-green-600"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (order.order_status !== "COMPLETED" && order.order_status !== "CANCELED") {
                  onUpdateStatus(order, getNextStatus(order.order_status));
                }
              }}
              disabled={order.order_status === "COMPLETED" || order.order_status === "CANCELED"}
            >
              {getNextButtonLabel(order.order_status)}
            </button>
          </div>
        </div>

        {/* 주문 상세 목록 */}
        <div className="p-4 space-y-3 bg-white border border-gray-200 rounded-lg shadow-sm">
          {order.order_details.map((detail, index) => (
            <div key={index} className="pb-3 border-b last:border-none">
              <div className="flex items-center justify-between font-medium">
                <div className="w-1/2">{detail.menu_name}</div>
                <div className="w-1/4 text-center">{detail.quantity}</div>
                <div className="w-1/4 text-right">
                  {(detail.quantity * detail.price).toLocaleString()}원
                </div>
              </div>
              {detail.option_list && detail.option_list.length > 0 && (
                <div>
                  {detail.option_list.map((opt, i) => (
                    <div key={i} className="flex justify-between text-sm text-slate-500">
                      <div className="w-1/2 font-medium">- {opt.name}</div>
                      <div className="w-1/4 text-center">{opt.quantity}</div>
                      <div className="w-1/4 text-right" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-end text-lg font-bold text-gray-800">
            <span>총 금액: {overallTotal.toLocaleString()}원</span>
          </div>

          {/* 주문서 & 영수증 출력 버튼을 주문 상세 하단에 배치 */}
          <div className="flex justify-end mt-4 space-x-4">
            <Button variant="outline" className="w-full">
              주문서 출력
            </Button>
            <Button variant="outline" className="w-full">
              영수증 출력
            </Button>
          </div>
        </div>

        {/* 요청사항 섹션 */}
        {order.request && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="mb-1 font-semibold text-gray-600">요청사항</h3>
            <p className="text-gray-700">{order.request}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
