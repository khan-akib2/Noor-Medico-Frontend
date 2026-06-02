"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  ArrowLeft, 
  Check, 
  Clock, 
  X, 
  Send, 
  MessageCircle,
  FileText,
  Activity
} from "lucide-react";

/**
 * Helper to generate pre-populated templates for pharmacist responses.
 */
const getTemplate = (status, name, message) => {
  const customerName = name || "Valued Customer";
  
  switch (status) {
    case "confirmed":
      return `Dear ${customerName},

We are pleased to confirm your medicine/prescription inquiry with Noor Medico.

Our pharmacist team has reviewed your request. All items are in stock, and we are preparing your order. We will contact you shortly to coordinate pick-up or delivery.

If you have any urgent changes or additional requirements, please reply to this email or contact us directly.

Warm regards,
The Noor Medico Team`;

    case "delayed":
      return `Dear ${customerName},

Thank you for your medicine/prescription inquiry with Noor Medico.

We want to inform you that some items in your request are currently out of stock or delayed from our distributor. We expect them to arrive within 24-48 hours.

We will contact you as soon as they are available. Please let us know if you would like us to prepare the rest of your order in the meantime.

Warm regards,
The Noor Medico Team`;

    case "declined":
      return `Dear ${customerName},

Thank you for your inquiry with Noor Medico.

We regret to inform you that we are unable to fulfill your request at this time, as the specified medicines are currently unavailable or require validation that we cannot complete online.

We apologize for any inconvenience caused and recommend consulting your physician for alternatives.

Warm regards,
The Noor Medico Team`;

    default:
      return "";
  }
};

/**
 * Inner component that uses search params.
 * Wrapped in Suspense to allow proper build static optimization.
 */
