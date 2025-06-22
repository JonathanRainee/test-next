export interface UserToken{
  token: string;
}

export interface DecodedJWT {
  sub: number | string;
  user: string;
  iat: number;
}