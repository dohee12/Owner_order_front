const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex h-screen">
        {/* 주문 목록 (왼쪽) */}
        <aside className="w-1/4 overflow-auto">
          <div className="p-4">
            <h2 className="mb-2 text-xl font-bold">주문 내역</h2>
            {/* 주문 목록 */}
            <ul className="space-y-2">
              <li className="p-2 bg-white border rounded cursor-pointer hover:bg-gray-100">
                <div className="text-sm text-gray-500">2025. 01. 17 09:42 P.M</div>
                <div className="flex items-center justify-between">
                  <span>아메리카노</span>
                  <span className="text-xs text-blue-500">신규</span>
                </div>
              </li>
              <li className="p-2 bg-white border rounded cursor-pointer hover:bg-gray-100">
                <div className="text-sm text-gray-500">2025. 01. 17 09:45 P.M</div>
                <div className="flex items-center justify-between">
                  <span>라떼 2개</span>
                  <span className="text-xs text-green-500">접수</span>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        {/* 주문 상세 정보 (중앙) */}
        <section className="w-2/4 p-4 overflow-auto">
          <h2 className="mb-2 text-lg font-bold">주문 상세 정보</h2>
          <div className="p-4 bg-white border rounded">
            <div className="flex justify-between">
              <div>메뉴</div>
              <div>수량</div>
              <div>가격</div>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <div>아메리카노</div>
              <div>1</div>
              <div>4,500원</div>
            </div>
            {/* 옵션 */}
            <div className="ml-4 text-xs text-gray-500">- ICE</div>
            {/* 합계 */}
            <hr className="my-2" />
            <div className="flex justify-between font-bold">
              <span>총</span>
              <span>1 개</span>
              <span>4,500원</span>
            </div>
          </div>
        </section>

        {/* 요청사항 (오른쪽) */}
        <section className="w-1/4 p-4 bg-white border-l border-gray-300">
          <h2 className="mb-2 text-lg font-bold">요청사항</h2>
          <div className="p-4 text-sm text-gray-700 border rounded">컵홀더 빼주세요.</div>

          {/* 하단 버튼들 */}
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 border rounded hover:bg-gray-50">취소</button>
            <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              접수
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
