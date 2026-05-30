"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import ServiceCard from "@/components/ServiceCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesOverview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".services-header",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".services-header",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Grid items reveal
      gsap.fromTo(
        ".service-card-wrapper",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Show only 4 primary services on Home page
  const featuredServices = siteConfig.services.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="services-header text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full self-center">
            Comprehensive Pharmacy Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Medical Care Services Under One Roof
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            From critical care prescription medications to regular blood pressure monitor supplies, we cater to all your healthcare requirements.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredServices.map((service) => (
            <div key={service.id} className="service-card-wrapper">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-6">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wide transition-all shadow-md gap-2 group"
          >
            <span>Explore All 8 Core Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
