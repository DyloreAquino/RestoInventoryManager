export type Delivery = {
  id: number;
  deliveryDate: string; // YYYY-MM-DD
  deliveryRider: string;
  deliveryRiderNumber: string;
};

export type DeliveryItem = {
  itemID: number;
  name: string;
  quantity: number;
};
