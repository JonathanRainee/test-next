import { jwtDecode } from 'jwt-decode';
import { UserResponse } from '../response/userResponse';
import { DecodedJWT } from '../types/authType';
import { loginFormInput } from '../types/loginTypes';
import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';


export async function loginUser(
  form: loginFormInput,
  sendRequest: (config: AxiosRequestConfig) => Promise<any>
): Promise<UserResponse | null> {
  const response = await sendRequest({
    method: 'POST',
    //should be in .env, put it here for easier access
    url: 'https://fakestoreapi.com/auth/login',
    data: form,
  });

  if (!response || !response.data?.token) return null;

  try {
    const token = response.data.token;
    const decoded = jwtDecode<DecodedJWT>(token);
    const user: UserResponse = {
      id: Number(decoded.sub),
      username: decoded.user,
      iat: Number(decoded.iat),
    }

    Cookies.set('user', JSON.stringify(user), {expires: 1});
    return user
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
}

export async function logout() {
  Cookies.remove('user');
  localStorage.removeItem("loginSuccess");
  localStorage.setItem('logoutSuccess', 'true');
}
