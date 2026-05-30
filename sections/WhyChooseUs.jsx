"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Snowflake, HeartHandshake, Award } from "lucide-react";
import { siteConfig } from "@/config/site";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo(
        ".wcu-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".wcu-header",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Reveal features cards
      gsap.fromTo(
        ".wcu-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".wcu-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate stats values (counters)
      const stats = gsap.utils.toArray(".stat-value");
      stats.forEach((stat) => {
        const targetValue = stat.getAttribute("data-target");
        // Check if there is a plus sign or percentage
        const cleanVal = targetValue.replace(/[^0-9]/g, "");
        const suffix = targetValue.replace(/[0-9]/g, "");
        const obj = { val: 0 };

        gsap.to(obj, {
          val: parseInt(cleanVal, 10),
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            stat.textContent = Math.floor(obj.val) + suffix;
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Map icons dynamically
  const icons = [ShieldCheck, Snowflake, HeartHandshake, Award];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white border-y border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="wcu-header text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full self-center">
            Uncompromising Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Healthcare Professionals & Families Trust Noor Medico
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            We hold ourselves to the highest standards of safety, authenticity, and pharmacist vigilance, ensuring you get exactly what your doctor prescribed.
          </p>
        </div>

        {/* Value Proposition Cards Grid */}
        <div className="wcu-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {siteConfig.whyChooseUs.map((item, index) => {
            const Icon = icons[index] || ShieldCheck;
            return (
              <div
                key={index}
                className="wcu-card bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-teal-100 hover:bg-white shadow-premium-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-teal-700 flex items-center justify-center mb-6 shadow-sm group-hover:bg-teal-700 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Numerical Counter Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 bg-teal-800 rounded-[2.5rem] p-10 md:p-16 text-white shadow-premium-lg relative overflow-hidden">
          {/* Background overlay design */}
          <div className="absolute inset-0 dot-grid opacity-10" />
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 blur-2xl" />

          {siteConfig.stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2 relative z-10">
              <span
                className="stat-value text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-300"
                data-target={stat.value}
              >
                0%
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-teal-100">
                {stat.label}
              </span>
              <span className="text-[10px] sm:text-xs text-teal-200/80 leading-relaxed font-medium max-w-[180px] hidden sm:inline">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
