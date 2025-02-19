import { ApiResponse } from "@/shared/api/type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getMenuDetail } from "../api/get-menu-detail";
import { Menu } from "../model/menu-types";

// 특정 메뉴의 상세 정보 가져오기
export const useGetMenuDetail = (menuId: number) => {
  const query = useQuery<ApiResponse<Menu>, AxiosError>({
    queryKey: ["menuDetail", menuId],
    queryFn: () => getMenuDetail(menuId),
    enabled: !!menuId,
  });

  return query;
};
