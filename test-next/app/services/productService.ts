import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ProductResponse } from "../response/productResponse";

export async function fetchProducts(sendRequest: <T = unknown>(config: AxiosRequestConfig)=>Promise<AxiosResponse<T>|null>): Promise<[ProductResponse[]]> {
  const [productRes] = await Promise.all([
    sendRequest<ProductResponse[]>({
      method:'GET',
      url:'https://fakestoreapi.com/products'
    })
  ]);

  return [productRes?.data ?? []];
}