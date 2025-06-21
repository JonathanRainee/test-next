export interface UserToken{
  token: string;
}

export interface DecodedJWT {
  sub: number | string;
  user: string;
  iat: number;
}

export interface UserResponse {
  id: number;
  username: string;
  iat: number;
}
