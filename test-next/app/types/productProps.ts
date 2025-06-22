import { products } from "../response/cartResponse";
import { ProductResponse } from "../response/productResponse";

export interface ProductCardProps {
  item: products
  product: ProductResponse;
  canEdit: boolean;
  onDelete?: (productId: number) => void;
}

export interface ProductPageProps {
  products: ProductResponse[];
}