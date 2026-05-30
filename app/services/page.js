"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Pill, MessageSquare, Phone, CheckCircle, ArrowRight, ClipboardCheck, UserCog, CalendarClock } from "lucide-react";
import { siteConfig } from "@/config/site";
import ServiceCard from "@/components/ServiceCard";
import gsap from "gsap";

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header elements reveal
      gsap.fromTo(
        ".services-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Upload Prescription",
      desc: "Take a clear picture of your doctor's valid prescription and send it directly to our verified WhatsApp number or fill out our online inquiry form.",
      icon: ClipboardCheck,
      stepNum: "01"
    },
    {
      title: "Pharmacist Verification",
      desc: "Our registered in-store pharmacists will carefully verify the dosage, check for drug compatibility, and calculate pricing for you.",
      icon: UserCog,
      stepNum: "02"
    },
    {
      title: "Ready for Pickup",
      desc: "We will prepare the order under proper clinical storage guidelines and alert you. You can pick it up at your convenience or coordinate a delivery.",
      icon: CalendarClock,
      stepNum: "03"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-teal-50/40 via-teal-50/10 to-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <span className="services-reveal text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full self-center">
            Chemist Catalog
          </span>
          <h1 className="services-reveal text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Professional Pharmacy Services
          </h1>
          <p className="services-reveal text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            From life-saving cardiology drugs and cold-chain insulin preservation to certified digital wellness monitors, explore our dedicated services.
          </p>
        </div>
      </section>

      {/* Services Grid (8 Services) */}
      <section className="py-16 md:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {siteConfig.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Order Workflow Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full self-center">
              Simple & Secure
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Order Your Medicines
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Skip the long queues. Follow these simple steps to coordinate your pharmaceutical products safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium relative flex flex-col gap-6"
                >
                  {/* Step Badge */}
                  <span className="absolute top-6 right-6 text-3xl font-extrabold text-teal-100 select-none">
                    {step.stepNum}
                  </span>

                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <StepIcon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-slate-950">{step.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Upload/Emergency Callout banner */}
      <section className="py-20 bg-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Have a prescription ready? Send it to our WhatsApp!
          </h2>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Our digital verification desk is open. Upload your prescription now and our registered pharmacist will verify details, pricing, and confirm pick-up timings in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold tracking-wide transition-all shadow-md"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Send via WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold tracking-wide transition-all"
            >
              <span>Submit via Form</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
