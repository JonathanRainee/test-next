import { CartResponse } from "../response/cartResponse";
import { ProductResponse } from "../response/productResponse";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export async function fetchCart(sendRequest: <T = unknown>(config: AxiosRequestConfig)=>Promise<AxiosResponse<T>|null>): Promise<[CartResponse[]]> {
  const [cartRes] = await Promise.all([
    sendRequest<CartResponse[]>({
      method:'GET',
      //should be in .env, put it here for easier access
      url: 'https://fakestoreapi.com/carts'
    })
  ]);

  return [cartRes?.data ?? []];
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