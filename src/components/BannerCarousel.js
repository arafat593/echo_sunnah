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
      className="w-full h-[200px] min-[360px]:h-[220px] min-[480px]:h-[240px] min-[600px]:h-[270px] min-[720px]:h-[300px] min-[840px]:h-[330px] min-[960px]:h-[360px] min-[1100px]:h-[390px] min-[1280px]:h-[425px] min-[1536px]:h-[460px] relative overflow-hidden group bg-slate-900"
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
              <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 w-full">
                <div className="text-white w-full">
                  <div className="max-w-xl md:max-w-2xl text-left">
                    {slide.badge && (
                      <span className="inline-block bg-amber-400 text-emerald-950 text-[8px] sm:text-[10px] font-black tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase mb-1 sm:mb-4 shadow-sm animate-slideUp">
                        {slide.badge}
                      </span>
                    )}
                    {/* Title — Premium brand treatment for Echo Sunnah slide */}
                    {slide.title.includes("Echo Sunnah") ? (
                      <div className="animate-slideUp">
                        {/* Arabic decorative motif */}
                        <div className="flex items-center gap-3 mb-1 sm:mb-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent max-w-[80px]" />
                          <span className="text-amber-400/80 text-[10px] sm:text-xs tracking-[0.3em] font-bold uppercase">Est. 2024</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent max-w-[80px]" />
                        </div>

                        {/* Premium gradient brand name */}
                        <h1
                          className="font-black leading-none tracking-tight drop-shadow-2xl"
                          style={{
                            fontSize: "clamp(1.5rem, 6vw, 4rem)",
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
                        <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2 mb-0.5 sm:mb-1">
                          <span
                            className="text-sm sm:text-2xl font-black tracking-wide"
                            style={{
                              background: "linear-gradient(90deg, #d1fae5, #a7f3d0)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            একো সুন্নাহ
                          </span>
                          <span className="text-[7.5px] sm:text-[9px] font-black uppercase tracking-widest bg-amber-400/20 border border-amber-400/40 text-amber-300 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm">
                            Islamic Wellness
                          </span>
                        </div>

                        {/* Glowing underline bar */}
                        <div className="mt-1 sm:mt-3 mb-1.5 sm:mb-5 h-0.5 w-24 sm:w-32 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
                      </div>
                    ) : (
                      <h2 className="text-lg sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md animate-slideUp">
                        {slide.title}
                      </h2>
                    )}

                    <p className="text-[10px] sm:text-sm text-slate-100 mt-0.5 sm:mt-2 leading-relaxed font-medium drop-shadow-sm max-w-xl animate-slideUp line-clamp-2 sm:line-clamp-none">
                      {slide.desc}
                    </p>
                    {slide.buttonText && slide.buttonLink && (
                      <a
                        href={slide.buttonLink}
                        className="inline-flex items-center gap-1.5 mt-2.5 min-[360px]:mt-4 sm:mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-emerald-950 font-extrabold text-[10px] sm:text-xs px-4 py-2 sm:px-6 sm:py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/30 active:scale-95 animate-slideUp"
                      >
                        {slide.buttonText}
                        <span className="text-sm">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Dots Indicator */}
      <div className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 z-25 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-1.5 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex ? "bg-amber-400 w-5 sm:w-7" : "bg-white/40 hover:bg-white/60 w-1.5 sm:w-2.5"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
