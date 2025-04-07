import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";

import { AxiosError } from "axios";
import { ApiResponse } from "@/shared/api/type";
import { Option } from "../model/option-types";
import {
  addOptionApi,
  deleteOptionApi,
  editOptionApi,
  getOptionListApi,
} from "../api/option-apis";

// 옵션 리스트 가져오기
export const useOptionList = () => {
  const query = useQuery<ApiResponse<Option[]>, AxiosError>({
    queryKey: ["optionList"],
    queryFn: getOptionListApi,
  });

  return query;
};

// 옵션 추가
export const useAddOption = () => {
  const mutation: UseMutationResult<
    ApiResponse<Option>,
    AxiosError,
    { name: string; price: number }
  > = useMutation({
    mutationFn: (data) => addOptionApi(data.name, data.price),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("옵션이 추가되었습니다.");
      }
    },
    onError: (error) => {
      console.error("옵션 추가 실패", error);
    },
  });

  return mutation;
};

// 옵션 수정
export const useEditOption = () => {
  const mutation: UseMutationResult<
    ApiResponse<Option>,
    AxiosError,
    { optionId: number; name: string; price: number }
  > = useMutation({
    mutationFn: ({ optionId, ...data }) =>
      editOptionApi(optionId, data.name, data.price),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("옵션이 수정되었습니다.");
      }
    },
    onError: (error) => {
      console.error("옵션 수정 실패", error);
    },
  });

  return mutation;
};

// 옵션 삭제
export const useDeleteOption = () => {
  const mutation: UseMutationResult<
    ApiResponse<null>,
    AxiosError,
    number
  > = useMutation({
    mutationFn: (optionId) => deleteOptionApi(optionId),
    onSuccess: (response) => {
      if (response.status === 200) {
        console.log("옵션이 삭제되었습니다.");
      }
    },
    onError: (error) => {
      console.error("옵션 삭제 실패", error);
    },
  });

  return mutation;
};
