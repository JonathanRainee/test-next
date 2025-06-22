

import { products } from "../response/cartResponse";
import { ProductResponse } from "../response/productResponse";

export interface AddCartDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCart: () => void;
  onAddProduct: () => void;
  onDeleteProduct: (productId: number) => void;
  onProductChange: (productName: string, productId: number) => void;
  currentProductsList: products[];
  currentProductId: number | string;
  currentQuantity: number;
  products: ProductResponse[];
  setCurrentQuantity: (qty: number) => void;
}