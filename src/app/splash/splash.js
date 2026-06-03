"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Increment loading progress bar (reach 100% in 1 second)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Trigger fade-out animation right before redirecting
    const fadeTimeout = setTimeout(() => {
      setFade(true);
    }, 700);

    // Redirect to home screen after exactly 1.0 second
    const redirectTimeout = setTimeout(() => {
      router.push("/home");
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white transition-opacity duration-500 ease-in-out z-50 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {/* Geometric Islamic Star Pattern Mockup */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="star-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M30 0 L60 30 L30 60 L0 30 Z M30 10 L50 30 L30 50 L10 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle cx="30" cy="30" r="3" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#star-grid)" />
        </svg>
      </div>

      {/* Center Glow */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Splash Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Animated Brand Logo Icon */}
        <div className="relative mb-6 animate-pulse">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md" />
          <div className="relative bg-gradient-to-br from-emerald-800 to-teal-950 p-4 rounded-full shadow-2xl shadow-emerald-500/20 w-24 h-24 flex items-center justify-center border border-emerald-500/10">
            <Image
              src="/echo_sunnah_logo.png"
              alt="Echo Sunnah Logo"
              width={72}
              height={72}
              className="object-contain animate-spin-slow"
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 bg-clip-text text-transparent drop-shadow-md font-sans">
          ECHO SUNNAH
        </h1>
        <p className="mt-2 text-emerald-200/80 tracking-widest text-sm font-medium uppercase">
          Reviving the Sunnah, Nurturing Wellness
        </p>

        {/* Loading Spinner & Progress */}
        <div className="mt-12 w-64">
          <div className="flex justify-between items-center text-xs text-emerald-300/60 mb-2 font-mono">
            <span>CONNECTING</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-emerald-950/60 rounded-full h-1.5 overflow-hidden border border-emerald-800/40">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bismillah Text */}
        <div className="mt-8 text-emerald-400/50 text-xs italic font-serif">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 text-center text-xs text-emerald-300/40 font-mono">
        © {new Date().getFullYear()} Echo Sunnah. All rights reserved.
      </div>
    </div>
  );
}
