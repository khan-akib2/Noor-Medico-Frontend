import { NextResponse } from "next/server";
import { sendPharmacistResponseEmail } from "@/services/email";

export async function POST(request) {
  try {
    const { email, name, status, message } = await request.json();

    // Validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Recipient email and message content are required." },
        { status: 400 }
      );
    }

    if (email === "Not Provided") {
      return NextResponse.json(
        { error: "Cannot send email response because the client did not provide an email address." },
        { status: 400 }
      );
    }

    // Determine status prefix for subject
    let statusSubject = "Inquiry Update";
    if (status === "confirmed") statusSubject = "Inquiry Confirmed";
    if (status === "delayed") statusSubject = "Inquiry Update (Stock Delayed)";
    if (status === "declined") statusSubject = "Inquiry Status Update";

    const subject = `Noor Medico - ${statusSubject}`;

    // Attempt to send email
    await sendPharmacistResponseEmail({
      email,
      name,
      subject,
      message,
    });

    return NextResponse.json(
      { success: true, message: "Response email sent to customer successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Route Respond Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to dispatch pharmacist email. Please try again." },
      { status: 500 }
    );
  }
}
