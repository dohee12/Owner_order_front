import { Option } from "./option-types";

// 메뉴 기본 정보 타입
export interface Menu {
  id: number;
  name: string;
  price: number;
  menuImg: string;
  storeId: number;
  o_list: Option[]; // 메뉴에 포함된 옵션 리스트
}

// 메뉴 상세 정보 타입 (Menu를 상속)
export interface MenuDetail extends Menu {
  name: string; // 메뉴 이름
}

// 메뉴 생성 요청 타입
export interface CreateMenuRequest {
  menu_name: string; // 메뉴 이름
  price: number; // 가격
  opt_list: Option[]; // 옵션 ID 리스트
}

// 메뉴 생성 응답 타입
export interface CreateMenuResponse {
  menuId: number; // 새로 생성된 메뉴의 ID
}

// 메뉴 수정 요청 타입
export interface EditMenuRequest {
  menu_name: string; // 메뉴 이름
  price: number; // 가격
  optList: number[]; // 옵션 ID 리스트
}

// 메뉴 수정 응답 타입
export interface EditMenuResponse {
  menuId: number; // 수정된 메뉴의 ID
}

// 메뉴 삭제 요청 타입
export interface DeleteMenuRequest {
  menuId: number; // 삭제할 메뉴의 ID
}

// 특정 메뉴에 옵션 추가 요청 타입
export interface AddMenuOptionsRequest {
  menuId: number; // 옵션을 추가할 메뉴의 ID
  optList: number[]; // 추가할 옵션 ID 리스트
}

// 특정 메뉴에서 옵션 제거 요청 타입
export interface RemoveMenuOptionRequest {
  menuId: number; // 옵션을 제거할 메뉴의 ID
  optionId: number; // 제거할 옵션의 ID
}
