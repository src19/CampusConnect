import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];






// export type Event = {
//     id: number;
//     eventname: string;
//     image: string | null;
//     clubname: string;
//     venue: string;
//   };
  
  // export type PizzaSize = 'S' | 'M' | 'L' | 'XL';
  
  // export type CartItem = {
  //   id: string;
  //   product: Event;
  //   product_id: number;
  //   size: PizzaSize;
  //   quantity: number;
  // };
  
  // export const OrderStatusList: OrderStatus[] = [
  //   'New',
  //   'Cooking',
  //   'Delivering',
  //   'Delivered',
  // ];
  
  // export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';
  
  // export type Order = {
  //   id: number;
  //   created_at: string;
  //   total: number;
  //   user_id: string;
  //   status: OrderStatus;
  
  //   order_items?: OrderItem[];
  // };
  
  // export type OrderItem = {
  //   id: number;
  //   product_id: number;
  //   products: Event;
  //   order_id: number;
  //   size: PizzaSize;
  //   quantity: number;
  // };
  
  // export type Profile = {
  //   id: string;
  //   group: string;
  // };