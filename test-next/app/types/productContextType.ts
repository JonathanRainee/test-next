import { ProductResponse } from "../response/productResponse";

export interface ProductContextType{
  products: ProductResponse[] | null,
  setProducts: (products: ProductResponse[]) => void;
}