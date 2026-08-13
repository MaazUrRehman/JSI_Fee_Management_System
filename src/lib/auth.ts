// import { SignJWT, jwtVerify } from "jose";
// import bcrypt from "bcryptjs";
// import fs from "fs/promises";
// import path from "path";

// export const AUTH_COOKIE_NAME = "auth-token";

// const secret = new TextEncoder().encode(
//   process.env.AUTH_SECRET || "jsi-fee-management-secret"
// );

// async function getCredentials() {
//   const credentialsPath = path.join(
//     process.cwd(),
//     "src",
//     "config",
//     "credentials.json"
//   );

//   const credentialsData = await fs.readFile(
//     credentialsPath,
//     "utf-8"
//   );

//   return JSON.parse(credentialsData);
// }

// export async function getAdminEmail() {
//   const credentials = await getCredentials();
//   return credentials.email;
// }

// export async function verifyPassword(password: string) {
//   const credentials = await getCredentials();

//   return bcrypt.compare(
//     password,
//     credentials.passwordHash
//   );
// }

// export async function createAuthToken(email: string) {
//   return new SignJWT({ email })
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("24h")
//     .sign(secret);
// }

// export async function verifyAuthToken(token: string) {
//   const { payload } = await jwtVerify(token, secret);
//   return payload;
// }

// export function getAuthCookieOptions() {
//   return {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax" as const,
//     path: "/",
//     maxAge: 60 * 60 * 24,
//   };
// }









import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { get } from "@vercel/blob";

export const AUTH_COOKIE_NAME = "auth-token";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "jsi-fee-management-secret"
);

async function getCredentials() {
  const result = await get("credentials.json", {
    access: "private",
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    throw new Error("Credentials file not found in Vercel Blob");
  }

  const text = await new Response(result.stream).text();

  return JSON.parse(text);
}

export async function getAdminEmail() {
  const credentials = await getCredentials();

  return credentials.email;
}

export async function verifyPassword(password: string) {
  const credentials = await getCredentials();

  return bcrypt.compare(
    password,
    credentials.passwordHash
  );
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