// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import fs from "fs/promises";
// import path from "path";

// import {
//   AUTH_COOKIE_NAME,
//   verifyAuthToken,
// } from "@/lib/auth";

// export async function POST(request: NextRequest) {
//   try {
//     // Check authentication
//     const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     try {
//       await verifyAuthToken(token);
//     } catch {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     // Get passwords from request
//     const {
//       currentPassword,
//       newPassword,
//       confirmPassword,
//     } = await request.json();

//     // Required fields
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       return NextResponse.json(
//         { error: "All password fields are required" },
//         { status: 400 }
//       );
//     }

//     // Check new password match
//     if (newPassword !== confirmPassword) {
//       return NextResponse.json(
//         { error: "New passwords do not match" },
//         { status: 400 }
//       );
//     }

//     // Read credentials file
//     const credentialsPath = path.join(
//       process.cwd(),
//       "src",
//       "config",
//       "credentials.json"
//     );

//     const credentialsData = await fs.readFile(
//       credentialsPath,
//       "utf-8"
//     );

//     const credentials = JSON.parse(credentialsData);

//     // Verify current password
//     const isCurrentPasswordValid = await bcrypt.compare(
//       currentPassword,
//       credentials.passwordHash
//     );

//     if (!isCurrentPasswordValid) {
//       return NextResponse.json(
//         { error: "Current password is incorrect" },
//         { status: 400 }
//       );
//     }

//     // Hash new password
//     const newPasswordHash = await bcrypt.hash(
//       newPassword,
//       12
//     );

//     // Update credentials
//     credentials.passwordHash = newPasswordHash;

//     await fs.writeFile(
//       credentialsPath,
//       JSON.stringify(credentials, null, 2),
//       "utf-8"
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Password updated successfully",
//     });
//   } catch (error) {
//     console.error("Password update error:", error);

//     return NextResponse.json(
//       { error: "Failed to update password" },
//       { status: 500 }
//     );
//   }
// }










import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { get, put } from "@vercel/blob";

import {
  AUTH_COOKIE_NAME,
  verifyAuthToken,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    try {
      await verifyAuthToken(token);
    } catch {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get passwords from request
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = await request.json();

    // Required fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required" },
        { status: 400 }
      );
    }

    // Check new password match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New passwords do not match" },
        { status: 400 }
      );
    }

    // Get credentials from Vercel Blob
    const result = await get("credentials.json", {
      access: "private",
      useCache: false,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error("Credentials file not found in Vercel Blob");
    }

    const credentialsText = await new Response(
      result.stream
    ).text();

    const credentials = JSON.parse(credentialsText);

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      credentials.passwordHash
    );

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(
      newPassword,
      12
    );

    // Update password
    credentials.passwordHash = newPasswordHash;

    // Save updated credentials back to Vercel Blob
    await put(
      "credentials.json",
      JSON.stringify(credentials, null, 2),
      {
        access: "private",
        allowOverwrite: true,
        contentType: "application/json",
      }
    );

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("Password update error:", error);

    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
}