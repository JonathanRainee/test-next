import { CartResponse } from "../response/cartResponse";
import { ProductResponse } from "../response/productResponse";

export interface CartDetailDialogProps {
  cart: CartResponse;
  open: boolean;
  onClose: () => void;
  products: ProductResponse[];
}
