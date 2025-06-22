import { CartResponse } from "../response/cartResponse";

export interface CartContextType{
  carts: CartResponse[],
  setCarts: React.Dispatch<React.SetStateAction<CartResponse[]>>;
}