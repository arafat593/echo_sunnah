"use client";

import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const banglaDigits = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
  const englishDigitsStr = String(priceStr).replace(/[০-৯]/g, d => banglaDigits[d]);
  const cleanedStr = englishDigitsStr.replace(/[^\d]/g, "");
  return parseInt(cleanedStr) || 0;
};

export default function Header() {
  const {
    isLoggedIn,
    user,
    cart,
    notifications,
    login,
    logout,
    markAllNotificationsRead,
    updateCartQty
  } = useApp();

  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileMoreMenuOpen, setMobileMoreMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Advanced Auth Modal States
  const [authMode, setAuthMode] = useState("login"); // "login", "register", "forgot", "otp"
  const [otpSentEmail, setOtpSentEmail] = useState("");
  const [otpCode, setOtpCode] = useState(["1", "2", "3", "4", "5", "6"]);

  const menuItems = [
    { name: "Home", href: "/home" },
    { name: "Ruqyah", href: "/ruqyah" },
    { name: "Hijama", href: "/hijama" },
    { name: "Shop", href: "/shop" },
    { name: "Academy", href: "/academy" },
    { name: "Charity", href: "/charity" }
  ];

  const moreItems = [
    { name: "Health", href: "/health" },
    { name: "Blog", href: "/blog" },
    { name: "Community", href: "/community" },
    { name: "Jobs", href: "/jobs" }
  ];

  const mobileMenuItems = [
    { name: "Home", href: "/home" },
    { name: "Ruqyah", href: "/ruqyah" },
    { name: "Hijama", href: "/hijama" },
    { name: "Shop", href: "/shop" },
    { name: "Academy", href: "/academy" }
  ];

  const mobileMoreItems = [
    { name: "Charity", href: "/charity" },
    { name: "Health", href: "/health" },
    { name: "Blog", href: "/blog" },
    { name: "Community", href: "/community" },
    { name: "Jobs", href: "/jobs" }
  ];

  const totalCartQty = cart.reduce((acc, item) => acc + item.qty, 0);
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const [isScrolled, setIsScrolled] = useState(false);

  const notificationsRef = useRef(null);
  const userProfileRef = useRef(null);
  const moreMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (userProfileRef.current && !userProfileRef.current.contains(event.target)) {
        setUserProfileOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when overlay is open
  useEffect(() => {
    const isAnyOverlayOpen = mobileDrawerOpen || cartOpen || showLoginModal;
    if (isAnyOverlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen, cartOpen, showLoginModal]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(e.target.username.value || "Arafat Center");
    setShowLoginModal(false);
    setAuthMode("login");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    login(e.target.regName.value || "New User");
    setShowLoginModal(false);
    setAuthMode("login");
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    const email = e.target.forgotEmail.value || "user@example.com";
    setOtpSentEmail(email);
    setAuthMode("otp");
    setOtpCode(["1", "2", "3", "4", "5", "6"]);
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    login(otpSentEmail || "Verified User");
    setShowLoginModal(false);
    setAuthMode("login");
  };

  const handleGoogleLogin = () => {
    login("Google User");
    setShowLoginModal(false);
    setAuthMode("login");
  };

  return (
    <>
      {/* Premium Top Announcement / Info Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 text-emerald-100 text-[10px] sm:text-xs font-semibold py-1.5 px-4 border-b border-amber-500/20 z-50 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center w-full">
          {/* Below 600px View */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 w-full text-center text-[9px] min-[600px]:hidden px-1">
            <span className="flex items-center gap-0.5 text-emerald-300 font-semibold whitespace-nowrap">
              📍 Uttara Clinic
            </span>
            <span className="text-emerald-800/60 hidden min-[360px]:inline">|</span>
            <span className="flex items-center gap-1 bg-emerald-900/60 px-1.5 py-0.5 rounded-full border border-emerald-800 text-[8px] uppercase tracking-widest text-amber-400 font-extrabold shadow-sm whitespace-nowrap">
              <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping"></span>
              Home Service Available
            </span>
            <span className="text-emerald-800/60 hidden min-[400px]:inline">|</span>
            <a href="tel:+8801999999999" className="hover:text-amber-400 transition-colors flex items-center gap-0.5 font-semibold whitespace-nowrap">
              📞 +880 1999-999999
            </a>
          </div>

          {/* 600px and Above View */}
          <div className="hidden min-[600px]:flex flex-col items-center gap-1.5 w-full">
            {/* Row 1 */}
            <div className="flex items-center justify-between w-full">
              <span className="flex items-center gap-1.5 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-800 text-[9px] uppercase tracking-widest text-amber-400 font-extrabold shadow-sm shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                Home Service Available
              </span>
              <span className="text-emerald-250 font-medium tracking-wide">Reviving Clinical Theology</span>
            </div>
            {/* Row 2 */}
            <div className="flex items-center justify-between w-full text-[10px] sm:text-xs">
              <span className="flex items-center gap-1 text-emerald-300 font-medium">
                📍 Uttara Clinic, Dhaka
              </span>
              <a href="tel:+8801999999999" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                📞 +880 1999-999999
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Premium Header Container */}
      <div className={`sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none ${isScrolled ? "pt-2 pb-1" : "pt-4 pb-2"
        }`}>
        <header className={`max-w-7xl mx-auto bg-white/90 backdrop-blur-xl border border-emerald-500/10 shadow-[0_20px_40px_-15px_rgba(4,78,56,0.12)] rounded-3xl pointer-events-auto transition-all duration-300 ${isScrolled ? "shadow-md py-1" : "py-2 sm:py-0"
          }`}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className={`relative flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-11 xl:h-14" : "h-13 xl:h-20"
              }`}>

              {/* Mobile Menu Button on Left */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-emerald-850 transition-all border border-slate-200/50 shadow-sm pointer-events-auto shrink-0 z-10"
                aria-label="Open Sidebar Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              {/* Brand Logo & Name */}
              <Link
                href="/home"
                className="flex-shrink-0 flex items-center gap-1.5 sm:gap-3 group z-10"
              >
                <div className={`bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-amber-400 p-0 rounded-[10px] sm:rounded-[18px] xl:rounded-[18px] shadow-md shadow-emerald-950/15 group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-emerald-600/20 transition-all duration-300 ${isScrolled ? "scale-90" : "scale-100"
                  }`}>
                  <div className={`relative transition-all duration-300 ${"w-6 h-6 sm:w-8 sm:h-8 xl:w-[50px] xl:h-[50px]"
                    }`}>
                    <Image src="/echo_sunnah_logo.png" alt="Echo Sunnah" fill className="object-contain" sizes="(max-width: 640px) 24px, (max-width: 1280px) 32px, 50px" />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  {/* Cursive premium brand name */}
                  <span
                    className={`${playfair.className} italic font-black leading-none tracking-tight transition-all duration-300 ${"text-[19px] min-[360px]:text-[22px] min-[480px]:text-[25px] sm:text-[26px] xl:text-[36px]"
                      }`}
                    style={{
                      background: "linear-gradient(135deg, #065f46 0%, #0f766e 40%, #047857 75%, #b45309 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "none",
                      filter: "drop-shadow(0 1px 2px rgba(4,120,87,0.15))",
                    }}
                  >
                    Echo Sunnah
                  </span>

                  {/* Decorative tagline with dot separators */}
                  <span className="flex items-center gap-1.5 leading-none">
                    <span className="w-2 h-px xl:w-3 bg-gradient-to-r from-transparent to-amber-500/70 rounded-full" />
                    <span className="text-[7.5px] sm:text-[7.5px] xl:text-[10px] text-amber-600 font-extrabold uppercase tracking-[0.2em]">
                      Islamic Wellness
                    </span>
                    <span className="w-2 h-px xl:w-3 bg-gradient-to-l from-transparent to-amber-500/70 rounded-full" />
                  </span>
                </div>
              </Link>

              {/* Navigation Links - Desktop View */}
              <nav className="hidden xl:flex items-center gap-1">
                {menuItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative py-2.5 px-4 rounded-2xl transition-all duration-300 group flex items-center justify-center hover:bg-emerald-500/5`}
                    >
                      <span className={`text-[13px] font-extrabold tracking-wide transition-colors duration-300 ${active ? "text-emerald-850" : "text-slate-655 hover:text-emerald-750"
                        }`}>
                        {item.name}
                      </span>
                      <span className={`absolute bottom-1 h-[2px] bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-700 transition-all duration-300 rounded-full ${active ? "w-2/3 opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100"
                        }`}></span>
                    </Link>
                  );
                })}

                {/* More dropdown button */}
                <div
                  className="relative"
                  ref={moreMenuRef}
                  onMouseEnter={() => setMoreMenuOpen(true)}
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  <button
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    className={`relative py-2.5 px-4 rounded-2xl transition-all duration-300 flex items-center gap-1 hover:bg-emerald-500/5 ${moreMenuOpen ? "bg-emerald-500/5" : ""
                      }`}
                  >
                    <span className="text-[13px] font-extrabold tracking-wide text-slate-655 hover:text-emerald-750 flex items-center gap-1">
                      More
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 transition-transform duration-200 ${moreMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {/* Dropdown panel */}
                  {moreMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-44 bg-white/95 backdrop-blur-xl border border-emerald-100/60 rounded-2xl shadow-[0_20px_40px_-10px_rgba(4,78,56,0.12)] py-2 z-50 animate-fadeIn">
                      {moreItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMoreMenuOpen(false)}
                            className={`flex items-center px-4 py-2.5 mx-1.5 rounded-xl transition-all duration-205 group ${active ? "bg-emerald-50 text-emerald-800" : "hover:bg-emerald-50/60 text-slate-700"
                              }`}
                          >
                            <span className="text-xs font-extrabold">{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </nav>

              {/* Right Controls Action Dock */}
              <div className="flex items-center gap-3">

                {/* Profile Trigger */}
                <div className="relative" ref={userProfileRef}>
                  {isLoggedIn ? (
                    <div>
                      <button
                        onClick={() => {
                          setUserProfileOpen(!userProfileOpen);
                        }}
                        className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full transition-all border ${userProfileOpen ? "bg-white border-emerald-100 shadow-sm scale-105" : "border-transparent hover:bg-white"
                          }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                          {user.name[0].toUpperCase()}
                        </div>
                        <span className="hidden md:inline text-xs font-extrabold text-emerald-950">{user.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400">
                          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {userProfileOpen && (
                        <div className="absolute right-0 mt-4.5 w-60 bg-white rounded-3xl shadow-[0_20px_50px_rgba(4,78,56,0.15)] border border-emerald-500/10 py-3 z-50 animate-fadeIn">
                          <div className="px-4 py-2 pb-3 border-b border-slate-100">
                            <p className="text-[8.5px] text-slate-400 uppercase font-black tracking-widest">Account Profile</p>
                            <p className="text-sm font-black text-slate-800 mt-0.5">{user.name}</p>
                          </div>

                          <div className="p-1 space-y-0.5 mt-1">
                            <Link href="/dashboard" onClick={() => setUserProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-emerald-50/60 hover:text-emerald-800 rounded-2xl transition-all">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-emerald-650">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                              </svg>
                              My Dashboard
                            </Link>
                            <button
                              onClick={() => {
                                logout();
                                setUserProfileOpen(false);
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50/60 rounded-2xl transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-rose-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                              </svg>
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Desktop Login Button */}
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="hidden sm:block bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-850 hover:to-teal-850 text-white px-5 py-2.5 rounded-full text-xs font-black shadow-md hover:shadow-lg hover:shadow-emerald-700/10 transition-all duration-305 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                      >
                        Login / Register
                      </button>
                      {/* Mobile Login Button (Icon) */}
                      <button
                        onClick={() => setShowLoginModal(true)}
                        className="sm:hidden p-1 rounded-full text-slate-655 hover:text-emerald-750 hover:bg-white transition-all flex items-center justify-center"
                        aria-label="Login"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5.5 h-5.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* Row 2 (Mobile Navigation Row) */}
            <div className="xl:hidden border-t border-slate-150/40 py-2 px-2">
              <nav className="grid grid-cols-5 gap-0.5 items-center justify-center text-center">
                {mobileMenuItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex flex-col items-center justify-center py-2 transition-all rounded-xl ${active ? "bg-emerald-100/70 text-emerald-850" : "hover:bg-slate-50 text-slate-700"
                        }`}
                    >
                      <span className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-extrabold tracking-tight leading-none">
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </header>
      </div>

      {/* AUTHENTICATION PORTAL MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-[0_25px_60px_rgba(4,78,56,0.15)] border border-emerald-500/10 max-w-md w-full p-6 sm:p-8 relative text-slate-800">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setAuthMode("login");
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-655 hover:bg-slate-50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <span className="text-emerald-705 font-extrabold text-[10px] uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100/50">
                Echo Sunnah Portal
              </span>

              {authMode === "login" && (
                <>
                  <h3 className="text-xl font-black text-slate-900 mt-3.5 font-sans">Welcome Back</h3>
                  <p className="text-xs text-slate-500 mt-1">Access your healthcare and educational dashboard</p>
                </>
              )}
              {authMode === "register" && (
                <>
                  <h3 className="text-xl font-black text-slate-900 mt-3.5 font-sans">Create Account</h3>
                  <p className="text-xs text-slate-500 mt-1">Join the prophetic wellness community</p>
                </>
              )}
              {authMode === "forgot" && (
                <>
                  <h3 className="text-xl font-black text-slate-900 mt-3.5 font-sans">Forgot Password</h3>
                  <p className="text-xs text-slate-500 mt-1">Reset your account credentials securely</p>
                </>
              )}
              {authMode === "otp" && (
                <>
                  <h3 className="text-xl font-black text-slate-900 mt-3.5 font-sans">Verify Security OTP</h3>
                  <p className="text-xs text-slate-500 mt-1">We sent a 6-digit verification code to your email</p>
                </>
              )}
            </div>

            {/* LOGIN MODE */}
            {authMode === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 tracking-wider uppercase mb-1">USERNAME / EMAIL</label>
                  <input
                    type="text"
                    name="username"
                    required
                    defaultValue="Arafat Center"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 tracking-wider uppercase mb-1">PASSWORD</label>
                  <input
                    type="password"
                    required
                    defaultValue="password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setAuthMode("forgot")}
                    className="text-[11px] font-extrabold text-emerald-700 hover:text-emerald-850 hover:underline transition-colors"
                  >
                    Forgot Password? (পাসওয়ার্ড ভুলে গেছেন?)
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-700 to-teal-850 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-700/10 transition-all duration-305"
                >
                  Sign In (প্রবেশ করুন)
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-150"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Or login with</span>
                  <div className="flex-grow border-t border-slate-150"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold py-3 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span>Google Sign In</span>
                </button>

                <p className="text-center text-xs text-slate-500 mt-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("register")}
                    className="text-emerald-700 font-extrabold hover:underline"
                  >
                    Register (নিবন্ধন করুন)
                  </button>
                </p>
              </form>
            )}

            {/* REGISTER MODE */}
            {authMode === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 tracking-wider uppercase mb-1">FULL NAME (পূর্ণ নাম)</label>
                  <input
                    type="text"
                    name="regName"
                    required
                    placeholder="Enter full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 tracking-wider uppercase mb-1">EMAIL ADDRESS (ইমেইল ঠিকানা)</label>
                  <input
                    type="email"
                    name="regEmail"
                    required
                    placeholder="user@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 tracking-wider uppercase mb-1">PASSWORD (পাসওয়ার্ড)</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-700 to-teal-850 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-700/10 transition-all duration-305"
                >
                  Register & Sign In (নিবন্ধন করুন)
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-150"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Or register with</span>
                  <div className="flex-grow border-t border-slate-150"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold py-3 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span>Google Register</span>
                </button>

                <p className="text-center text-xs text-slate-500 mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-emerald-700 font-extrabold hover:underline"
                  >
                    Sign In (প্রবেশ করুন)
                  </button>
                </p>
              </form>
            )}

            {/* FORGOT PASSWORD MODE */}
            {authMode === "forgot" && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 tracking-wider uppercase mb-1">EMAIL ADDRESS (ইমেইল ঠিকানা)</label>
                  <input
                    type="email"
                    name="forgotEmail"
                    required
                    placeholder="Enter registered email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-700 to-teal-850 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-700/10 transition-all duration-305"
                >
                  Send Reset OTP (ওটিপি পাঠান)
                </button>

                <p className="text-center text-xs text-slate-500 mt-4">
                  Remember password?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-emerald-700 font-extrabold hover:underline"
                  >
                    Sign In (প্রবেশ করুন)
                  </button>
                </p>
              </form>
            )}

            {/* OTP VERIFICATION MODE */}
            {authMode === "otp" && (
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div className="flex justify-between gap-2.5 my-5">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d]/g, "");
                        const newOtp = [...otpCode];
                        newOtp[idx] = val;
                        setOtpCode(newOtp);
                        if (val && idx < 5) {
                          document.getElementById(`otp-${idx + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otpCode[idx] && idx > 0) {
                          document.getElementById(`otp-${idx - 1}`)?.focus();
                        }
                      }}
                      className="w-12 h-12 text-center text-lg font-black bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:outline-none transition-all text-slate-800 shadow-sm"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-700 to-teal-850 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-700/10 transition-all duration-305"
                >
                  Verify & Login (যাচাই করুন)
                </button>

                <p className="text-center text-xs text-slate-500">
                  Didn't receive code?{" "}
                  <button
                    type="button"
                    onClick={() => alert("Verification code resent successfully to " + otpSentEmail + "!")}
                    className="text-emerald-700 font-extrabold hover:underline"
                  >
                    Resend Code (আবার ওটিপি পাঠান)
                  </button>
                </p>

                <p className="text-center text-xs text-slate-500 mt-4">
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-slate-400 font-extrabold hover:underline"
                  >
                    Cancel & Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CART DRAWER OVERLAY */}
      {cartOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 text-slate-800 animate-slideUp">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <h3 className="text-lg font-black text-emerald-900">Your Cart ({totalCartQty})</h3>
                <button onClick={() => setCartOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-655 hover:bg-slate-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5.5 h-5.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-24 text-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto opacity-30 mb-3 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <p className="text-sm font-bold">Your cart is empty.</p>
                  <Link href="/shop" onClick={() => setCartOpen(false)} className="text-emerald-700 font-extrabold text-xs hover:underline mt-2 inline-block">
                    Browse Shop Products
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto mt-4 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800 leading-tight">{item.name}</h4>
                        <span className="text-xs text-slate-455 mt-1.5 block font-semibold">{item.unit} • {item.price}</span>
                      </div>
                      <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 p-1.5 rounded-full shadow-inner">
                        <button
                          onClick={() => updateCartQty(item.id, -1)}
                          className="w-6 h-6 bg-white hover:bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-655 font-bold text-xs transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="text-xs font-black w-4 text-center text-slate-800">{item.qty}</span>
                        <button
                          onClick={() => updateCartQty(item.id, 1)}
                          className="w-6 h-6 bg-white hover:bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-655 font-bold text-xs transition-colors shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-155 pt-4 mt-auto">
                <div className="flex justify-between items-center mb-4 px-1">
                  <span className="text-xs font-extrabold text-slate-455 uppercase tracking-wider">Subtotal</span>
                  <span className="text-xl font-black text-emerald-900">
                    ৳{cart.reduce((acc, item) => acc + item.qty * parsePrice(item.price), 0)}
                  </span>
                </div>
                <Link
                  href="/shop#checkout"
                  onClick={() => setCartOpen(false)}
                  className="block text-center bg-gradient-to-r from-emerald-700 to-teal-850 hover:from-emerald-800 hover:to-teal-800 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-start pointer-events-auto">
          {/* Click outside overlay to close */}
          <div className="fixed inset-0 z-40 pointer-events-auto" onClick={() => setMobileDrawerOpen(false)} />

          <div className="relative z-50 w-full max-w-[280px] sm:max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-6 text-slate-800 animate-slideRight pointer-events-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-850 text-white p-0 rounded-lg">
                    <div className="relative w-6 h-6">
                      <Image src="/echo_sunnah_logo.png" alt="Echo Sunnah" fill className="object-contain" sizes="24px" />
                    </div>
                  </div>
                  <span className="font-black text-emerald-950 text-base">Echo Sunnah Menu</span>
                </div>
                <button onClick={() => setMobileDrawerOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-655 hover:bg-slate-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* All Menu Links */}
              <div className="mt-6 space-y-1.5 overflow-y-auto max-h-[70vh] pr-1">
                {/* Cart link inside Menu */}
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    setCartOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold bg-amber-500/10 text-amber-900 border border-amber-500/20 hover:bg-amber-500/25 transition-all text-left"
                >
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5 text-amber-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <span>Cart</span>
                  </span>
                  {totalCartQty > 0 && (
                    <span className="bg-amber-500 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                      {totalCartQty} Items
                    </span>
                  )}
                </button>

                {[...menuItems, ...moreItems].map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active ? "bg-emerald-100/70 text-emerald-850" : "text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      <span className="tracking-tight">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="border-t border-slate-100 pt-4 mt-auto">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 px-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-650 to-teal-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {user.name[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-800 leading-none">{user.name}</span>
                      <span className="text-[9px] text-slate-400 font-bold mt-1">Logged In</span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-50/50 text-emerald-850 font-black py-3 rounded-2xl text-xs border border-slate-200 transition-all mt-2"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    setShowLoginModal(true);
                  }}
                  className="w-full text-center bg-gradient-to-r from-emerald-700 to-teal-850 text-white font-black py-3 rounded-2xl text-xs shadow-md transition-all"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
