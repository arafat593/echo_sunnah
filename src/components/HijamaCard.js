import React from 'react';
import Image from 'next/image';

export default function HijamaCard({ pkg, onCardClick, onBookClick, className = "", ...props }) {
  return (
    <div
      onClick={onCardClick}
      className={`bg-gradient-to-b from-white via-white to-emerald-50/15 border border-slate-200/60 rounded-3xl p-3 sm:p-5 hover:shadow-[0_30px_60px_-15px_rgba(4,120,87,0.12)] hover:border-emerald-500/25 hover:-translate-y-2.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${className}`}
      {...props}
    >
      <div>
        {/* Package Cover Image with badges */}
        <div className="h-28 sm:h-44 w-full overflow-hidden rounded-2xl relative mb-3 sm:mb-5 border border-slate-100 shadow-inner">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            sizes="(max-width: 768px) 100vw, 350px"
            draggable="false"
            className="object-cover group-hover:scale-105 transition-transform duration-500 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

          {/* Floating Badge Tag over Image */}
          <div className={`absolute top-3.5 right-3.5 text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-sm ${
            pkg.id.includes("dry")
              ? "bg-amber-50/90 text-amber-850 border-amber-250/20"
              : pkg.id.includes("wet")
                ? "bg-rose-50/90 text-rose-850 border-rose-250/20"
                : pkg.id.includes("mov")
                  ? "bg-teal-50/90 text-teal-850 border-teal-250/20"
                  : pkg.id.includes("fir")
                    ? "bg-orange-50/90 text-orange-850 border-orange-250/20"
                    : "bg-emerald-50/90 text-emerald-850 border-emerald-250/20"
          }`}>
            {pkg.badge}
          </div>

          {/* SVG Icon Circle over Image */}
          <div className="absolute bottom-3.5 left-3.5 w-8.5 h-8.5 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200/40 flex items-center justify-center shadow-md">
            <span className="text-emerald-700">
              {pkg.id.includes("dry") ? (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <circle cx="12" cy="14" r="5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9V4m-2 0h4" />
                </svg>
              ) : pkg.id.includes("wet") ? (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043a3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
              ) : pkg.id.includes("mov") ? (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : pkg.id.includes("fir") ? (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
                </svg>
              )}
            </span>
          </div>
        </div>

        <h3 className="font-black text-base sm:text-xl text-slate-800 group-hover:text-emerald-800 transition-colors duration-300">{pkg.title}</h3>
        <p className="text-[10px] sm:text-xs text-emerald-700 font-extrabold mt-0.5 tracking-wide">{pkg.bengaliTitle}</p>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-3.5 leading-relaxed font-medium line-clamp-2">{pkg.desc}</p>

        <ul className="hidden sm:block mt-5 space-y-3">
          {pkg.features.map((feat, idx) => (
            <li key={idx} className="flex items-center gap-3 text-xs text-slate-655 font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-emerald-600">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 sm:mt-8 pt-3 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold line-through block leading-none tracking-wide">{pkg.originalPrice}</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-800 tracking-tight">{pkg.price}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookClick(pkg);
          }}
          className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white font-bold text-[10px] sm:text-xs px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(4,120,87,0.15)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.25)] active:scale-[0.97] uppercase tracking-wider"
        >
          Quick Book
        </button>
      </div>
    </div>
  );
}
