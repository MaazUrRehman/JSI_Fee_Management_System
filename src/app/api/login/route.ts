import { NextRequest, NextResponse } from "next/server";
import {
  getAdminEmail,
  AUTH_COOKIE_NAME,
  createAuthToken,
  getAuthCookieOptions,
  verifyPassword,
  verifyAuthToken,
} from "@/lib/auth";
export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    await verifyAuthToken(token);
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const adminEmail = await getAdminEmail();

  const isValidEmail =
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase();

  const isValidPassword = await verifyPassword(password);

  if (!isValidEmail || !isValidPassword) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = await createAuthToken(
    email.trim().toLowerCase()
  );

  const response = NextResponse.json({ success: true });

  response.cookies.set(
    "auth-token",
    token,
    getAuthCookieOptions()
  );

  return response;
}
