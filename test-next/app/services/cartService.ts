import { CartResponse } from "../response/cartResponse";
import { ProductResponse } from "../response/productResponse";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export async function fetchCartAndProducst(sendRequest: <T = unknown>(config: AxiosRequestConfig)=>Promise<AxiosResponse<T>|null>): Promise<[CartResponse[], ProductResponse[]]> {
  const [cartRes, productRes] = await Promise.all([
    sendRequest<CartResponse[]>({
      method:'GET',
      url: 'https://fakestoreapi.com/carts'
    }),
    sendRequest<ProductResponse[]>({
      method:'GET',
      url:'https://fakestoreapi.com/products'
    })
  ]);

  return [cartRes?.data ?? [], productRes?.data ?? []];
}

export function filterCartByProductName(
  carts: CartResponse[],
  products: ProductResponse[],
  search: string
): CartResponse[]{
  return carts.filter((c) => c.products.some((i) => {
    const product = products.find((p) => p.id === i.productId);
    return product?.title.toLowerCase().includes(search.toLowerCase());
  }));
}

export function getProductDetail(products: ProductResponse[], productId: number){
  return products.find(p => p.id === productId);
}