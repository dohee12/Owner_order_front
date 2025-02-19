import { ApiResponse } from "@/shared/api/type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Menu } from "../model/menu-types";
import { getMenuList } from "../api/get-menu-list";

// 메뉴 리스트 가져오기
export const useGetMenuList = () => {
  const query = useQuery<ApiResponse<Menu[]>, AxiosError>({
    queryKey: ["menuList"],
    queryFn: getMenuList,
  });

  return query;
};
