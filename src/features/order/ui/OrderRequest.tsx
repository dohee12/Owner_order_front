import { useUpdateOrderStatus } from "@/entities/order/hooks/use-update-order-status";

const OrderRequest = ({ orderId }: { orderId: number }) => {
  // orderId를 props로 받도록 수정
  const updateOrderStatus = useUpdateOrderStatus();

  const handleAccept = () => {
    updateOrderStatus.mutate({ orderId, status: "ACCEPTED" });
  };

  return (
    <section className="w-1/4 p-4 bg-white border-l border-gray-300">
      <h2 className="mb-2 text-lg font-bold">요청사항</h2>
      <div className="p-4 text-sm text-gray-700 border rounded">컵홀더 빼주세요.</div>

      <div className="flex justify-between mt-4">
        <button className="px-4 py-2 border rounded hover:bg-gray-50">취소</button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          접수
        </button>
      </div>
    </section>
  );
};

export default OrderRequest;
