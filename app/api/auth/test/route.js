import { NextResponse } from "next/server";
import { sendOTP, sendPasswordReset, sendWelcomeEmail, sendNotification } from "@/services/email";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetEmail = searchParams.get("email");
    const secret = searchParams.get("secret");

    // 1. Environmental protection
    const isDev = process.env.NODE_ENV === "development";
    const bypassSecret = process.env.TEST_ROUTE_SECRET || "noor-test-token-2026";
    
    if (!isDev && secret !== bypassSecret) {
      return NextResponse.json(
        { error: "Access Denied. This endpoint is restricted to development environments." },
        { status: 403 }
      );
    }

    if (!targetEmail || !targetEmail.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid recipient email as a query parameter. Example: ?email=yourname@example.com" },
        { status: 400 }
      );
    }

    const name = searchParams.get("name") || "Dr. Rajesh Mehta";
    const results = {};

    console.log(`[Email Test] Initiating test run to: ${targetEmail}`);

    // Test 1: Send OTP
    try {
      await sendOTP({
        email: targetEmail,
        otp: "987541",
        name: name
      });
      results.otp = "Success";
    } catch (e) {
      results.otp = `Failed: ${e.message}`;
    }

    // Test 2: Send Password Reset
    try {
      await sendPasswordReset({
        email: targetEmail,
        resetLink: "https://noormedico.com/auth/reset?token=test_reset_token_abcd1234",
        name: name
      });
      results.passwordReset = "Success";
    } catch (e) {
      results.passwordReset = `Failed: ${e.message}`;
    }

    // Test 3: Send Welcome Email
    try {
      await sendWelcomeEmail({
        email: targetEmail,
        name: name
      });
      results.welcome = "Success";
    } catch (e) {
      results.welcome = `Failed: ${e.message}`;
    }

    // Test 4: Send Custom Notification
    try {
      await sendNotification({
        email: targetEmail,
        subject: "Urgent: Direct Distributor Sourcing Notice",
        title: "Rare Medicine Sourcing Complete",
        body: `Hello ${name},\n\nWe have successfully sourced the oncology medications requested earlier today. The cold-chain storage packaging has been certified, and the medicines are ready for collection at our Koparkhairane branch.\n\nPlease complete the verification steps within 2 hours to avoid batch release to the secondary queue.\n\nThank you,\nNoor Medico Staff`
      });
      results.notification = "Success";
    } catch (e) {
      results.notification = `Failed: ${e.message}`;
    }

    return NextResponse.json({
      message: "Test suite execution completed.",
      recipient: targetEmail,
      results
    }, { status: 200 });

  } catch (error) {
    console.error("[Email Test] Fatal test suite error:", error);
    return NextResponse.json(
      { error: "Internal test suite failure.", details: error.message },
      { status: 500 }
    );
  }
}
