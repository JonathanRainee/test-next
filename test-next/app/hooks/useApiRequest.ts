import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

export function useApiRequest<TResponse = unknown, TRequest = unknown>(){

  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async(
    config: AxiosRequestConfig<TRequest>
  ): Promise<AxiosResponse<TResponse> | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios<TResponse, AxiosResponse<TResponse>, TRequest>(config);
      setData(response.data);
      return response;
    } catch (error) {
      if(axios.isAxiosError(error)){
        setError(error.response?.data?.message || error.message || "API error");
      }else{
        setError("An unknown error occured while sending request")
      }
      return null;
    } finally{
      setLoading(false)
    }
  }
  
  return {
    data,
    loading,
    error,
    sendRequest,
  };
}