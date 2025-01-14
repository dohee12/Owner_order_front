const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">설정</h1>
      <p>이 페이지는 관리자만 접근할 수 있습니다.</p>

      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold">계정 설정</h2>
          <p className="text-gray-600">
            관리자 계정 정보를 수정하거나 업데이트할 수 있습니다.
          </p>
          <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            계정 정보 수정
          </button>
        </section>

        <section>
          <h2 className="text-xl font-semibold">가게 설정</h2>
          <p className="text-gray-600">
            가게 이름, 위치 및 기타 정보를 업데이트하세요.
          </p>
          <button className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600">
            가게 정보 수정
          </button>
        </section>

        <section>
          <h2 className="text-xl font-semibold">시스템 설정</h2>
          <p className="text-gray-600">
            시스템 환경 설정 및 기본값을 관리하십시오.
          </p>
          <button className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600">
            시스템 초기화
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
