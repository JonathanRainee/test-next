import { jwtDecode } from 'jwt-decode';
import { DecodedJWT, UserResponse, UserToken } from '../response/userResponse';
import { loginFormInput } from '../types/loginTypes';
import { AxiosRequestConfig } from 'axios';

export async function loginUser(
  form: loginFormInput,
  sendRequest: (config: AxiosRequestConfig) => Promise<any>
): Promise<UserResponse | null> {
  const response = await sendRequest({
    method: 'POST',
    url: 'https://fakestoreapi.com/auth/login',
    data: form,
  });

  if (!response || !response.data?.token) return null;

  try {
    const token = response.data.token;
    const decoded = jwtDecode<DecodedJWT>(token);

    return {
      id: Number(decoded.sub),
      username: decoded.user,
      iat: Number(decoded.iat),
    } as UserResponse;
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
}
