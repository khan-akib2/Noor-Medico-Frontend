import { NextResponse } from "next/server";
import { verifyOTP } from "@/services/otp";

export async function POST(request) {
  try {
    const { email, otp } = await request.json().catch(() => ({}));

    // 1. Input Validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    if (!otp || typeof otp !== "string" || otp.trim().length !== 6) {
      return NextResponse.json(
        { error: "A valid 6-digit OTP code is required." },
        { status: 400 }
      );
    }

    // 2. Perform Verification
    const verificationResult = verifyOTP(email, otp);

    if (!verificationResult.success) {
      // Return details of verification failures (lockout, expiration, invalid otp)
      const isLockoutOrExpired = 
        verificationResult.error.includes("exceeded") || 
        verificationResult.error.includes("expired") || 
        verificationResult.error.includes("No active OTP");

      return NextResponse.json(
        { error: verificationResult.error },
        { status: isLockoutOrExpired ? 403 : 400 }
      );
    }

    // 3. Return success response
    return NextResponse.json(
      { success: true, message: "Verification successful." },
      { status: 200 }
    );
  } catch (globalError) {
    console.error("[API OTP Verify] Internal error:", globalError);
    return NextResponse.json(
      { error: "An unexpected error occurred while verifying the code." },
      { status: 500 }
    );
  }
}
