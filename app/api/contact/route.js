import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/services/email";

export async function POST(request) {
  try {
    const { name, phone, email, message } = await request.json();

    // Validation
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone number, and message/prescription details are required." },
        { status: 400 }
      );
    }

    const customerEmail = email && email.trim() !== "" ? email : "Not Provided";

    // Attempt to send email
    await sendInquiryEmail({ name, phone, email: customerEmail, message });

    return NextResponse.json(
      { success: true, message: "Inquiry submitted and email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Route Contact Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
