interface StatusBadgeProps {
  status: "pending" | "processing" | "completed" | "cancelled";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let badgeText = "";
  let badgeColor = "";

  // 상태별 배지 텍스트 및 색상 설정
  switch (status) {
    case "pending":
      badgeText = "대기";
      badgeColor = "bg-yellow-200 text-yellow-800";
      break;
    case "processing":
      badgeText = "접수";
      badgeColor = "bg-blue-200 text-blue-800";
      break;
    case "completed":
      badgeText = "완료";
      badgeColor = "bg-green-200 text-green-800";
      break;
    case "cancelled":
      badgeText = "취소";
      badgeColor = "bg-red-200 text-red-800";
      break;
    default:
      badgeText = "알 수 없음";
      badgeColor = "bg-gray-200 text-gray-800";
  }

  return (
    <span className={`inline-block px-3 py-0.5 text-sm font-medium rounded-full ${badgeColor}`}>
      {badgeText}
    </span>
  );
};

export { StatusBadge };
