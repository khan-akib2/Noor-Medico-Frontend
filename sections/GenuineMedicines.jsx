"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Check, ShieldCheck, HeartPulse, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GenuineMedicines() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side text reveal
      gsap.fromTo(
        ".genuine-text-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".genuine-section",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Right side image scaling reveal
      gsap.fromTo(
        ".genuine-image-card",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".genuine-section",
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const checkpoints = [
    {
      title: "Direct Distributor Sourcing",
      desc: "We completely bypass open-market wholesalers and trade brokers, sourcing 100% of our products directly from authorized corporate drug distribution networks."
    },
    {
      title: "Active Cold Chain Monitoring",
      desc: "Biomedical refrigerators are fitted with continuous data logger sensors to guarantee storage standards for sensitive vaccines, growth hormones, and insulins."
    },
    {
      title: "Registered Pharmacist Supervision",
      desc: "Every single order and doctor's prescription is verified manually by a registered pharmacist to check for compatibility, correct dosage, and proper labelling."
    },
    {
      title: "Strict Expiry Management System",
      desc: "Our automated inventory alert system monitors batch expiries months in advance, completely eliminating the risk of near-expiry medicine distribution."
    }
  ];

  return (
    <section
      ref={containerRef}
      className="genuine-section py-20 md:py-28 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="genuine-text-item inline-flex items-center gap-2 self-start bg-teal-100/50 px-3.5 py-1.5 rounded-full border border-teal-200">
              <ShieldCheck className="w-4 h-4 text-teal-800" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Quality Assurance Guarantee
              </span>
            </div>
            
            <h2 className="genuine-text-item text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              100% Genuine Medicines. Zero Compromises.
            </h2>
            
            <p className="genuine-text-item text-slate-600 text-sm sm:text-base leading-relaxed">
              When it comes to healthcare, authenticity is not an option—it is a critical necessity. At Noor Medico, we maintain an uncompromising chain of custody for every medical supply, diagnostic kit, and prescription bottle that leaves our store.
            </p>

            {/* Structured checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {checkpoints.map((point, index) => (
                <div key={index} className="genuine-text-item flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      {point.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Imagery Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="genuine-image-card relative w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 shadow-premium-lg bg-white p-4">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                <Image
                  src="/images/cold_chain.png"
                  alt="Noor Medico Cold Chain Refrigerator"
                  fill
                  className="object-cover"
                  sizes="(max-w-7xl) 100vw, 33vw"
                />
                
                {/* Visual Overlay Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/50 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                      Medical Storage Temp
                    </span>
                  </div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                    2.0°C - 8.0°C
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
