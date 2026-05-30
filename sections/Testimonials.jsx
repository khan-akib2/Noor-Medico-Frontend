"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { siteConfig } from "@/config/site";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".testimonials-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".testimonials-header",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Grid items reveal
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".testimonials-grid",
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
      className="py-20 md:py-28 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="testimonials-header text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full self-center">
            Customer Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hear from our Patients & Clinical Partners
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            The health and satisfaction of our patients are our ultimate rewards. Read about their experiences with Noor Medico.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonial-card bg-white rounded-3xl p-8 border border-slate-100 shadow-premium hover:shadow-premium-lg transition-shadow duration-300 relative flex flex-col gap-6"
            >
              {/* Quote Icon overlay */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-teal-500/10 pointer-events-none" />

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-600 text-sm leading-relaxed italic flex-grow">
                "{item.content}"
              </p>

              {/* Author Info */}
              <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                {/* Clean avatar initials placeholder */}
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center shrink-0">
                  {item.name.split(" ").map(w => w[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-950">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
