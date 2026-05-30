import * as Icons from "lucide-react";
import Link from "next/link";

export default function ServiceCard({ service }) {
  const { id, title, shortDesc, description, icon, highlights } = service;
  // Dynamically resolve icon from Lucide React
  const IconComponent = Icons[icon] || Icons.Pill;

  return (
    <div
      id={id}
      className="scroll-mt-24 flex flex-col bg-white rounded-3xl p-8 border border-slate-100 shadow-premium shadow-premium-hover relative overflow-hidden group"
    >
      {/* Background soft glow gradient */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-6 group-hover:bg-teal-700 group-hover:text-white transition-all duration-300">
        <IconComponent className="w-7 h-7" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-800 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* Highlights Checklist */}
      <div className="border-t border-slate-100 pt-5 mt-auto">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Key Highlights
        </h4>
        <ul className="flex flex-col gap-2">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Action */}
      <div className="mt-6 flex justify-end">
        <Link
          href={`/contact?subject=Inquiry%20regarding%20${encodeURIComponent(title)}`}
          className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 group/btn"
        >
          <span>Request Info</span>
          <Icons.ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
