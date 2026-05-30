import { NextResponse } from "next/server";
import { generateOTP } from "@/services/otp";
import { sendOTP } from "@/services/email";

export async function POST(request) {
  try {
    const { email, name } = await request.json().catch(() => ({}));

    // 1. Input Validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // 2. Generate secure OTP (handles cooldowns and requests window limits)
    let otp;
    try {
      otp = generateOTP(email);
    } catch (otpError) {
      console.warn(`[API OTP Send] Rate limit block for ${email}:`, otpError.message);
      return NextResponse.json(
        { error: otpError.message },
        { status: 429 } // Too Many Requests
      );
    }

    // 3. Send OTP email using Brevo
    try {
      await sendOTP({ email, otp, name });
    } catch (sendError) {
      console.error(`[API OTP Send] Failed to send email to ${email}:`, sendError);
      return NextResponse.json(
        { error: "Failed to dispatch verification email. Please try again later." },
        { status: 500 }
      );
    }

    // 4. Return success response
    return NextResponse.json(
      { success: true, message: "A 6-digit verification code has been sent to your email." },
      { status: 200 }
    );
  } catch (globalError) {
    console.error("[API OTP Send] Internal error:", globalError);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
