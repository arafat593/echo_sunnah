import React from 'react';

export default function ProductCard({ product, onCardClick, onAddToCart, className = "", ...props }) {
  return (
    <div
      onClick={onCardClick}
      className={`bg-white rounded-3xl p-3 sm:p-4.5 border border-slate-200/60 shadow-[0_5px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_rgba(4,120,87,0.07)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between group cursor-pointer ${className}`}
      {...props}
    >
      <div>
        {/* Visual Image container with Category badge & rating overlay */}
        <div className="h-28 sm:h-44 w-full overflow-hidden rounded-2xl relative mb-3 sm:mb-4 border border-slate-150 shadow-inner">
          <img
            src={product.image}
            alt={product.name}
            draggable="false"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
          />
          {/* Floating emoji circle overlay */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-sm sm:text-base">
            {product.emoji}
          </div>

          {/* Weight / Qty badge */}
          <div className="absolute bottom-3 right-3 text-[9px] font-black tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-slate-950/70 text-white backdrop-blur-xs">
            {product.weight}
          </div>
        </div>

        {/* Category and Rating bar */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 bg-amber-50/70 border border-amber-150/40 px-2 py-0.5 rounded-md text-[9px] font-extrabold text-amber-800">
            <span>★</span>
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="font-extrabold text-xs sm:text-base text-slate-800 leading-tight group-hover:text-emerald-800 transition-colors">
          {product.name}
        </h3>

        {/* Brief description tag */}
        <p className="hidden sm:block text-[11px] text-slate-450 line-clamp-2 mt-2 leading-relaxed font-medium">
          {product.desc}
        </p>
      </div>

      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-slate-100/80 flex items-center justify-between">
        <div>
          <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Price</span>
          <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">{product.price}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all shadow-[0_4px_12px_rgba(4,120,87,0.14)] hover:shadow-[0_6px_16px_rgba(4,120,87,0.22)] active:scale-[0.97]"
        >
          + Cart
        </button>
      </div>
    </div>
  );
}
