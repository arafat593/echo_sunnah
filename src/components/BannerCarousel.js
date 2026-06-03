"use client";

import { useState, useEffect, useRef } from "react";

export default function BannerCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNextRef = useRef(handleNext);
  useEffect(() => {
    handleNextRef.current = handleNext;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextRef.current();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const diffX = touchStartX - touchEndX;
    if (diffX > 50) {
      // Swiped left
      handleNext();
    } else if (diffX < -50) {
      // Swiped right
      handlePrev();
    }
    // Reset values
    setTouchStartX(0);
    setTouchEndX(0);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="w-full h-[320px] sm:h-[400px] md:h-[480px] relative overflow-hidden group bg-slate-900"
    >
      {/* Slides Container */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            {/* Slide Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${index === activeIndex ? "scale-105" : "scale-100"
                }`}
            />

            {/* Gradient Overlay for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-12 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl text-white">
                  {slide.badge && (
                    <span className="inline-block bg-amber-400 text-emerald-950 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-4 shadow-sm animate-slideUp">
                      {slide.badge}
                    </span>
                  )}
                  {/* Title — Premium brand treatment for Echo Sunnah slide */}
                  {slide.title.includes("Echo Sunnah") ? (
                    <div className="animate-slideUp">
                      {/* Arabic decorative motif */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent max-w-[80px]" />
                        <span className="text-amber-400/80 text-xs tracking-[0.3em] font-bold uppercase">Est. 2024</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent max-w-[80px]" />
                      </div>

                      {/* Premium gradient brand name */}
                      <h1
                        className="font-black leading-none tracking-tight drop-shadow-2xl"
                        style={{
                          fontSize: "clamp(2.5rem, 7vw, 5rem)",
                          background: "linear-gradient(135deg, #ffffff 0%, #d1fae5 30%, #6ee7b7 60%, #fbbf24 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          filter: "drop-shadow(0 0 30px rgba(110,231,183,0.3))",
                        }}
                      >
                        Echo Sunnah
                      </h1>

                      {/* Bengali subtitle with premium pill */}
                      <div className="flex items-center gap-3 mt-2 mb-1">
                        <span
                          className="text-lg sm:text-2xl font-black tracking-wide"
                          style={{
                            background: "linear-gradient(90deg, #d1fae5, #a7f3d0)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          একো সুন্নাহ
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest bg-amber-400/20 border border-amber-400/40 text-amber-300 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          Islamic Wellness
                        </span>
                      </div>

                      {/* Glowing underline bar */}
                      <div className="mt-3 mb-5 h-0.5 w-32 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
                    </div>
                  ) : (
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md animate-slideUp">
                      {slide.title}
                    </h2>
                  )}

                  <p className="text-xs sm:text-sm text-slate-100 mt-1 sm:mt-2 leading-relaxed font-medium drop-shadow-sm max-w-xl animate-slideUp">
                    {slide.desc}
                  </p>
                  {slide.buttonText && slide.buttonLink && (
                    <a
                      href={slide.buttonLink}
                      className="inline-flex items-center gap-2 mt-6 sm:mt-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-extrabold text-xs px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/30 active:scale-95"
                    >
                      {slide.buttonText}
                      <span className="text-base">→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-amber-400 font-bold transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
        aria-label="Previous Slide"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-amber-400 font-bold transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
        aria-label="Next Slide"
      >
        →
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex ? "bg-amber-400 w-7" : "bg-white/40 hover:bg-white/60 w-2.5"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
