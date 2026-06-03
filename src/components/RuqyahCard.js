import React from 'react';

export default function RuqyahCard({ session, onCardClick, onBookClick, className = "", ...props }) {
  return (
    <div
      onClick={onCardClick}
      className={`bg-gradient-to-b from-white via-white to-emerald-50/15 border border-slate-200/60 rounded-3xl p-3 sm:p-5 hover:shadow-[0_30px_60px_-15px_rgba(4,120,87,0.12)] hover:border-emerald-500/25 hover:-translate-y-2.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${className}`}
      {...props}
    >
      <div>
        {/* Cover Image */}
        {session.image && (
          <div className="h-28 sm:h-44 w-full overflow-hidden rounded-2xl relative mb-3 sm:mb-5 border border-slate-100 shadow-inner">
            <img
              src={session.image}
              alt={session.title}
              draggable="false"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Card Header Tag Row */}
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
          <span className={`text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-sm ${
            session.category === "Basic"
              ? "bg-emerald-50 text-emerald-800 border-emerald-100"
              : session.category === "Diagnosis"
                ? "bg-amber-50 text-amber-800 border-amber-100"
                : session.category === "Follow-up"
                  ? "bg-indigo-50 text-indigo-800 border-indigo-100"
                  : "bg-rose-50 text-rose-800 border-rose-100"
          }`}>
            {session.category}
          </span>
          <span className="text-xs text-slate-400 font-extrabold flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {session.duration}
          </span>
        </div>

        <h3 className="font-black text-base sm:text-xl text-slate-800 group-hover:text-emerald-800 transition-colors duration-300">
          {session.title}
        </h3>
        <p className="text-[10px] sm:text-xs text-emerald-700 font-extrabold mt-0.5 tracking-wide">
          {session.bengaliTitle}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-2.5 sm:mt-3.5 leading-relaxed font-medium line-clamp-3">
          {session.desc}
        </p>
      </div>

      <div className="mt-6 sm:mt-8 pt-3 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-black block tracking-wider leading-none">
            Session Charge
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-800 tracking-tight block mt-1">
            {session.price}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookClick(session);
          }}
          className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white font-bold text-[10px] sm:text-xs px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(4,120,87,0.15)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.25)] active:scale-[0.97] uppercase tracking-wider"
        >
          Book Session
        </button>
      </div>
    </div>
  );
}
