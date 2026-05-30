import Link from "next/link";
import Image from "next/image";
import { Pill, Phone, Mail, MapPin, Clock, ArrowRight, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700 flex items-center justify-center bg-white shadow-md shadow-teal-500/10 group-hover:scale-105 transition-transform duration-300 relative shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Noor Medico Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider -mt-1">
                  Chemist & Druggist
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Serving our community with 100% authentic pharmacy supplies, specialized clinical storage, and expert pharmacists' guidance.
            </p>
            {/* Quick Contact Info */}
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-4.5 h-4.5 text-teal-500 shrink-0" />
                <span>{siteConfig.formattedPhone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4.5 h-4.5 text-teal-500 shrink-0" />
                <span>{siteConfig.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-teal-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  <span>Our Services</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  <span>Contact & Support</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Services Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Our Pharmacy Services
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm">
              {siteConfig.services.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 group-hover:scale-150 transition-transform duration-200" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors flex items-center gap-1 group mt-2"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Hours Column */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Store Timings
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                <Clock className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-2">
                  {siteConfig.timings.map((time, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[11px] font-semibold text-teal-400 uppercase tracking-wider">
                        {time.day}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        {time.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                * Note: Timings may vary slightly on public holidays. Please call ahead to confirm specialized items.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Copyright Bar */}
      <div className="border-t border-slate-800 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Registered Chemist & Druggist.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span>Designed with care for human health</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
