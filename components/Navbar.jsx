"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Pill, Phone, Menu, X, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Services", href: "/services" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glassmorphism py-3 shadow-premium"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-teal-100/50 flex items-center justify-center bg-white shadow-md shadow-teal-600/10 group-hover:scale-105 transition-transform duration-300 relative shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Noor Medico Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors duration-300">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-teal-600 font-semibold uppercase tracking-wider -mt-1">
                  Chemist & Druggist
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive(link.href)
                      ? "text-teal-700 font-semibold"
                      : "text-slate-600 hover:text-teal-600"
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="activeNavBorder"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-600 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-slate-700 hover:text-teal-600 font-semibold text-sm transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{siteConfig.formattedPhone}</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold tracking-wide transition-all duration-300 shadow-md shadow-teal-700/10 hover:shadow-lg hover:shadow-teal-700/20 gap-1.5 group"
              >
                <span>Inquire Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl md:hidden text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Menu container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-8">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-teal-100 relative bg-white shrink-0">
                      <Image
                        src="/images/logo.png"
                        alt="Noor Medico Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-slate-900">{siteConfig.name}</span>
                  </div>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium px-3 py-2 rounded-xl transition-all ${
                        isActive(link.href)
                          ? "bg-teal-50 text-teal-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-teal-600"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Footer contact info inside mobile drawer */}
              <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-5 h-5 text-teal-600" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-medium">Call Us Now</span>
                    <span className="text-sm font-semibold">{siteConfig.formattedPhone}</span>
                  </div>
                </a>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-center transition-colors shadow-md shadow-teal-700/10"
                >
                  <span>Get In Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
