"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const { addNotification } = useApp();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      addNotification(`Jazakallah! You have subscribed to our wellness newsletter with: ${email}`);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-emerald-950 via-emerald-900/90 to-slate-950 text-white pt-24 pb-8 mt-16 overflow-visible">
      {/* Elegant Curved Wave Divider at the top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none transform -translate-y-[99%] z-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[45px] text-emerald-950 fill-current">
          <path d="M0,0 C150,90 350,90 500,40 C650,-10 850,-10 1000,40 C1150,90 1200,80 1200,80 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Decorative Golden Accent line between wave and footer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0 z-30"></div>

      {/* Soft Ambient Glows inside the footer */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute right-1/4 bottom-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16">

          {/* Column 1: Brand & About Panel */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl space-y-6 hover:border-emerald-500/30 transition-colors duration-300">
            <Link href="/home" className="flex items-center gap-3 group">
              <div className="bg-emerald-800 text-amber-400 p-2.5 rounded-2xl shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-wider leading-tight">ECHO SUNNAH</span>
                <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest">Islamic Wellness</span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-medium">
              Echo Sunnah is a premier clinical theology platform dedicated to reviving the prophetic lifestyle, wellness routines, hijama cupping treatments, and authentic ruqyah.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-10 h-10 rounded-2xl bg-emerald-900/50 border border-emerald-800/60 flex items-center justify-center text-emerald-100 hover:text-emerald-950 hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-2xl bg-emerald-900/50 border border-emerald-800/60 flex items-center justify-center text-emerald-100 hover:text-emerald-950 hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.503 2.503 0 0 1-1.768 1.768C18.255 19 12 19 12 19s-6.255 0-7.814-.418a2.503 2.503 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.745 5 12 5 12 5s6.255 0 7.812.418ZM10.004 9.003v5.993L15.006 12l-5.002-2.997Z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-2xl bg-emerald-900/50 border border-emerald-800/60 flex items-center justify-center text-emerald-100 hover:text-emerald-950 hover:bg-amber-400 hover:border-amber-400 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.796.056 1.03.047 1.78.213 2.41.458a4.902 4.902 0 0 1 1.77 1.151 4.902 4.902 0 0 1 1.15 1.772c.247.63.413 1.38.46 2.41.047 1.014.056 1.369.056 3.797 0 2.43-.009 2.784-.056 3.796-.047 1.03-.213 1.78-.458 2.41a4.902 4.902 0 0 1-1.151 1.77 4.902 4.902 0 0 1-1.772 1.15c-.63.247-1.38.413-2.41.46-.1014.047-1.369.056-3.797.056-2.43 0-2.784-.009-3.796-.056-1.03-.047-1.78-.213-2.41-.458a4.902 4.902 0 0 1-1.77-1.151 4.902 4.902 0 0 1-1.15-1.772c-.247-.63-.413-1.38-.46-2.41-.047-1.014-.056-1.369-.056-3.797 0-2.43.009-2.784.056-3.796.047-1.03.213-1.78.458-2.41a4.902 4.902 0 0 1 1.151-1.77 4.902 4.902 0 0 1 1.772-1.15c.63-.247 1.38-.413 2.41-.46 1.014-.047 1.369-.056 3.797-.056zm0 2.232c-2.412 0-2.697.008-3.647.052-.89.04-1.373.188-1.695.313a2.668 2.668 0 0 0-.986.643 2.668 2.668 0 0 0-.642.986c-.125.322-.273.805-.313 1.695-.044.95-.052 1.235-.052 3.647 0 2.412.008 2.698.052 3.647.04.89.188 1.373.313 1.695.207.534.481.82.875 1.215.395.395.681.669 1.215.876.322.125.805.273 1.695.313.95.044 1.235.052 3.647.052 2.412 0 2.697-.008 3.647-.052.89-.04 1.373-.188 1.695-.313a2.668 2.668 0 0 0 .986-.643 2.668 2.668 0 0 0 .642-.986c.125-.322.273-.805.313-1.695.044-.95.052-1.235.052-3.647 0-2.412-.008-2.697-.052-3.647-.04-.89-.188-1.373-.313-1.695a2.668 2.668 0 0 0-.643-.986 2.668 2.668 0 0 0-.986-.642c-.322-.125-.805-.273-1.695-.313-.952-.044-1.238-.052-3.65-.052zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="pl-0 lg:pl-8">
            <h4 className="text-sm font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400 mb-6 pb-2 border-b border-white/10 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-semibold">
              <li>
                <Link href="/ruqyah" className="group flex items-center gap-2.5 text-emerald-100/70 hover:text-amber-300 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-amber-400 group-hover:scale-125 transition-all"></span>
                  <span>Ruqyah Therapy (রুকইয়াহ)</span>
                </Link>
              </li>
              <li>
                <Link href="/hijama" className="group flex items-center gap-2.5 text-emerald-100/70 hover:text-amber-300 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-amber-400 group-hover:scale-125 transition-all"></span>
                  <span>Hijama Cupping (হিজামা)</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" className="group flex items-center gap-2.5 text-emerald-100/70 hover:text-amber-300 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-amber-400 group-hover:scale-125 transition-all"></span>
                  <span>Wellness Shop (শপ)</span>
                </Link>
              </li>
              <li>
                <Link href="/academy" className="group flex items-center gap-2.5 text-emerald-100/70 hover:text-amber-300 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-amber-400 group-hover:scale-125 transition-all"></span>
                  <span>Training Academy (একাডেমি)</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="group flex items-center gap-2.5 text-emerald-100/70 hover:text-amber-300 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-amber-400 group-hover:scale-125 transition-all"></span>
                  <span>About Us (আমাদের সম্পর্কে)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400 mb-6 pb-2 border-b border-white/10 inline-block">
              Contact Info
            </h4>
            <ul className="space-y-4.5 text-xs sm:text-sm text-emerald-100/80 font-medium">
              <li className="flex items-start gap-3.5 group">
                <div className="bg-emerald-900/60 p-2 rounded-xl text-amber-400 border border-emerald-800/40 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors duration-300 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="leading-relaxed pt-0.5">
                  House 24, Road 7, Sector 3,<br />
                  Uttara, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3.5 group">
                <div className="bg-emerald-900/60 p-2 rounded-xl text-amber-400 border border-emerald-800/40 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors duration-300 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:info@echosunnah.com" className="hover:text-amber-300 transition-colors pt-0.5 font-semibold">
                  info@echosunnah.com
                </a>
              </li>
              <li className="flex items-center gap-3.5 group">
                <div className="bg-emerald-900/60 p-2 rounded-xl text-amber-400 border border-emerald-800/40 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors duration-300 shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+8801999999999" className="hover:text-amber-305 transition-colors pt-0.5 font-semibold">
                  +880 1999-999999
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Premium Newsletter Card */}
          <div>
            <div className="bg-gradient-to-br from-emerald-900/80 via-emerald-950/80 to-slate-900/80 border border-emerald-700/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md hover:border-amber-400/30 transition-all duration-300 group">
              {/* Animated decorative glow */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-colors duration-500"></div>

              <h4 className="text-base font-extrabold text-amber-300 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.685a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Newsletter
              </h4>
              <p className="text-xs text-emerald-100/60 leading-relaxed mb-5">
                Subscribe to get updates on Prophetic wellness dates, health tools, and events.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-emerald-950/90 border border-emerald-800/80 text-xs sm:text-sm rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-emerald-500/30"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-emerald-950 font-black py-3 rounded-xl text-xs sm:text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                >
                  Join Newsletter
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Area */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-emerald-200/50">
          <span>© {new Date().getFullYear()} Echo Sunnah. All rights reserved. Reviving Prophetic Wellness.</span>

          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-amber-300 hover:underline">Terms</Link>
              <Link href="/privacy" className="hover:text-amber-300 hover:underline">Privacy</Link>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 bg-emerald-900/40 hover:bg-amber-400 text-emerald-100 hover:text-emerald-950 px-4 py-2 rounded-xl border border-emerald-800/60 hover:border-amber-400 text-xs font-bold transition-all duration-300 shadow-lg active:scale-95"
            >
              <span>Back to Top</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
