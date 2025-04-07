import { useCreateMenu } from "./mutations/use-create-menu";
import { useDeleteMenu } from "./mutations/use-delete-menu";
import { useUpdateMenu } from "./mutations/use-update-menu";

export const useMenuActions = () => {
  const createMenuMutation = useCreateMenu();
  const deleteMenuMutation = useDeleteMenu();
  const updateMenuMutation = useUpdateMenu();

  return {
    addMenu: createMenuMutation.mutate,
    deleteMenu: deleteMenuMutation.mutate,
    toggleSoldOut: updateMenuMutation.mutate,
  };
};
