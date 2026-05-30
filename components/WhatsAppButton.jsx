"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
        >
          {/* Gentle tooltip callout */}
          <div className="hidden sm:flex bg-white px-3.5 py-1.5 rounded-full shadow-premium border border-slate-100 text-xs font-semibold text-slate-700 items-center gap-1.5 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Prescription Inquiry</span>
          </div>

          {/* Pulsing button */}
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-105 hover:bg-[#20ba5a] transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
          >
            {/* Ping animation rings */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10" />

            <svg
              className="w-7 h-7 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.49 5.357 1.491 5.482 0 9.943-4.463 9.947-9.95.002-2.657-1.02-5.155-2.879-7.017-1.86-1.86-4.363-2.883-7.025-2.884-5.485 0-9.947 4.465-9.952 9.954-.002 2.032.531 4.022 1.547 5.765l-.995 3.637 3.733-.979zm11.367-7.63c-.301-.15-1.785-.88-2.062-.98-.277-.1-.478-.15-.678.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.651.075-.302-.15-1.272-.469-2.423-1.495-.896-.799-1.5-1.787-1.275-2.164.225-.377.225-.58.375-.73.15-.15.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.678-1.635-.93-2.245-.244-.589-.493-.509-.678-.519-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8 0-.275-.3-.775-1.202-1.075-1.928-.275-.663-.525-.575-.725-.588l-.525-.01c-.175 0-.45.075-.7.325-.25.25-1 .975-1 2.375s1.025 2.75 1.175 2.95c.15.2 2.025 3.1 4.905 4.35.685.298 1.22.476 1.638.608.688.219 1.31.189 1.802.115.55-.08 1.685-.69 1.922-1.355.238-.665.238-1.23.167-1.35-.07-.12-.275-.197-.575-.347z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
