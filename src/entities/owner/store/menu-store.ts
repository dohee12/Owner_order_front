import { create } from "zustand";
import { Menu } from "../model/menu-types";

interface MenuState {
  Menus: Menu[];
  setMenus: (items: Menu[]) => void;
  addMenu: (item: Menu) => void;
  updateMenu: (item: Menu) => void;
  deleteMenu: (id: string) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  Menus: [],
  setMenus: (items) => set({ Menus: items }),
  addMenu: (item) => set((state) => ({ Menus: [...state.Menus, item] })),
  updateMenu: (item) =>
    set((state) => ({
      Menus: state.Menus.map((m) => (m.id === item.id ? item : m)),
    })),
  deleteMenu: (id) =>
    set((state) => ({
      Menus: state.Menus.filter((item) => item.id !== id),
    })),
}));
