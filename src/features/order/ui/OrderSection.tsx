import React, { useState, useCallback } from "react";
import { Order } from "@/entities/order/model/order-types";
import {
  getBadgeClasses,
  getMenuSummary,
  getOrderTotal,
  getNextStatus,
  getNextButtonLabel,
} from "@/entities/order/lib/order-utils";
import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { getOrderStatusName } from "@/entities/order/lib/order-utils"; // 함수 임포트

// 상대 시간 계산 함수
const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const minutesDiff = differenceInMinutes(now, date);
  if (minutesDiff < 1) return "방금 전";
  if (minutesDiff < 60) return `${minutesDiff}분 전`;
  const hoursDiff = differenceInHours(now, date);
  if (hoursDiff < 24) return `${hoursDiff}시간 전`;
  const daysDiff = differenceInDays(now, date);
  return `${daysDiff}일 전`;
};

interface OrderSectionProps {
  title: string;
  orderList: Order[];
  selectedOrderId: number | null;
  onSelectOrder: (order: Order) => void;
  onUpdateStatus?: (order: Order, newStatus: string) => void;
}

const OrderSection: React.FC<OrderSectionProps> = ({
  title,
  orderList,
  selectedOrderId,
  onSelectOrder,
  onUpdateStatus,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // 콜백 ref를 사용하여 내부 콘텐츠의 높이를 DOM에 직접 설정
  const contentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        node.style.transition = "max-height 300ms ease, opacity 300ms ease";
        if (isOpen) {
          node.style.maxHeight = `${node.scrollHeight}px`;
          node.style.opacity = "1";
        } else {
          node.style.maxHeight = "0px";
          node.style.opacity = "0";
        }
      }
    },
    [isOpen]
  );

  return (
    <div>
      <div
        className="px-4 py-2 text-sm font-semibold text-gray-700 border-b cursor-pointer select-none bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title} {orderList.length}건 {isOpen ? "▼" : "▲"}
      </div>
      <div ref={contentRef} className="overflow-hidden">
        <ul>
          {orderList.map((order) => {
            const nextStatus = getNextStatus(order.order_status);
            const nextButtonLabel = getNextButtonLabel(order.order_status);
            return (
              <li
                key={order.oid}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                  selectedOrderId === order.oid ? "bg-blue-100 hover:bg-blue-200" : ""
                }`}
                onClick={() => onSelectOrder(order)}
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 font-semibold text-gray-800">
                        <p className="px-3 py-1 text-sm font-medium text-gray-700 border border-gray-400 rounded">
                          {order.order_type}
                        </p>
                        {order.oid}
                        <span className="ml-2 text-sm text-gray-500">
                          {getRelativeTime(order.order_at)}
                        </span>
                      </div>
                      <span className={getBadgeClasses(order.order_status)}>
                        {getOrderStatusName(order.order_status)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div>{getMenuSummary(order)}</div>
                        <div>{getOrderTotal(order).toLocaleString()}원</div>
                      </div>
                      {nextStatus && nextButtonLabel && (
                        <button
                          aria-label={`Change status to ${nextStatus}`}
                          className="px-3 py-1 text-sm text-white bg-blue-500 border border-blue-500 rounded hover:bg-blue-700 hover:border-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateStatus(order, nextStatus);
                          }}
                        >
                          {nextButtonLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          {orderList.length === 0 && (
            <li className="p-4 text-sm text-gray-500">해당 상태의 주문이 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrderSection;
