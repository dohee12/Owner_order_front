import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Option } from "@/entities/owner/model/option-types";

export interface AddMenuFormValues {
  menu_name: string;
  price: number;
  opt_list: Option[];
}

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddMenuFormValues) => void;
}

export const AddMenuModal = ({ isOpen, onClose, onSubmit }: AddMenuModalProps) => {
  const { register, handleSubmit, control, reset } = useForm<AddMenuFormValues>({
    defaultValues: {
      menu_name: "",
      price: 0,
      opt_list: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "opt_list",
  });

  const submitHandler: SubmitHandler<AddMenuFormValues> = (data) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-full p-6 overflow-auto bg-white rounded shadow-lg w-96">
        <h2 className="mb-4 text-xl font-bold">상품 생성</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">메뉴 이름</label>
            <input
              type="text"
              {...register("menu_name", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">가격</label>
            <input
              type="number"
              {...register("price", { required: true, valueAsNumber: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">옵션</label>
              <Button
                type="button"
                onClick={() =>
                  append({
                    id: Date.now(), // 임시 옵션 ID 생성
                    name: "",
                    price: 0,
                    required: false,
                    storeId: 0,
                  })
                }
                variant="outline"
                size="sm"
              >
                옵션 추가
              </Button>
            </div>
            {fields.length > 0 ? (
              fields.map((field, index) => (
                <div key={field.id} className="p-2 mb-2 border rounded">
                  <div className="mb-2">
                    <label className="block text-xs font-medium">옵션 이름</label>
                    <input
                      type="text"
                      {...register(`opt_list.${index}.name`, { required: true })}
                      className="w-full p-1 text-xs border rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-xs font-medium">옵션 가격</label>
                    <input
                      type="number"
                      {...register(`opt_list.${index}.price`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                      className="w-full p-1 text-xs border rounded"
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      {...register(`opt_list.${index}.required`)}
                      className="mr-2"
                    />
                    <span className="text-xs">필수 옵션</span>
                  </div>
                  <div className="mb-2">
                    <label className="block text-xs font-medium">매장 ID</label>
                    <input
                      type="number"
                      {...register(`opt_list.${index}.storeId`, {
                        required: true,
                        valueAsNumber: true,
                      })}
                      className="w-full p-1 text-xs border rounded"
                    />
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                    삭제
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">옵션이 없습니다.</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">추가</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
