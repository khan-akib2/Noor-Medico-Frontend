"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, HeartPulse } from "lucide-react";
import { siteConfig } from "@/config/site";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in hero text elements
      gsap.fromTo(
        ".hero-text-item",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Scale in hero image container
      gsap.fromTo(
        ".hero-image-wrapper",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", delay: 0.3 }
      );

      // Floating micro-animation for the medical card overlay
      gsap.to(".floating-card", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-teal-50/40 via-white to-slate-50/50 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
    >
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 dot-grid opacity-30 -z-10" />
      <div className="absolute top-1/4 left-1/3 w-[30rem] h-[30rem] rounded-full bg-teal-300/10 blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-300/10 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Block (7 cols on large screens) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            {/* Soft badge */}
            <div className="hero-text-item inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start bg-teal-50 px-4 py-1.5 rounded-full border border-teal-100/80">
              <HeartPulse className="w-4.5 h-4.5 text-teal-700 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Registered Chemist & Druggist
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-text-item text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-none">
              Your Health, Our Priority. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                100% Genuine Medicines.
              </span>
            </h1>

            {/* Subheading */}
            <p className="hero-text-item text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Noor Medico provides verified pharmaceutical products, specialized cold-chain insulins, daily wellness essentials, and registered pharmacist counsel right in Koparkhairane.
            </p>

            {/* Trust Badges */}
            <div className="hero-text-item flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 py-2 text-sm text-slate-700 font-semibold">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>FDA Compliant Sourcing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Registered Pharmacists</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-text-item flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold tracking-wide transition-all shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 group"
              >
                <span>Order via WhatsApp</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold tracking-wide transition-all border border-slate-200 shadow-sm"
              >
                <span>Explore Services</span>
              </Link>
            </div>
          </div>

          {/* Right Imagery Block (5 cols on large screens) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="hero-image-wrapper relative w-full max-w-md lg:max-w-none aspect-square">
              {/* Outer glowing background ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/20 to-emerald-500/10 rounded-[2.5rem] blur-xl -z-10" />

              {/* Main Image frame */}
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-premium-lg relative bg-teal-100/20">
                <Image
                  src="/images/hero_pharmacist.png"
                  alt="Noor Medico Pharmacy Team"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-w-7xl) 100vw, 40vw"
                />
              </div>

              {/* Float Card 1: Insulin Cold Storage reminder */}
              <div className="floating-card absolute -left-6 bottom-16 bg-white px-5 py-4 rounded-2xl shadow-premium border border-slate-100/80 flex items-center gap-3.5 max-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <span className="text-xl">❄️</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Cold Chain Storage</span>
                  <span className="text-[10px] text-slate-500 font-medium">Insulin & Vaccines kept between 2-8°C</span>
                </div>
              </div>

              {/* Float Card 2: Phone quick support */}
              <div className="floating-card absolute -right-4 top-16 bg-white px-5 py-4 rounded-2xl shadow-premium border border-slate-100/80 flex items-center gap-3.5 max-w-[200px] delay-500">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">Need Medicines?</span>
                  <span className="text-[10px] text-emerald-700 font-bold">Call: 8828081398</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
