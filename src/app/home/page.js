"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";

const homeSlides = [
  {
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1600",
    badge: "Reviving Prophetic Wellness",
    title: "Echo Sunnah (একো সুন্নাহ)",
    desc: "A premium medical theology center dedicated to authentic wet cupping (Hijama) therapies, Quranic Ruqyah Shariah treatment, and certified wellness training programs.",
    buttonText: "Explore Hijama (হিজামা)",
    buttonLink: "/hijama"
  },
  {
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1600",
    badge: "100% Pure Organic Shifa",
    title: "Natural Prophetic Remedies",
    desc: "Order organic raw Sidr honey, premium cold-pressed black seed oil, pure Palestinian extra virgin olive oil, and premium dates directly from our shop.",
    buttonText: "Visit Sunnah Shop",
    buttonLink: "/shop"
  },
  {
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=1600",
    badge: "Strict Sunnah Principles",
    title: "Quranic Ruqyah Shariah",
    desc: "Seek complete spiritual healing from Sihr, evil eye, Jinn afflictions, and somatic panic blocks through authentic Quranic recitation by verified Raqis.",
    buttonText: "Book Ruqyah Session",
    buttonLink: "/ruqyah"
  },
  {
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600",
    badge: "Hygienic & Certified Therapy",
    title: "Clinical Wet Cupping",
    desc: "Hijama therapy carried out under strict clinical hygiene protocols using premium single-use disposable kits to cleanse blood toxins and ease muscle tension.",
    buttonText: "See Hijama Packages",
    buttonLink: "/hijama"
  },
  {
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1600",
    badge: "Study & Prophetic Diploma",
    title: "Sunnah Wellness Academy",
    desc: "Enroll in our certified diploma and training programs to learn the prophetic science of cupping therapy, organic medicine, and holistic clinical anatomy.",
    buttonText: "Join The Academy",
    buttonLink: "/academy"
  }
];

