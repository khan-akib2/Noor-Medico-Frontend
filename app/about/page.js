"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pill, ShieldAlert, Award, Heart, ShieldCheck, Milestone, Compass, HeartHandshake } from "lucide-react";
import { siteConfig } from "@/config/site";
import gsap from "gsap";

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );

      // Simple hover cards scaling
      gsap.set(".value-card", { transformOrigin: "center center" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      title: "Our Mission",
      desc: "To deliver 100% authentic, high-quality healthcare products and medicines with professional guidance, ensuring the health and peace of mind of every customer in our community.",
      icon: Compass,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-700"
    },
    {
      title: "Our Vision",
      desc: "To become Thane's most trusted, digital-forward health partner—redefining community pharmacy care through strict quality compliance, modern storage, and clinical empathy.",
      icon: Milestone,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-700"
    },
    {
      title: "Our Core Value",
      desc: "Human health above commercial interest. We maintain absolute ethical standards in drug sourcing, customer safety, transparent pricing, and professional medical storage.",
      icon: HeartHandshake,
      bgColor: "bg-sky-50",
      iconColor: "text-sky-700"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen">
      
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-teal-50/40 via-teal-50/10 to-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <span className="about-reveal text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full self-center">
            Who We Are
          </span>
          <h1 className="about-reveal text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About {siteConfig.name}
          </h1>
          <p className="about-reveal text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A premium chemist & druggist built on the pillars of absolute medicine authenticity, state-of-the-art clinical storage, and warm community care.
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-16 md:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Text */}
            <div className="about-reveal lg:col-span-7 flex flex-col gap-6">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                A Trusted Legacy of Pharmaceutical Care
              </h2>
              
              <div className="flex flex-col gap-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Established as a premier medical store, <strong>NOOR MEDICO</strong> has grown to become the neighborhood's first choice for authentic prescription medicines, wellness supplies, and specialist healthcare devices.
                </p>
                <p>
                  We believe that a pharmacy is more than just a retail counter. It is a critical component of the healthcare system. That is why we strictly buy directly from corporate pharmaceutical networks, eliminating trade brokers who might introduce sub-standard or counterfeit drugs.
                </p>
                <p>
                  Our storefront in Mumbra, Thane is equipped with high-end clinical refrigerators, double backup power grids, and digital temperature sensors, ensuring temperature-sensitive medications like insulins, thyroid hormones, and vaccines remain highly active and potent.
                </p>
              </div>

              {/* Little trust metrics */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-teal-700">100%</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Genuine Medicines</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-emerald-600">2-8°C</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cold Chain Insured</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-slate-900">88280...</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Emergency Line</span>
                </div>
              </div>
            </div>

            {/* Story Image Frame */}
            <div className="about-reveal lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 shadow-premium-lg p-4 bg-white">
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-50">
                  <Image
                    src="/images/about_storefront.png"
                    alt="Noor Medico Storefront Counter"
                    fill
                    className="object-cover"
                    sizes="(max-w-7xl) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission, Vision, and Values */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full self-center">
              Our Foundations
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Guided by Core Medical Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, index) => {
              const Icon = val.icon;
              return (
                <div
                  key={index}
                  className="value-card bg-white rounded-3xl p-8 border border-slate-100 shadow-premium relative flex flex-col gap-6 hover:shadow-premium-lg transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl ${val.bgColor} ${val.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-slate-950">{val.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Community Trust CTA */}
      <section className="py-20 bg-teal-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-6 relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Need Expert Health Guidance or Prescription verification?
          </h2>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Our qualified pharmacy team is ready to double-check your prescription compatibility and dosage guidelines. Reach out to us directly or visit our Mumbra branch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold tracking-wide transition-all shadow-md group"
            >
              <span>Consult on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold tracking-wide transition-all"
            >
              <span>Contact Details</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