function RespondConsole() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse parameters from incoming link
  const initialStatus = searchParams.get("status") || "confirmed";
  const name = searchParams.get("name") || "Valued Customer";
  const email = searchParams.get("email") || "Not Provided";
  const phone = searchParams.get("phone") || "";
  const originalMessage = searchParams.get("message") || "";

  // Component States
  const [activeStatus, setActiveStatus] = useState(initialStatus);
  const [draftMessage, setDraftMessage] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState({ success: null, message: "" });

  // Load template on initial load and when status changes
  useEffect(() => {
    setDraftMessage(getTemplate(activeStatus, name, originalMessage));
  }, [activeStatus, name, originalMessage]);

  // Handle Dispatch Email
  const handleSendEmail = async () => {
    if (email === "Not Provided") {
      setEmailStatus({
        success: false,
        message: "Unable to send email: No valid email address was provided by the customer."
      });
      return;
    }

    setSendingEmail(true);
    setEmailStatus({ success: null, message: "" });

    try {
      const response = await fetch("/api/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          status: activeStatus,
          message: draftMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailStatus({
          success: true,
          message: "Professional response email has been sent successfully!"
        });
      } else {
        throw new Error(data.error || "Failed to send email");
      }
    } catch (error) {
      setEmailStatus({
        success: false,
        message: error.message || "An unexpected error occurred while sending the email."
      });
    } finally {
      setSendingEmail(false);
    }
  };

  // Handle Dispatch WhatsApp
  const handleSendWhatsApp = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    // Ensure proper country code prefix for WhatsApp links (default India: 91)
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(draftMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-teal-500/10 selection:text-teal-400">
      
      {/* HEADER SECTION */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/")}
              className="p-2 border border-slate-800 hover:border-slate-700 rounded-xl hover:bg-slate-900 transition duration-300 text-slate-400 hover:text-slate-200"
              title="Return to Home"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-teal-500 font-extrabold">Noor Medico</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-700"></span>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-medium">Pharmacist Console</span>
              </div>
              <h1 className="text-lg font-bold text-slate-100 uppercase tracking-wide">
                Inquiry Admin Response Console
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">System Online</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-full">
          
          {/* LEFT COLUMN: CLIENT DATA */}
          <section className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-900 rounded-3xl p-6 md:p-8 flex flex-col h-full shadow-premium">
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-teal-500 uppercase">Inquiry Profile</span>
                <h2 className="text-xl font-extrabold text-slate-100 mt-1 mb-6 uppercase tracking-tight">
                  Client Request Details
                </h2>
                
                {/* DETAILS CARDS */}
                <div className="space-y-4">
                  {/* CLIENT NAME */}
                  <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex items-start gap-4">
                    <div className="p-3 bg-teal-950/50 border border-teal-900/30 text-teal-400 rounded-xl">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Client Name</p>
                      <p className="text-slate-100 font-bold mt-0.5">{name}</p>
                    </div>
                  </div>

                  {/* PHONE NUMBER */}
                  <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex items-start gap-4">
                    <div className="p-3 bg-teal-950/50 border border-teal-900/30 text-teal-400 rounded-xl">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Phone Number</p>
                      {phone ? (
                        <a href={`tel:${phone}`} className="text-slate-100 hover:text-teal-400 font-bold mt-0.5 block transition duration-200">
                          {phone}
                        </a>
                      ) : (
                        <p className="text-slate-500 italic mt-0.5">Not Provided</p>
                      )}
                    </div>
                  </div>

                  {/* EMAIL ADDRESS */}
                  <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex items-start gap-4">
                    <div className="p-3 bg-teal-950/50 border border-teal-900/30 text-teal-400 rounded-xl">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email Address</p>
                      {email !== "Not Provided" ? (
                        <a href={`mailto:${email}`} className="text-slate-100 hover:text-teal-400 font-bold mt-0.5 block transition duration-200">
                          {email}
                        </a>
                      ) : (
                        <p className="text-amber-500/70 font-semibold text-xs mt-0.5">Not Provided (Email disabled)</p>
                      )}
                    </div>
                  </div>

                  {/* ORIGINAL SPECIFICATIONS */}
                  <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-slate-400">
                      <FileText size={16} className="text-teal-500" />
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Client's Original Message</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-950 rounded-xl p-3 min-h-[100px] max-h-[180px] overflow-y-auto">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {originalMessage || "No inquiry message details provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ACTIONS */}
              <div className="mt-8 pt-6 border-t border-slate-900">
                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider font-extrabold transition duration-300"
                >
                  Exit Response Console
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: DRAFT & DISPATCH */}
          <section className="lg:col-span-7">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-900 rounded-3xl p-6 md:p-8 flex flex-col h-full justify-between shadow-premium">
              <div>
                <span className="text-[10px] font-extrabold tracking-widest text-teal-500 uppercase">Notification Center</span>
                <h2 className="text-xl font-extrabold text-slate-100 mt-1 mb-6 uppercase tracking-tight">
                  Draft & Dispatch Message
                </h2>

                {/* STATUS TOGGLE BUTTONS */}
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">Select Action Status</p>
                  <div className="grid grid-cols-3 gap-3">
                    
                    {/* CONFIRM BUTTON */}
                    <button
                      onClick={() => setActiveStatus("confirmed")}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-300 border ${
                        activeStatus === "confirmed"
                          ? "bg-teal-900/60 border-teal-500 text-teal-400"
                          : "bg-slate-950/60 border-slate-900 hover:border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Check size={14} />
                      Confirm
                    </button>

                    {/* DELAYED BUTTON */}
                    <button
                      onClick={() => setActiveStatus("delayed")}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-300 border ${
                        activeStatus === "delayed"
                          ? "bg-amber-900/60 border-amber-500 text-amber-400"
                          : "bg-slate-950/60 border-slate-900 hover:border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Clock size={14} />
                      Delayed
                    </button>

                    {/* DECLINE BUTTON */}
                    <button
                      onClick={() => setActiveStatus("declined")}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-300 border ${
                        activeStatus === "declined"
                          ? "bg-red-900/60 border-red-500 text-red-400"
                          : "bg-slate-950/60 border-slate-900 hover:border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <X size={14} />
                      Decline
                    </button>
                  </div>
                </div>

                {/* TEXT AREA */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                      Text Writing Area (Personalized Client Message)
                    </label>
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold bg-slate-950/60 px-2 py-0.5 border border-slate-900 rounded-full">
                      Live Template Auto Fill
                    </span>
                  </div>
                  <textarea
                    value={draftMessage}
                    onChange={(e) => setDraftMessage(e.target.value)}
                    className="w-full h-[280px] bg-slate-950/80 border border-slate-900 focus:border-teal-900/80 focus:ring-1 focus:ring-teal-900/50 rounded-2xl p-4 font-mono text-sm leading-relaxed outline-none text-slate-200 resize-none transition duration-200 focus:shadow-[0_0_20px_rgba(13,148,136,0.05)]"
                    placeholder="Compose response details..."
                  />
                </div>

                {/* NOTIFICATION TOAST */}
                {emailStatus.message && (
                  <div className={`mt-4 p-4 rounded-xl border text-sm flex items-start gap-3 animate-fadeIn ${
                    emailStatus.success
                      ? "bg-emerald-950/40 border-emerald-900/50 text-emerald-400"
                      : "bg-red-950/40 border-red-900/50 text-red-400"
                  }`}>
                    {emailStatus.success ? <Check className="mt-0.5 shrink-0" size={16} /> : <X className="mt-0.5 shrink-0" size={16} />}
                    <p>{emailStatus.message}</p>
                  </div>
                )}
              </div>

              {/* DISPATCH CHANNELS */}
              <div className="mt-8 pt-6 border-t border-slate-900">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase block mb-4">
                  Dispatch Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* SEND PROFESSIONAL EMAIL */}
                  <button
                    onClick={handleSendEmail}
                    disabled={sendingEmail || email === "Not Provided"}
                    className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-xs uppercase tracking-wider font-extrabold transition duration-300 border shadow-sm ${
                      email === "Not Provided"
                        ? "bg-slate-950/20 border-slate-950 text-slate-600 cursor-not-allowed"
                        : "bg-teal-700 hover:bg-teal-600 border-teal-600 hover:border-teal-500 text-white cursor-pointer active:scale-[0.98]"
                    }`}
                  >
                    <Send size={14} className={sendingEmail ? "animate-pulse" : ""} />
                    {sendingEmail ? "Sending Email..." : "Send Professional Email"}
                  </button>

                  {/* SEND VIA WHATSAPP */}
                  <button
                    onClick={handleSendWhatsApp}
                    disabled={!phone}
                    className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-xs uppercase tracking-wider font-extrabold transition duration-300 border shadow-sm ${
                      !phone
                        ? "bg-slate-950/20 border-slate-950 text-slate-600 cursor-not-allowed"
                        : "bg-emerald-800 hover:bg-emerald-700 border-emerald-700 hover:border-emerald-600 text-white active:scale-[0.98]"
                    }`}
                  >
                    <MessageCircle size={14} />
                    Send Via WhatsApp
                  </button>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-950 bg-slate-950 py-4 px-6 text-center">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
          Noor Medico Portal Response Console &bull; Security Access Granted
        </p>
      </footer>

    </div>
  );
}

/**
 * Main Page wrapper exporting the client console inside a Suspense component.
 */
export default function RespondConsolePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans">
        <div className="text-center flex flex-col items-center gap-4">
          <Activity size={32} className="text-teal-500 animate-pulse" />
          <div>
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent mx-auto mb-2"></div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Loading Response Console...</p>
          </div>
        </div>
      </div>
    }>
      <RespondConsole />
    </Suspense>
  );
}