export default function HomePage() {
  const { addToCart, createBooking, addNotification } = useApp();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Slider ref for Hijama cards scroll
  const sliderRef = useRef(null);

  const scrollSlider = (index) => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector('[data-card]');
    if (!card) return;
    const cardWidth = card.offsetWidth + 24; // card width + gap-6
    sliderRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  // Slide Index for shop products
  const [shopIndex, setShopIndex] = useState(0);

  // Shifa Advisor state & data
  const [selectedConcern, setSelectedConcern] = useState("migraine");

  const concernsData = {
    migraine: {
      title: "Headaches & Migraines Relief",
      bengaliTitle: "মাথাব্যথা ও মাইগ্রেন প্রশমন",
      recommendation: "Hijama Sunnah Basic / Detox Packages (covering Al-Kahil & Yafook points) + daily warm water mixed with raw Sidr honey.",
      hadith: "“The Prophet (ﷺ) was cupped on his head for an ailment he suffered from while he was in a state of Ihram.” (Al-Bukhari)",
      link: "/hijama",
      btnText: "Book Hijama Appointment"
    },
    fatigue: {
      title: "Muscle Pain, Backache & Fatigue",
      bengaliTitle: "মাংসপেশির ব্যথা ও দীর্ঘস্থায়ী ক্লান্তি",
      recommendation: "Executive Wellness Hijama (15 cups full-body detox points) followed by daily massage with cold-pressed Black Seed Oil.",
      hadith: "“Use the black seed, for indeed it contains a cure for every disease except death.” (Al-Bukhari)",
      link: "/hijama",
      btnText: "Book Wellness Session"
    },
    spiritual: {
      title: "Anxiety, Nightmares & Spiritual Protection",
      bengaliTitle: "মানসিক অস্থিরতা, দুঃস্বপ্ন ও আধ্যাত্মিক সুরক্ষা",
      recommendation: "90-minute Ruqyah Shariah Session by certified Raqis + daily recitation of Ayat-al-Kursi and morning/evening Adhkar.",
      hadith: "“And We send down of the Qur'an that which is a healing and a mercy to those who believe.” (Surah Al-Isra, 17:82)",
      link: "/ruqyah",
      btnText: "Book Ruqyah Consultation"
    },
    immunity: {
      title: "Metabolic Cleansing & General Immunity",
      bengaliTitle: "মেটাবলিক ডিটক্স ও রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি",
      recommendation: "Adopting the Prophetic Portion Rule (1/3rd capacity for food, liquid, respiration) + voluntary Monday/Thursday Fasts.",
      hadith: "“A human being fills no vessel worse than his stomach. It is sufficient for a human being to eat a few mouthfuls...” (At-Tirmidhi)",
      link: "/health",
      btnText: "Read Health Science Rules"
    }
  };

  const hijamaPackages = [
    {
      id: "hj-1",
      title: "Sunnah Basic (6 Cups)",
      bengaliTitle: "সুন্নাহ বেসিক (৬টি কাপ)",
      price: "৳১,২০০",
      originalPrice: "৳১,৫০০",
      desc: "Perfect for beginners. Focuses on key wellness and detox points on the upper back.",
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
      features: ["6 Sterile Cups", "Disposable Blades", "Organic Olive Oil Massage", "Sunnah Consultation"]
    },
    {
      id: "hj-2",
      title: "Sunnah Detox (10 Cups)",
      bengaliTitle: "সুন্নাহ ডিটক্স (১০টি কাপ)",
      price: "৳১,৮০০",
      originalPrice: "৳২,২০০",
      desc: "Comprehensive cleansing for back, shoulders, and legs. Relieves pain and chronic fatigue.",
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1519823551278-64ac928349d2?q=80&w=600",
      features: ["10 Sterile Cups", "Disposable Blades", "Prophetic Herb Sanitization", "Blood Pressure Check"]
    },
    {
      id: "hj-3",
      title: "Executive Wellness (15 Cups)",
      bengaliTitle: "এক্সিকিউটিভ ওয়েলনেস (১৫টি কাপ)",
      price: "৳২,৫০০",
      originalPrice: "৳৩,০০০",
      desc: "Full-body Sunnah points coverage. Highly recommended for complete metabolic revitalization.",
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600",
      features: ["15 Sterile Cups", "Comprehensive Detox Points", "Black Seed Oil Treatment", "Post-Hijama Energizer Drink"]
    },
    {
      id: "hj-4",
      title: "Home Service Hijama",
      bengaliTitle: "হোম সার্ভিস হিজামা",
      price: "৳৩,৫০০",
      originalPrice: "৳৪,০০০",
      desc: "Certified therapist visits your home with full clinical equipment. Maximum comfort, zero travel.",
      badge: "Home Visit",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=600",
      features: ["Full Clinical Kit", "Therapist Home Visit", "Pre & Post Consultation", "Sterile Disposable Set"]
    },
    {
      id: "hj-5",
      title: "Women's Hijama Special",
      bengaliTitle: "মহিলা হিজামা স্পেশাল",
      price: "৳১,৫০০",
      originalPrice: "৳২,০০০",
      desc: "Performed exclusively by certified female therapists in a fully private and comfortable setting.",
      badge: "Sisters Only",
      image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?q=80&w=600",
      features: ["Female Therapist Only", "Private Room Session", "8 Sterile Cups", "Hormone Balance Points"]
    }
  ];

  const ruqyahServices = [
    {
      id: "rq-1",
      title: "Spiritual Affliction Session",
      bengaliTitle: "রুকইয়াহ আধ্যাত্মিক সেশন",
      category: "Spiritual",
      price: "৳১,৫০০",
      desc: "In-depth treatment for Ayn (evil eye), Sihr (black magic), and spiritual blockages.",
      duration: "90 Mins"
    },
    {
      id: "rq-2",
      title: "Mental Peace & Anxiety Relief",
      bengaliTitle: "মানসিক প্রশান্তি ও দুশ্চিন্তা মুক্তি",
      category: "Mental",
      price: "৳১,০০০",
      desc: "Therapeutic Quranic recitation and psychological counseling based on Islamic principles.",
      duration: "60 Mins"
    }
  ];

  // Shop Products Carousel state & refs
  const [shopScrollIndex, setShopScrollIndex] = useState(0);
  const shopSliderRef = useRef(null);

  const scrollShopSlider = (index) => {
    if (!shopSliderRef.current) return;
    const card = shopSliderRef.current.querySelector('[data-shop-card]');
    if (!card) return;
    const cardWidth = card.offsetWidth + 24; // card width + gap-6
    shopSliderRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  const shopProducts = [
    {
      id: "prod-1",
      name: "Organic Raw Sundarban Honey",
      category: "Honey",
      price: "৳৯০০",
      weight: "500g",
      rating: 4.9,
      emoji: "🍯",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=500",
      desc: "Harvested directly from the deep mangrove forests of the Sundarbans. 100% pure and unprocessed."
    },
    {
      id: "prod-2",
      name: "Cold-Pressed Black Seed Oil",
      category: "Black Seed",
      price: "৳৬০০",
      weight: "250ml",
      rating: 4.8,
      emoji: "🫙",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500",
      desc: "Extracted from premium Nigella Sativa seeds using hygienic cold-press methods."
    },
    {
      id: "prod-3",
      name: "Premium Khalas Dates (Saudi)",
      category: "Health Supplements",
      price: "৳৭৫০",
      weight: "1kg",
      rating: 4.7,
      emoji: "🌴",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=500",
      desc: "Soft, sweet, and rich in natural fibers. Sourced directly from farms in Qassim, Saudi Arabia."
    },
    {
      id: "prod-4",
      name: "Pure Sidr Powder (Prophetic)",
      category: "Ruqyah Products",
      price: "৳৩৫০",
      weight: "150g",
      rating: 4.9,
      emoji: "🍃",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=500",
      desc: "Finely ground wild Sidr (Lote) leaves, essential for purification rituals and self-ruqyah baths."
    },
    {
      id: "prod-5",
      name: "Hijama Therapy Starter Pump",
      category: "Hijama Equipment",
      price: "৳১,৫০০",
      weight: "1 Unit",
      rating: 4.6,
      emoji: "🔫",
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=500",
      desc: "Clinical-grade hand-held vacuum suction pump with 12 pieces of assorted sterile cups."
    }
  ];

  const openBooking = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const slot = e.target.slot.value;
    const name = e.target.name.value;
    const address = e.target.address.value;
    const serviceOption = e.target.serviceOption.value;

    const basePrice = selectedService?.price ? parseInt(selectedService.price.replace(/[^\d]/g, "")) : 0;
    const finalPrice = serviceOption === "Home" ? basePrice + 2000 : basePrice;

    if (selectedService) {
      createBooking({
        serviceName: selectedService?.title || "",
        serviceType: selectedService?.id?.startsWith("hj") ? "hijama" : "ruqyah",
        date,
        timeSlot: slot,
        serviceOption: serviceOption === "Home" ? "Home Service" : "Center Service",
        totalPrice: finalPrice,
        paymentOption: "Pay in Center",
        landmark: ""
      });
    }

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* BANNER HERO */}
        <BannerCarousel slides={homeSlides} />

        {/* PROPHETIC LUNAR CALENDAR */}
        <section className="bg-emerald-50/60 border-y border-emerald-100 text-slate-800 py-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl -translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl translate-x-20 translate-y-20"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
                  Prophetic Calendar (সুন্নাহ দিনপঞ্জি)
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">Hijama Sunnah Days Tracker</h2>
                <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  The Prophet (ﷺ) said: “Whoever is cupped on the 17th, 19th or 21st (of the Islamic month) will be healed of every disease.” (Sunan Abi Dawud). Schedule your booking accordingly.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-end w-full md:w-auto">
                {[
                  { day: "17th", name: "Jumada I", date: "June 3, 2026", status: "Highly Recommended" },
                  { day: "19th", name: "Jumada I", date: "June 5, 2026", status: "Detox Window" },
                  { day: "21st", name: "Jumada I", date: "June 7, 2026", status: "Sunnah Peak" }
                ].map((item, index) => (
                  <div key={index} className="bg-white border border-emerald-150 hover:border-amber-405 hover:shadow-md transition-all duration-300 p-5 rounded-2xl text-center w-36 sm:w-44 shadow-sm group">
                    <span className="text-[10px] text-amber-600 font-extrabold uppercase tracking-wider block">{item.status}</span>
                    <span className="text-4xl font-black text-emerald-800 mt-1 block group-hover:scale-105 transition-transform">{item.day}</span>
                    <span className="text-xs text-slate-500 mt-1 block font-semibold">{item.name}</span>
                    <span className="text-[10px] text-slate-600 mt-2 block bg-slate-50 py-1 rounded-lg border border-slate-100">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HIJAMA PACKAGES SECTION */}
        <section id="hijama" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Medical Cupping</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Hijama Packages (হিজামা প্যাকেজ)</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">Choose clinical packages performed under strict sanitization standards.</p>
          </div>

          {/* Slider Controls */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => {
                const newIndex = shopIndex === 0 ? 2 : shopIndex - 1;
                setShopIndex(newIndex);
                scrollSlider(newIndex);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-emerald-100 transition-all duration-200"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Cards Viewport */}
            <div className="overflow-x-hidden mx-6" ref={sliderRef}>
              <div className="flex gap-6">
                {hijamaPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    data-card
                    style={{ width: 'calc(33.333% - 16px)', flexShrink: 0 }}
                    className="bg-gradient-to-b from-white via-white to-emerald-50/15 border border-slate-200/60 rounded-3xl p-5 hover:shadow-[0_30px_60px_-15px_rgba(4,120,87,0.12)] hover:border-emerald-500/25 hover:-translate-y-2.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden group"
                  >
                    <div>
                      {/* Package Cover Image with badges */}
                      <div className="h-44 w-full overflow-hidden rounded-2xl relative mb-5 border border-slate-100 shadow-inner">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

                        {/* Floating Badge Tag over Image */}
                        <div className={`absolute top-3.5 right-3.5 text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-sm ${
                          pkg.id === "hj-1"
                            ? "bg-emerald-50/90 text-emerald-800 border-emerald-100"
                            : pkg.id === "hj-2"
                              ? "bg-amber-50/90 text-amber-850 border-amber-200"
                              : "bg-teal-50/90 text-teal-850 border-teal-200"
                        }`}>
                          {pkg.badge}
                        </div>

                        {/* SVG Icon Circle over Image */}
                        <div className="absolute bottom-3.5 left-3.5 w-8.5 h-8.5 rounded-xl bg-white/95 backdrop-blur-sm border border-slate-200/40 flex items-center justify-center shadow-md">
                          <span className="text-emerald-700">
                            {pkg.id === "hj-1" ? (
                              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <circle cx="12" cy="14" r="5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9V4m-2 0h4" />
                              </svg>
                            ) : pkg.id === "hj-2" ? (
                              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                              </svg>
                            ) : (
                              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.196-.393.74-.393.936 0l1.792 3.6A1 1 0 0 0 15 7.62l3.968.324c.438.036.613.58.28.877l-2.99 2.663a1 1 0 0 0-.293.902l.85 3.916c.094.436-.37.772-.75.549l-3.32-1.921a1 1 0 0 0-.96 0l-3.32 1.921c-.38.223-.844-.113-.75-.549l.85-3.916a1 1 0 0 0-.293-.902l-2.99-2.663c-.333-.297-.158-.841.28-.877L7.62 7.62a1 1 0 0 0 .73-.504l1.79-3.6Z" />
                              </svg>
                            )}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-black text-lg sm:text-xl text-slate-800 group-hover:text-emerald-800 transition-colors duration-300">{pkg.title}</h3>
                      <p className="text-xs text-emerald-700 font-extrabold mt-1 tracking-wide">{pkg.bengaliTitle}</p>
                      <p className="text-xs sm:text-sm text-slate-500 mt-3.5 leading-relaxed font-medium">{pkg.desc}</p>

                      <ul className="mt-5 space-y-3">
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

                    <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 font-bold line-through block leading-none tracking-wide">{pkg.originalPrice}</span>
                        <span className="text-2xl font-black text-emerald-800 tracking-tight">{pkg.price}</span>
                      </div>
                      <button
                        onClick={() => openBooking(pkg)}
                        className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white font-bold text-xs px-5 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(4,120,87,0.15)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.25)] active:scale-[0.97] uppercase tracking-wider"
                      >
                        Quick Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const newIndex = shopIndex === 2 ? 0 : shopIndex + 1;
                setShopIndex(newIndex);
                scrollSlider(newIndex);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-emerald-100 transition-all duration-200"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Dot Indicators — 3 positions */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => {
                  setShopIndex(i);
                  scrollSlider(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  shopIndex === i
                    ? "w-6 h-2 bg-emerald-700"
                    : "w-2 h-2 bg-slate-300 hover:bg-emerald-400"
                }`}
                aria-label={`Go to position ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* SHIFA ADVISOR */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Interactive Diagnosis</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">Interactive Shifa Advisor (সুন্নাহ পরামর্শক)</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Select your health concern to find authentic prophetic treatments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              {/* Left Selector List */}
              <div className="md:col-span-4 flex flex-col gap-2.5">
                {[
                  { id: "migraine", label: "Headaches & Migraine", icon: "💆" },
                  { id: "fatigue", label: "Muscle Pain & Fatigue", icon: "💪" },
                  { id: "spiritual", label: "Anxiety & Spiritual Care", icon: "🛡️" },
                  { id: "immunity", label: "Metabolic & Immunity", icon: "🌱" }
                ].map((concern) => (
                  <button
                    key={concern.id}
                    onClick={() => setSelectedConcern(concern.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl text-xs font-black transition-all flex items-center gap-3 border ${
                      selectedConcern === concern.id
                        ? "bg-emerald-800 text-white border-emerald-800 shadow-md shadow-emerald-950/20 translate-x-1"
                        : "bg-white text-slate-700 border-slate-150 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-lg">{concern.icon}</span>
                    <span>{concern.label}</span>
                  </button>
                ))}
              </div>

              {/* Right Result Card */}
              <div className="md:col-span-8 bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-50 rounded-full blur-3xl -z-10 translate-x-6 -translate-y-6"></div>
                
                <div>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {concernsData[selectedConcern].title}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-3">
                    {concernsData[selectedConcern].bengaliTitle}
                  </h3>
                  
                  <div className="mt-5 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/60">
                    <span className="text-[10px] font-black text-emerald-850 uppercase tracking-widest block mb-1">Recommended Solution</span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold font-sans">
                      {concernsData[selectedConcern].recommendation}
                    </p>
                  </div>

                  <blockquote className="mt-6 border-l-4 border-amber-500 pl-4 py-1.5 italic text-xs text-slate-550 bg-amber-50/30 rounded-r-xl pr-2">
                    {concernsData[selectedConcern].hadith}
                  </blockquote>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                  <Link
                    href={concernsData[selectedConcern].link}
                    className="bg-emerald-700 hover:bg-emerald-805 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>{concernsData[selectedConcern].btnText}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RUQYAH SERVICES SECTION */}
        <section id="ruqyah" className="bg-white border-y border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Quranic Cure</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Ruqyah Shariah Recitations (রুকইয়াহ শারইয়াহ)</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">Treat Sihr, Ayn, nightmares, and chronic panic attacks using prophetic recitations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ruqyahServices.map((rq) => (
                <div key={rq.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {rq.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Duration: {rq.duration}</span>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-800 mt-3">{rq.title}</h3>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">{rq.bengaliTitle}</p>
                    <p className="text-xs sm:text-sm text-slate-550 mt-3 leading-relaxed">{rq.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200/50 flex justify-between items-center">
                    <span className="text-base font-black text-emerald-800">{rq.price}</span>
                    <button
                      onClick={() => openBooking(rq)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SHOP PREVIEW SECTION */}
        <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Wellness Shop</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Prophetic Foods & Herbs</h2>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => {
                const newIndex = shopScrollIndex === 0 ? 2 : shopScrollIndex - 1;
                setShopScrollIndex(newIndex);
                scrollShopSlider(newIndex);
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-emerald-100 transition-all duration-200"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Cards Viewport */}
            <div className="overflow-x-hidden mx-6" ref={shopSliderRef}>
              <div className="flex gap-6">
                {shopProducts.map((p) => (
                  <div
                    key={p.id}
                    data-shop-card
                    style={{ width: 'calc(33.333% - 16px)', flexShrink: 0 }}
                    className="bg-white rounded-3xl p-4.5 border border-slate-200/60 shadow-[0_5px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_20px_40px_rgba(4,120,87,0.07)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Visual Image container with Category badge & rating overlay */}
                      <div className="h-44 w-full overflow-hidden rounded-2xl relative mb-4 border border-slate-150 shadow-inner">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Floating emoji circle overlay */}
                        <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-base">
                          {p.emoji}
                        </div>

                        {/* Weight / Qty badge */}
                        <div className="absolute bottom-3 right-3 text-[9px] font-black tracking-wide uppercase px-2.5 py-0.5 rounded-md bg-slate-950/70 text-white backdrop-blur-xs">
                          {p.weight}
                        </div>
                      </div>

                      {/* Category and Rating bar */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-widest">{p.category}</span>
                        <div className="flex items-center gap-1 bg-amber-50/70 border border-amber-150/40 px-2 py-0.5 rounded-md text-[9px] font-extrabold text-amber-800">
                          <span>★</span>
                          <span>{p.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base text-slate-800 leading-tight group-hover:text-emerald-800 transition-colors">
                        {p.name}
                      </h3>

                      {/* Brief description tag */}
                      <p className="text-[11px] text-slate-450 line-clamp-2 mt-2 leading-relaxed font-medium">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100/80 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Price</span>
                        <span className="text-lg font-black text-slate-900 tracking-tight">{p.price}</span>
                      </div>
                      <button
                        onClick={() => {
                          addToCart({ id: p.id, name: p.name, price: p.price, unit: p.weight });
                          addNotification(`Added ${p.name} to cart.`);
                        }}
                        className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-[0_4px_12px_rgba(4,120,87,0.14)] hover:shadow-[0_6px_16px_rgba(4,120,87,0.22)] active:scale-[0.97]"
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => {
                const newIndex = shopScrollIndex === 2 ? 0 : shopScrollIndex + 1;
                setShopScrollIndex(newIndex);
                scrollShopSlider(newIndex);
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-emerald-100 transition-all duration-200"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Dot Indicators — 3 positions */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => {
                  setShopScrollIndex(i);
                  scrollShopSlider(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  shopScrollIndex === i
                    ? "w-6 h-2 bg-emerald-700"
                    : "w-2 h-2 bg-slate-300 hover:bg-emerald-400"
                }`}
                aria-label={`Go to position ${i + 1}`}
              />
            ))}
          </div>
        </section>

      </main>

      {/* APPOINTMENT BOOKING MODAL */}
      {bookingModalOpen && selectedService && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 relative text-slate-850">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="bg-emerald-100 text-emerald-800 p-4 rounded-full w-fit mx-auto mb-4 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">Booking Requested!</h3>
                <p className="text-xs text-slate-500 mt-2">
                  Alhamdulillah, we have registered your slot request. Track this appointment inside your Dashboard.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                    Confirm Appointment Slot
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{selectedService.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedService.bengaliTitle}</p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-650 mb-1">DATE</label>
                      <input
                        type="date"
                        required
                        name="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-650 mb-1">TIME SLOT</label>
                      <select required name="slot" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                        <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                        <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">PATIENT NAME</label>
                    <input
                      type="text"
                      required
                      name="name"
                      defaultValue="Arafat Hossain"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">SERVICE OPTION</label>
                    <select required name="serviceOption" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                      <option value="Center">Center Service (Default)</option>
                      <option value="Home">Home Service (+৳২,০০০ BDT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">HOME VISIT ADDRESS</label>
                    <textarea
                      required
                      name="address"
                      rows={2}
                      defaultValue="House 12, Road 7, Sector 3, Uttara, Dhaka"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold leading-none">Total Cost</span>
                      <span className="text-base font-black text-emerald-800">{selectedService.price}</span>
                    </div>
                    <button
                      type="submit"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
