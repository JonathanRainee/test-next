import { createContext, useContext, useState } from "react";
import { CartContextType } from "../types/cartContextType";
import { CartResponse } from "../response/cartResponse";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
  const [carts, setCarts] = useState<CartResponse[]>([]);

  return(
    <CartContext.Provider value={{carts, setCarts}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if(!context) throw new Error("useCartProvider must be used within CartProvider");
  return context;
}