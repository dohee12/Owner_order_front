import { Option } from "./option-types";

export interface Order {
  oid: number;
  order_at: string;
  modified_at: string;
  order_status: OrderStatus;
  order_number: number;
  order_details: {
    menu_name: string;
    option_list: Option[];
  }[];
}

export type OrderStatus = "PENDING" | "ACCEPTED" | "COMPLETED" | "CANCELED";
