import React from 'react';
import Image from 'next/image';

export default function ProductCard({ product, onCardClick, onAddToCart, onBuyNow, className = "", ...props }) {
  return (
    <div
      onClick={onCardClick}
      className={`bg-white rounded-3xl p-3 sm:p-4.5 border border-slate-200/60 shadow-[0_5px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_rgba(4,120,87,0.07)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between group cursor-pointer ${className}`}
      {...props}
    >
      <div>
        {/* Visual Image container with Category badge & rating overlay */}
        <div className="h-28 sm:h-44 w-full overflow-hidden rounded-2xl relative mb-3 sm:mb-4 border border-slate-150 shadow-inner">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            draggable="false"
            className="object-cover group-hover:scale-105 transition-transform duration-500 select-none"
          />
          {/* Floating emoji circle overlay */}
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-sm sm:text-base">
            {product.emoji}
          </div>

          {/* Discount badge */}
          {product.originalPrice && (
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[9px] font-black tracking-wide uppercase px-2 py-0.5 rounded-lg bg-rose-500 text-white shadow-sm">
              ২০% ছাড়
            </div>
          )}

          {/* Weight / Qty badge */}
          <div className="absolute bottom-3 right-3 text-[9px] font-black tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-slate-950/70 text-white backdrop-blur-xs">
            {product.weight}
          </div>
        </div>

        {/* Category and Rating bar */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1.5">
            {product.isHot && (
              <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shrink-0 animate-pulse">
                🔥 HOT
              </span>
            )}
            <div className="flex items-center gap-1 bg-amber-50/70 border border-amber-150/40 px-2 py-0.5 rounded-md text-[9px] font-extrabold text-amber-800">
              <span>★</span>
              <span>{product.rating}</span>
            </div>
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

      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3.5 border-t border-slate-100/80 flex items-center justify-between gap-1.5">
        <div>
          <span className="text-[8px] sm:text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Price</span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-base md:text-lg font-black text-slate-900 tracking-tight">{product.price}</span>
            {product.originalPrice && (
              <span className="text-[9px] sm:text-[10px] text-slate-400 line-through font-medium">{product.originalPrice}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="border border-emerald-600 text-emerald-800 hover:bg-emerald-50 p-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-1 active:scale-[0.97]"
            title="Add to Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
          </button>
          
          {onBuyNow && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuyNow(product);
              }}
              className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all shadow-[0_4px_12px_rgba(4,120,87,0.14)] hover:shadow-[0_6px_16px_rgba(4,120,87,0.22)] active:scale-[0.97] text-center whitespace-nowrap"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
