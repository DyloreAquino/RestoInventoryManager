export type Order = {
  id: number;
  orderDate: string; // YYYY-MM-DD
};

export type OrderDish = {
  dishID: number;
  dishName: string;
  quantity: number;
};