import React from "react";
import { Order } from "@/entities/order/model/order-types";
import { getOrderTotal } from "@/entities/order/lib/order-utils";
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
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex flex-col mb-2 md:flex-row md:justify-between md:items-center">
            <div>
              <span className="font-semibold text-gray-600">주문 번호:</span> {order.oid}
            </div>
          </div>
          <div>
            <span className="font-semibold text-gray-600">주문 시간:</span> {order.order_at}
          </div>
          <div>
            <span className="font-semibold text-gray-600">주문 상태:</span> {order.order_status}
          </div>
        </div>
        <div className="p-4 space-y-5 bg-white border border-gray-200 rounded-lg shadow-sm">
          {order.order_details.map((detail, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <div className="w-1/2 font-medium text-gray-800">{detail.menu_name}</div>
                <div className="w-1/4 text-center text-gray-700">{detail.quantity}개</div>
                <div className="w-1/4 text-right text-gray-500">
                  {(detail.quantity * detail.price).toLocaleString()}원
                </div>
              </div>
              {detail.options && detail.options.length > 0 && (
                <div>
                  {detail.options.map((opt, i) => (
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
          <hr />
          <div className="flex justify-end font-bold text-gray-800">
            <span>총 금액: {overallTotal.toLocaleString()}원</span>
          </div>
        </div>
        {/* 요청사항 섹션 */}
        {order.request && (
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="mb-1 font-semibold text-gray-600">요청사항</h3>
            <p className="text-gray-700">{order.request}</p>
          </div>
        )}
        {/* 액션 버튼 영역 */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">주문서 출력</Button>
          <Button variant="outline">영수증 출력</Button>
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-100">
            주문 취소
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
