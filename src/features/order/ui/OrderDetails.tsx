import { Order } from "@/entities/order/model/order-types";

// props 타입 정의
interface OrderDetailsProps {
  order: Order | null; // 선택된 주문이 없을 수도 있으므로 null 가능
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  if (!order) {
    return (
      <section className="w-2/4 p-4 overflow-auto">
        <h2 className="mb-2 text-lg font-bold">주문 상세 정보</h2>
        <p className="text-gray-500">선택된 주문이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="w-2/4 p-4 overflow-auto">
      <h2 className="mb-2 text-lg font-bold">주문 상세 정보</h2>
      <div className="p-4 bg-white border rounded">
        <div className="flex justify-between">
          <div>메뉴</div>
          <div>수량</div>
          <div>가격</div>
        </div>
        <hr className="my-2" />
        {order.order_details?.map((detail, index) => (
          <div key={index} className="flex justify-between">
            <div>{detail.menu_name}</div>
            <div>{detail.quantity ?? 1}</div> {/* 수량 표시 */}
            <div>4,500원</div> {/* 가격 정보 (예제) */}
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>총</span>
          <span>{order.quantity ?? 1} 개</span>
          <span>4,500원</span>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
