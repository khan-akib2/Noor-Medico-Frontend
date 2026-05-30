"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-300 ${
              isOpen
                ? "border-teal-200 bg-teal-50/20 shadow-premium"
                : "border-slate-100 bg-white hover:border-slate-200"
            }`}
          >
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 focus:outline-none select-none gap-4"
            >
              <span className={`text-base md:text-lg transition-colors ${isOpen ? "text-teal-800" : "text-slate-800"}`}>
                {item.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen ? "bg-teal-700 text-white rotate-180" : "bg-slate-50 text-slate-500"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-5 pt-1 text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-100/50 mt-1">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
