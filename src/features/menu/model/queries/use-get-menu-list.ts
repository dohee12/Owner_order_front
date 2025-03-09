import { getMenuList } from "@/entities/menu/api/get-menu-list";
import { Menu } from "@/entities/menu/model/menu-types";
import { ApiResponse } from "@/shared/api/type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 메뉴 리스트 가져오기
export const useGetMenuList = () => {
  const query = useQuery<ApiResponse<Menu[]>, AxiosError>({
    queryKey: ["menuList"],
    queryFn: getMenuList,
  });

  return query;
};
