import { createContext, useContext, useState } from "react";
import { ProductResponse } from "../response/productResponse";
import { ProductContextType } from "../types/productContextType";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({children}: {children: React.ReactNode}) => {
  const [products, setProducts] = useState<ProductResponse[] | null>(null);

  return(
    <ProductContext.Provider value={{products, setProducts}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext must be used within ProductProvider");
  return context;
};