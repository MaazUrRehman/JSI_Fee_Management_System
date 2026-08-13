import { jwtVerify } from "jose";

export const AUTH_COOKIE_NAME = "auth-token";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "jsi-fee-management-secret"
);

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}