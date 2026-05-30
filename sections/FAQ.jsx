"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import FAQAccordion from "@/components/FAQAccordion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FAQ() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".faq-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Accordion container reveal
      gsap.fromTo(
        ".faq-accordion-container",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".faq-accordion-container",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="faq-header text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full self-center">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Find quick answers to common questions about our prescription policies, store hours, cold chain storage, and custom medicine ordering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-container">
          <FAQAccordion items={siteConfig.faqs} />
        </div>

      </div>
    </section>
  );
}
