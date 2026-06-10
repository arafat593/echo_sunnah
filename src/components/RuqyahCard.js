import React from 'react';

export default function RuqyahCard({ session, onCardClick, onBookClick, className = "", ...props }) {
  return (
    <div
      onClick={onCardClick}
      className={`bg-gradient-to-b from-white via-white to-emerald-50/15 border border-slate-200/60 rounded-3xl p-3 sm:p-5 hover:shadow-[0_30px_60px_-15px_rgba(4,120,87,0.12)] hover:border-emerald-500/25 hover:-translate-y-2.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${className}`}
      {...props}
    >
      <div>
        {/* Cover Image with badges */}
        {session.image && (
          <div className="h-28 sm:h-44 w-full overflow-hidden rounded-2xl relative mb-3 sm:mb-5 border border-slate-100 shadow-inner">
            <img
              src={session.image}
              alt={session.title}
              draggable="false"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

            {/* Floating Category Tag */}
            <div className={`absolute top-3.5 right-3.5 text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-sm ${
              session.category === "Basic"
                ? "bg-emerald-50/90 text-emerald-800 border-emerald-250/20"
                : session.category === "Diagnosis"
                  ? "bg-amber-50/90 text-amber-850 border-amber-250/20"
                  : session.category === "Follow-up"
                    ? "bg-indigo-50/90 text-indigo-850 border-indigo-250/20"
                    : "bg-rose-50/90 text-rose-850 border-rose-250/20"
            }`}>
              {session.category}
            </div>

            {/* Floating Duration Tag */}
            {session.duration && (
              <div className="absolute top-3.5 left-3.5 text-[9px] font-mono font-black uppercase px-2 py-1 rounded-full border border-slate-200/40 bg-white/90 backdrop-blur-sm text-slate-600 shadow-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-slate-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {session.duration}
              </div>
            )}

            {/* SVG Icon Circle over Image */}
            <div className="absolute bottom-3.5 left-3.5 w-8.5 h-8.5 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200/40 flex items-center justify-center shadow-md">
              <span className="text-emerald-700">
                {session.id.includes("rq-1") ? (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                ) : session.id.includes("rq-2") ? (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                  </svg>
                ) : session.id.includes("rq-3") ? (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c-.105-.347-.592-.347-.697 0L10.18 5.75a1 1 0 0 1-.752.546l-2.392.203c-.367.031-.515.485-.236.726l1.83 1.583a1 1 0 0 1 .31.954l-.545 2.378c-.084.367.311.654.613.454l2.124-1.408a1 1 0 0 1 1.052 0l2.124 1.408c.302.2.697-.087.613-.454l-.545-2.378a1 1 0 0 1 .31-.954l1.83-1.583c.279-.241.131-.695-.236-.726l-2.392-.203a1 1 0 0 1-.752-.546l-.603-1.705Z" />
                  </svg>
                )}
              </span>
            </div>
          </div>
        )}

        <h3 className="font-black text-base sm:text-xl text-slate-800 group-hover:text-emerald-800 transition-colors duration-300">
          {session.title}
        </h3>
        <p className="text-[10px] sm:text-xs text-emerald-700 font-extrabold mt-0.5 tracking-wide">
          {session.bengaliTitle}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 sm:mt-3.5 leading-relaxed font-medium line-clamp-2">
          {session.desc}
        </p>

        {session.benefits && (
          <ul className="hidden sm:block mt-5 space-y-3">
            {session.benefits.split(',').map((feat, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs text-slate-655 font-bold">
                <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-emerald-600">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>{feat.trim()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 sm:mt-8 pt-3 sm:pt-5 border-t border-slate-100 flex items-center justify-between">
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
          Quick Book
        </button>
      </div>
    </div>
  );
}
