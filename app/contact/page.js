"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import gsap from "gsap";

function ContactForm() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: subjectParam ? `Hi Noor Medico, I am writing to inquire about ${subjectParam}. ` : ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setError(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4.5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm font-medium transition-all"
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4.5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm font-medium transition-all"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4.5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm font-medium transition-all"
          placeholder="Enter email address"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Medicine / Inquiry Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4.5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm font-medium transition-all resize-none"
          placeholder="Type the names of medicines, daily essentials, or wellness guidance questions..."
        />
      </div>

      {/* Status Alerts */}
      {success && (
        <div className="flex items-start gap-3 p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
          <div>
            <span className="font-bold">Inquiry Sent Successfully!</span>
            <p className="text-xs text-emerald-700/90 mt-0.5">We have received your medical inquiry details. A registered pharmacist will reach out to you within a few minutes.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 p-4 bg-rose-50 text-rose-800 rounded-xl border border-rose-100 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <span className="font-bold">Submission Failed</span>
            <p className="text-xs text-rose-700/90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:bg-slate-300 disabled:shadow-none"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-5 h-5" />
            <span>Submit Online Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal layout elements
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-teal-50/40 via-teal-50/10 to-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <span className="contact-reveal text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full self-center">
            Connect With Us
          </span>
          <h1 className="contact-reveal text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact NOOR MEDICO
          </h1>
          <p className="contact-reveal text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Get instant pharmacist consultation, ask about medication stock levels, cold chain storage facilities, or pick-up timings.
          </p>
        </div>
      </section>

      {/* Main Grid Contact Content */}
      <section className="py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Contact Cards Grid */}
            <div className="contact-reveal lg:col-span-5 flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Pharmacy Contact Info
              </h2>

              {/* Phone Card */}
              <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-teal-100 shadow-premium transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Support</span>
                  <a href={`tel:${siteConfig.phone}`} className="text-base font-bold text-teal-700 hover:underline">
                    {siteConfig.formattedPhone}
                  </a>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Available 24/7 for urgent clinical calls and medical store availability checks.
                  </p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-900 mt-1"
                  >
                    <span>Click to Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-teal-100 shadow-premium transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.49 5.357 1.491 5.482 0 9.943-4.463 9.947-9.95.002-2.657-1.02-5.155-2.879-7.017-1.86-1.86-4.363-2.883-7.025-2.884-5.485 0-9.947 4.465-9.952 9.954-.002 2.032.531 4.022 1.547 5.765l-.995 3.637 3.733-.979zm11.367-7.63c-.301-.15-1.785-.88-2.062-.98-.277-.1-.478-.15-.678.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.651.075-.302-.15-1.272-.469-2.423-1.495-.896-.799-1.5-1.787-1.275-2.164.225-.377.225-.58.375-.73.15-.15.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.678-1.635-.93-2.245-.244-.589-.493-.509-.678-.519-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8 0-.275-.3-.775-1.202-1.075-1.928-.275-.663-.525-.575-.725-.588l-.525-.01c-.175 0-.45.075-.7.325-.25.25-1 .975-1 2.375s1.025 2.75 1.175 2.95c.15.2 2.025 3.1 4.905 4.35.685.298 1.22.476 1.638.608.688.219 1.31.189 1.802.115.55-.08 1.685-.69 1.922-1.355.238-.665.238-1.23.167-1.35-.07-.12-.275-.197-.575-.347z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp Portal</span>
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-base font-bold text-emerald-600 hover:underline">
                    Quick Chat Link
                  </a>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Perfect to send high-resolution photos of prescriptions or inquire about specific OTC products.
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-teal-100 shadow-premium transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Inquiry</span>
                  <a href={`mailto:${siteConfig.email}`} className="text-base font-bold text-teal-700 hover:underline">
                    {siteConfig.email}
                  </a>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    For corporate queries, medical billing invoices, or chronic medication subscription requests.
                  </p>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-teal-100 shadow-premium transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Store Timings</span>
                  <div className="flex flex-col text-xs text-slate-800 font-semibold gap-1">
                    {siteConfig.timings.map((time, i) => (
                      <div key={i} className="flex justify-between gap-6">
                        <span className="text-slate-500 font-normal">{time.day}:</span>
                        <span>{time.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form Card */}
            <div className="contact-reveal lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-premium-lg flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Online Inquiry Portal
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Fill out the form below. Once received, our registered druggists will review and contact you.
              </p>
              
              <Suspense fallback={<div className="h-96 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-teal-700" /></div>}>
                <ContactForm />
              </Suspense>
            </div>

          </div>
        </div>
      </section>

      {/* Large Full-Width Google Maps Map Section */}
      <section className="contact-reveal w-full h-[450px] border-t border-slate-200">
        <iframe
          src={siteConfig.googleMapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Noor Medico Physical Location Mumbra Map"
        />
      </section>

    </div>
  );
}
