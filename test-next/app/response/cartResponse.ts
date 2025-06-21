export interface CartResponse {
  id: number;
  userId: number;
  date: string;
  products: products[];
  __v: number;
}

export interface products {
  productId: number;
  quantity: number;
}
