"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  X,
  FileText,
  Send,
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Client-side image compression helper
const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.6) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function ContactQuick() {
  const containerRef = useRef(null);
  
  // Interactive Tab State: 'whatsapp' | 'prescription' | 'typed'
  const [activeTab, setActiveTab] = useState("whatsapp");
  
  // Form State
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // File Upload State
  const fileInputRef = useRef(null);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [prescriptionBase64, setPrescriptionBase64] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Preset Chips
  const presetChips = [
    "Check Stock of BP Medicines",
    "Price of Insulin Options",
    "Baby Diapers / Formula",
    "Chronic Refill Price Quote"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form and details panels slide in
      gsap.fromTo(
        ".cq-slide-left",
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".cq-section",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(
        ".cq-slide-right",
        { opacity: 0, x: 35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".cq-section",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = async (file) => {
    setUploadError("");
    if (!file) return;

    const isValidType = file.type.startsWith("image/") || file.type === "application/pdf";
    if (!isValidType) {
      setUploadError("Only images (PNG, JPG, JPEG) or PDF documents are supported.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size exceeds 10MB limit.");
      return;
    }

    setPrescriptionFile(file);

    try {
      if (file.type.startsWith("image/")) {
        // Compress image to ensure it's lightweight (approx 100-200kb)
        const compressedBase64 = await compressImage(file, 800, 800, 0.6);
        setPrescriptionBase64(compressedBase64);
      } else {
        // Handle PDF via regular filereader Base64 encoding
        const base64 = await fileToBase64(file);
        setPrescriptionBase64(base64);
      }
    } catch (err) {
      console.error(err);
      setUploadError("Unable to process file. Please try another image.");
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const removeFile = () => {
    setPrescriptionFile(null);
    setPrescriptionBase64("");
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePresetChipClick = (chip) => {
    setFormData((prev) => {
      const currentMsg = prev.message.trim();
      const separator = currentMsg ? "\n" : "";
      return {
        ...prev,
        message: `${currentMsg}${separator}Inquire about: ${chip}`
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    let submissionMessage = formData.message;
    
    // Inject the uploaded image or PDF download button dynamically inside the email content
    if (activeTab === "prescription") {
      const notes = formData.message.trim() ? formData.message : "No extra notes provided.";
      if (prescriptionFile?.type === "application/pdf") {
        submissionMessage = `[PRESCRIPTION PDF UPLOADED]\nNotes: ${notes}\n\n<div style="margin-top: 15px;"><a href="${prescriptionBase64}" download="prescription.pdf" style="display: inline-block; padding: 12px 24px; background-color: #0f766e; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(15, 118, 110, 0.2);">Download & View Prescription PDF</a></div>`;
      } else {
        submissionMessage = `[PRESCRIPTION IMAGE UPLOADED]\nNotes: ${notes}\n\n<div style="margin-top: 15px;"><p style="font-weight: bold; color: #0f766e; margin-bottom: 6px;">Uploaded Prescription Copy:</p><img src="${prescriptionBase64}" style="max-width: 100%; max-height: 400px; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);" alt="Prescription Image" /></div>`;
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: submissionMessage
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });
        removeFile();
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
    <section
      ref={containerRef}
      className="cq-section py-20 md:py-28 bg-slate-50 border-t border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Quick Details & Map Preview */}
          <div className="cq-slide-left lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full self-start">
                Get in Touch
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Quick Medical Store Inquiry
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Have a prescription query, pricing request, or looking for a specific medicine? Contact us and our pharmacist will respond promptly.
              </p>
            </div>

            {/* Timings and Details Cards */}
            <div className="flex flex-col gap-4">
              {/* Address */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-premium">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Our Store Address</span>
                  <span className="text-xs font-semibold text-slate-800 leading-relaxed mt-0.5">{siteConfig.address}</span>
                </div>
              </div>

              {/* Call Now */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-premium">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone Support</span>
                  <a href={`tel:${siteConfig.phone}`} className="text-sm font-bold text-teal-800 hover:text-teal-900 leading-relaxed mt-0.5">
                    {siteConfig.formattedPhone} (24/7 Calls)
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-premium">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operating Timings</span>
                  <span className="text-xs font-semibold text-slate-800 leading-relaxed mt-0.5">
                    Mon - Sat: 8 AM - 11 PM | Sun: 9 AM - 9 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Google Map Embedded preview */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <iframe
                src={siteConfig.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Noor Medico Location Map"
              />
            </div>
          </div>

          {/* Right Column: Modern Interactive Tabbed Portal */}
          <div className="cq-slide-right lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-premium-lg flex flex-col justify-start min-h-[500px]">
            
            {/* Header Titles */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">
                Prescription & Stock Check
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Choose the fastest option below to inquire about your medicines.
              </p>
            </div>

            {/* Custom Sliding Tab Selector */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-8 relative border border-slate-200/50">
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => {
                  setActiveTab("whatsapp");
                  setSuccess(false);
                  setError("");
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${
                  activeTab === "whatsapp"
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200/30"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.49 5.357 1.491 5.482 0 9.943-4.463 9.947-9.95.002-2.657-1.02-5.155-2.879-7.017-1.86-1.86-4.363-2.883-7.025-2.884-5.485 0-9.947 4.465-9.952 9.954-.002 2.032.531 4.022 1.547 5.765l-.995 3.637 3.733-.979zm11.367-7.63c-.301-.15-1.785-.88-2.062-.98-.277-.1-.478-.15-.678.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.651.075-.302-.15-1.272-.469-2.423-1.495-.896-.799-1.5-1.787-1.275-2.164.225-.377.225-.58.375-.73.15-.15.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.678-1.635-.93-2.245-.244-.589-.493-.509-.678-.519-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8 0-.275-.3-.775-1.202-1.075-1.928-.275-.663-.525-.575-.725-.588l-.525-.01c-.175 0-.45.075-.7.325-.25.25-1 .975-1 2.375s1.025 2.75 1.175 2.95c.15.2 2.025 3.1 4.905 4.35.685.298 1.22.476 1.638.608.688.219 1.31.189 1.802.115.55-.08 1.685-.69 1.922-1.355.238-.665.238-1.23.167-1.35-.07-.12-.275-.197-.575-.347z"/>
                </svg>
                <span>WhatsApp Direct</span>
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => {
                  setActiveTab("prescription");
                  setSuccess(false);
                  setError("");
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${
                  activeTab === "prescription"
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200/30"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <UploadCloud className="w-4 h-4 text-teal-600" />
                <span>Upload Rx</span>
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => {
                  setActiveTab("typed");
                  setSuccess(false);
                  setError("");
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 ${
                  activeTab === "typed"
                    ? "bg-white text-teal-800 shadow-sm border border-slate-200/30"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <span>Type List</span>
              </button>
            </div>

            {/* Form Alert Banners */}
            {success && (
              <div className="flex items-start gap-3 p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 text-sm mb-6 transition-all animate-fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <span className="font-bold">Inquiry Sent Successfully!</span>
                  <p className="text-xs text-emerald-700/90 mt-0.5">We have received your medical inquiry details. A registered pharmacist will reach out to you within a few minutes.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-3 p-4 bg-rose-50 text-rose-800 rounded-2xl border border-rose-100 text-sm mb-6 transition-all animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <span className="font-bold">Submission Failed</span>
                  <p className="text-xs text-rose-700/90 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 1. WHATSAPP DIRECT (ZERO FRICTION) */}
            {activeTab === "whatsapp" && (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4 gap-6 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 flex-1">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 relative">
                  <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.49 5.357 1.491 5.482 0 9.943-4.463 9.947-9.95.002-2.657-1.02-5.155-2.879-7.017-1.86-1.86-4.363-2.883-7.025-2.884-5.485 0-9.947 4.465-9.952 9.954-.002 2.032.531 4.022 1.547 5.765l-.995 3.637 3.733-.979zm11.367-7.63c-.301-.15-1.785-.88-2.062-.98-.277-.1-.478-.15-.678.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.651.075-.302-.15-1.272-.469-2.423-1.495-.896-.799-1.5-1.787-1.275-2.164.225-.377.225-.58.375-.73.15-.15.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.678-1.635-.93-2.245-.244-.589-.493-.509-.678-.519-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8 0-.275-.3-.775-1.202-1.075-1.928-.275-.663-.525-.575-.725-.588l-.525-.01c-.175 0-.45.075-.7.325-.25.25-1 .975-1 2.375s1.025 2.75 1.175 2.95c.15.2 2.025 3.1 4.905 4.35.685.298 1.22.476 1.638.608.688.219 1.31.189 1.802.115.55-.08 1.685-.69 1.922-1.355.238-.665.238-1.23.167-1.35-.07-.12-.275-.197-.575-.347z"/>
                  </svg>
                  <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-25" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h4 className="text-lg font-bold text-slate-800">Skip the Forms Entirely</h4>
                  <p className="text-slate-500 text-xs md:text-sm max-w-sm mx-auto leading-relaxed">
                    Instantly send a photo of your prescription list, drug box, or typed text directly to our WhatsApp support line for verification.
                  </p>
                </div>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/10 hover:shadow-xl hover:shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* TAB CONTENT: 2. PRESCRIPTION UPLOAD */}
            {activeTab === "prescription" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                
                {/* Drag and Drop Box */}
                {!prescriptionBase64 ? (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files[0];
                      if (file) handleFile(file);
                    }}
                    onClick={() => fileInputRef.current.click()}
                    className={`border-2 border-dashed rounded-2xl p-7 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? "border-teal-600 bg-teal-50/30"
                        : "border-slate-200 hover:border-teal-500 hover:bg-teal-50/5"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) handleFile(file);
                      }}
                      accept="image/*,application/pdf"
                      className="hidden"
                    />
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 mb-3">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      Upload Prescription Photo
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 max-w-[250px] leading-normal">
                      Drag & drop image/PDF or click to snap with your mobile camera
                    </span>
                  </div>
                ) : (
                  /* Upload Preview Card */
                  <div className="relative rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 p-3 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-white relative shrink-0 flex items-center justify-center">
                      {prescriptionFile?.type === "application/pdf" ? (
                        <FileText className="w-8 h-8 text-rose-500" />
                      ) : (
                        <img
                          src={prescriptionBase64}
                          alt="Prescription preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {prescriptionFile?.name}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {(prescriptionFile?.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={removeFile}
                      className="w-8 h-8 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center shadow-sm transition-colors"
                      aria-label="Remove uploaded prescription"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {uploadError && (
                  <span className="text-xs font-semibold text-rose-600 -mt-2 block">
                    {uploadError}
                  </span>
                )}

                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="p-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="p-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Name"
                      className="w-full px-4.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="p-phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="p-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone number"
                      className="w-full px-4.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Optional Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="p-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 text-sm font-medium transition-all"
                  />
                </div>

                {/* Notes/Comments */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="p-message" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Inquiry Notes (Optional)
                  </label>
                  <textarea
                    id="p-message"
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="E.g., Please check substitute options, dosage schedules..."
                    className="w-full px-4.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 text-sm font-medium transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading || !prescriptionBase64}
                  className="w-full py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none select-none cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Prescription...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Prescription</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB CONTENT: 3. TYPE MEDICINE LIST */}
            {activeTab === "typed" && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
                
                {/* Preset Fast Chips */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Tap to auto-insert inquiry preset:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {presetChips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => handlePresetChipClick(chip)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200/60 hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50/30 text-slate-500 rounded-xl text-xs font-semibold transition-all duration-200 select-none"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="t-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="t-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Name"
                      className="w-full px-4.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="t-phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="t-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Phone number"
                      className="w-full px-4.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Optional Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="t-email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="t-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full px-4.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 text-sm font-medium transition-all"
                  />
                </div>

                {/* Message TextArea */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="t-message" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Inquiry Message / Medicine List
                  </label>
                  <textarea
                    id="t-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Type your medicine requirements, power details, or health inquiries here..."
                    className="w-full px-4.5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 text-sm font-medium transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:bg-slate-300 disabled:shadow-none select-none cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>Submit Online Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
