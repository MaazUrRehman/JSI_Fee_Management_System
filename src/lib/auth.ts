import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export const ADMIN_EMAIL = "superadmin2026@jsi.com";

export const ADMIN_PASSWORD_HASH =
  "$2b$12$veuQhHpIM6u2SbZiS3koQOdV6i5vLS4QegbNTriLrGu6.60gpNdQ2";

export const AUTH_COOKIE_NAME = "auth-token";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "jsi-fee-management-secret"
);

export async function verifyPassword(password: string) {
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export async function createAuthToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24,
  };
}