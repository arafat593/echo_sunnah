"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";
import HijamaCard from "@/components/HijamaCard";

const hijamaSlides = [
  {
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600",
    badge: "ECHO SUNNAH HIJAMA (হিজামা থেরাপী)",
    title: "Revive The Blessed Sunnah of Cupping",
    desc: "Clinical grade wet cupping (Hijama) carried out under surgical hygiene levels to eliminate somatic pains, metabolic wastes, and systemic stress."
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
    badge: "Uncompromising Hygiene",
    title: "Clinical Sterile Environments",
    desc: "We strictly enforce clinical cleanliness with 100% single-use disposable cupping tools and medical gloves, protecting you from cross-contamination."
  },
  {
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600",
    badge: "Sunnah Calendar",
    title: "Upcoming Prophetic Hijama Dates",
    desc: "Maximize therapeutic benefits by booking your cupping sessions on the 17th, 19th, or 21st days of the Hijri month, recommended by the Prophet (ﷺ)."
  },
  {
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600",
    badge: "Scientific Reflex Points",
    title: "Anatomical Target Placements",
    desc: "Our certified therapists position cups on specialized biological reflex zones, target muscle triggers, and prophetic Al-Kahil zones."
  },
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600",
    badge: "Post-Therapy Care",
    title: "Organic Olive & Black Seed Nourishment",
    desc: "Every wet cupping session is completed with a soothing massage using cold-pressed black seed or olive oil to accelerate skin recovery."
  }
];

export default function HijamaPage() {
  const { createBooking, bookings } = useApp();

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Detail Modal state
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  // Points Guide State
  const [activePoint, setActivePoint] = useState("kahil");

  // Therapist Filter State
  const [genderFilter, setGenderFilter] = useState("all");

  // Booking status search state
  const [searchBookingId, setSearchBookingId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState(null);

  const hijamaPackages = [
    {
      id: "hj-1",
      title: "Sunnah Basic (6 Cups)",
      bengaliTitle: "সুন্নাহ বেসিক (৬টি কাপ)",
      category: "Detox",
      price: "৳১,২০০",
      originalPrice: "৳১,৫০০",
      desc: "Perfect for beginners. Focuses on key wellness and detox points on the upper back.",
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
      features: ["6 Sterile Cups", "Disposable Blades", "Organic Olive Oil Massage", "Sunnah Consultation"],
      cups: 6
    },
    {
      id: "hj-2",
      title: "Sunnah Detox (10 Cups)",
      bengaliTitle: "সুন্নাহ ডিটক্স (১০টি কাপ)",
      category: "Detox",
      price: "৳১,৮০০",
      originalPrice: "৳২,২০০",
      desc: "Comprehensive cleansing for back, shoulders, and legs. Relieves pain and chronic fatigue.",
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1519823551278-64ac928349d2?q=80&w=600",
      features: ["10 Sterile Cups", "Disposable Blades", "Prophetic Herb Sanitization", "Blood Pressure Check"],
      cups: 10
    },
    {
      id: "hj-3",
      title: "Executive Wellness (15 Cups)",
      bengaliTitle: "এক্সিকিউটিভ ওয়েলনেস (১৫টি কাপ)",
      category: "Executive",
      price: "৳২,৫০০",
      originalPrice: "৳৩,০০০",
      desc: "Full-body Sunnah points coverage. Highly recommended for complete metabolic revitalization.",
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600",
      features: ["15 Sterile Cups", "Comprehensive Detox Points", "Black Seed Oil Treatment", "Post-Hijama Energizer Drink"],
      cups: 15
    },
    {
      id: "hj-4",
      title: "Home Service Hijama",
      bengaliTitle: "হোম সার্ভিস হিজামা",
      category: "Home Visit",
      price: "৳৩,৫০০",
      originalPrice: "৳৪,০০০",
      desc: "Certified therapist visits your home with full clinical equipment. Maximum comfort, zero travel.",
      badge: "Home Visit",
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=600",
      features: ["Full Clinical Kit", "Therapist Home Visit", "Pre & Post Consultation", "Sterile Disposable Set"],
      cups: 15
    },
    {
      id: "hj-5",
      title: "Women's Hijama Special",
      bengaliTitle: "মহিলা হিজামা স্পেশাল",
      category: "Sisters Only",
      price: "৳১,৫০০",
      originalPrice: "৳২,০০০",
      desc: "Performed exclusively by certified female therapists in a fully private and comfortable setting.",
      badge: "Sisters Only",
      image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?q=80&w=600",
      features: ["Female Therapist Only", "Private Room Session", "8 Sterile Cups", "Hormone Balance Points"],
      cups: 8
    }
  ];

  const sunnahDates = [
    { date: "June 3, 2026", hijri: "17 Dhul-Hijjah 1447", status: "Highly Recommended (Sunnah Date)" },
    { date: "June 5, 2026", hijri: "19 Dhul-Hijjah 1447", status: "Highly Recommended (Sunnah Date)" },
    { date: "June 7, 2026", hijri: "21 Dhul-Hijjah 1447", status: "Highly Recommended (Sunnah Date)" }
  ];

  const pointsGuide = {
    kahil: { name: "Al-Kahil (আল-কাহিল)", location: "Base of the neck, C7 vertebra", description: "The primary Sunnah point. Relieves toxic load, clears head heaviness, treats 72 illnesses as per Hadith." },
    akhday: { name: "Al-Akhdayain (আল-আখদাইন)", location: "Both sides of the neck behind ears", description: "Relieves headaches, toothaches, ear infections, throat blocks, and facial nerve numbness." },
    kativ: { name: "Al-Katifain (আল-কাতিফাইন)", location: "Shoulder blades", description: "Excellent for posture stress, neck spasms, shoulder stiffness, and respiratory congestion." }
  };

  const therapists = [
    { name: "Dr. Kamrul Hasan", gender: "Male", title: "Senior Therapist & Clinical Advisor", certs: "BPT, Certified Hijama Expert", avatar: "KH" },
    { name: "Therapist Abu Bakr", gender: "Male", title: "Sunnah Cupping Specialist", certs: "Diploma in Prophetic Medicine", avatar: "AB" },
    { name: "Aisha Siddiqa", gender: "Female", title: "Female Therapy Lead", certs: "B.Sc. Nursing, Certified Hijama Practitioner", avatar: "AS" },
    { name: "Fatima Al-Zahra", gender: "Female", title: "Female Wellness Consultant", certs: "Certified Cupping Practitioner", avatar: "FZ" }
  ];

  const filteredTherapists = genderFilter === "all"
    ? therapists
    : therapists.filter(t => t.gender.toLowerCase() === genderFilter);

  const faqs = [
    { q: "হিজামা করার সময় কি ব্যাথা লাগে?", a: "হিজামাতে খুবই হালকা স্ক্র্যাচ করা হয়, যা সুঁই ফোটার চেয়েও কম অনুভূতি দেয়। আমাদের থেরাপিস্টরা খুবই অভিজ্ঞ হওয়ায় রোগীরা কোনো বিশেষ ব্যথা অনুভব করেন না।" },
    { q: "হিজামার জন্য সবচেয়ে ভালো সময় কোনটি?", a: "হিজরি মাসের ১৭, ১৯ এবং ২১ তারিখ হিজামা করার জন্য সর্বোত্তম ও সুন্নাহসম্মত তারিখ। তবে যেকোনো রোগে যেকোনো দিন হিজামা করা জায়েজ।" },
    { q: "হিজামা করার আগে করণীয় কি?", a: "হিজামা করার কমপক্ষে ৩-৪ ঘণ্টা আগে ভারী খাবার গ্রহণ থেকে বিরত থাকতে হবে এবং শরীর হাইড্রেটেড রাখতে পর্যাপ্ত পানি পান করতে হবে।" }
  ];

  const handlePointClick = (pointKey) => {
    setActivePoint(pointKey);
  };

  const openBookingModal = (pkg) => {
    setSelectedPackage(pkg);
    setBookingModalOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const slot = e.target.slot.value;
    const name = e.target.name.value;
    const address = e.target.address.value;
    const landmark = e.target.landmark.value;
    const serviceOption = e.target.serviceOption.value;
    const paymentOption = e.target.paymentOption.value;

    const basePrice = selectedPackage?.price ? parseInt(selectedPackage.price.replace(/[^\d]/g, "")) : 0;
    const finalPrice = serviceOption === "Home" ? basePrice + 2000 : basePrice;

    if (selectedPackage) {
      createBooking({
        serviceName: selectedPackage?.title || "",
        serviceType: "hijama",
        date,
        timeSlot: slot,
        serviceOption: serviceOption === "Home" ? "Home Service" : "Center Service",
        totalPrice: finalPrice,
        paymentOption,
        landmark
      });
    }

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingSuccess(false);
    }, 2500);
  };

  const handleBookingSearch = (e) => {
    e.preventDefault();
    if (!searchBookingId) return;
    const found = bookings.find(b => b?.id?.toLowerCase() === searchBookingId.trim().toLowerCase());
    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult("No booking found with this ID.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={hijamaSlides} />

        {/* Intro & Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-emerald-850">What is Hijama? (হিজামা কি?)</h2>
              <p className="mt-4 text-sm text-slate-650 leading-relaxed">
                Hijama, or wet cupping, is a healing therapy where vacuum pressure is created using sterile cups on specific biological reflex points on the skin. A tiny, painless superficial scratch is made to draw out stagnant, waste-filled capillary blood.
              </p>
              <p className="mt-3 text-sm text-slate-650 leading-relaxed">
                The Prophet Muhammad (ﷺ) said: <em>"Indeed the best of remedies you have is cupping (Hijama)..."</em> [Sahih al-Bukhari 5371]. It serves as a dual-mechanism healing for both metabolic body toxins and general biological wellness.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-bold text-emerald-850 text-sm">Biological & Physical Benefits</h3>
              <div className="grid grid-cols-2 gap-4 mt-4 text-xs text-slate-600">
                <p>✔ Boosts Immune Response</p>
                <p>✔ Clears Micro-circulatory Blocks</p>
                <p>✔ Alleviates Myofascial Spasms</p>
                <p>✔ Relieves Migraine Trigger Points</p>
                <p>✔ Decreases Inflammatory Cytokines</p>
                <p>✔ Triggers Natural Endorphins</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
          <h2 className="text-2xl font-black text-center text-emerald-850">Top Hijama Packages</h2>
          <p className="text-center text-xs sm:text-sm text-slate-500 mt-2 mb-10">Select a specialized cupping package suited for your health profile</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hijamaPackages.map((pkg) => (
              <HijamaCard
                key={pkg.id}
                pkg={pkg}
                onCardClick={() => {
                  setSelectedDetailItem({ ...pkg, type: 'package' });
                  setDetailModalOpen(true);
                }}
                onBookClick={openBookingModal}
              />
            ))}
          </div>
        </section>

        {/* Sunnah Dates Calendar */}
        <section className="bg-emerald-950 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-amber-400">Upcoming Sunnah Hijama Dates</h2>
            <p className="text-center text-xs text-emerald-200 mt-1 mb-8">
              Cupping during the 17th, 19th, and 21st Hijri dates contains maximum therapeutic barakah.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sunnahDates.map((d, idx) => (
                <div key={idx} className="bg-emerald-900/60 border border-emerald-850 rounded-xl p-5 text-center">
                  <span className="text-xs font-bold text-amber-400 block">{d.hijri}</span>
                  <span className="text-lg font-black block mt-1">{d.date}</span>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-3 py-1 rounded-full inline-block mt-3">
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hijama Points Guide */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Point Indicator Mock */}
            <div className="lg:col-span-5 bg-slate-100 rounded-2xl p-6 border border-slate-200 text-center relative">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Click Point to View Details</h3>
              <div className="w-56 h-72 mx-auto bg-slate-200 rounded-full relative flex items-center justify-center border border-slate-350">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Human Upper Back</span>
                
                {/* Kahil Point */}
                <button
                  onClick={() => handlePointClick("kahil")}
                  className={`absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 transition-all ${
                    activePoint === "kahil" ? "bg-amber-400 border-emerald-800 scale-110" : "bg-emerald-700 border-white text-white"
                  }`}
                >
                  P1
                </button>

                {/* Akhdayain Point */}
                <button
                  onClick={() => handlePointClick("akhday")}
                  className={`absolute top-16 left-1/4 w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 transition-all ${
                    activePoint === "akhday" ? "bg-amber-400 border-emerald-800 scale-110" : "bg-emerald-700 border-white text-white"
                  }`}
                >
                  P2
                </button>

                {/* Katifain Point */}
                <button
                  onClick={() => handlePointClick("kativ")}
                  className={`absolute top-28 left-2/3 w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 transition-all ${
                    activePoint === "kativ" ? "bg-amber-400 border-emerald-800 scale-110" : "bg-emerald-700 border-white text-white"
                  }`}
                >
                  P3
                </button>
              </div>
            </div>

            {/* Point Description */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-emerald-850">Hijama Reflex Points Guide</h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">Interactive guide on primary prophetic cupping points</p>

              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h4 className="font-extrabold text-emerald-850 text-base">{pointsGuide[activePoint].name}</h4>
                <p className="text-xs text-amber-600 font-bold mt-1">Location: {pointsGuide[activePoint].location}</p>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed mt-3">
                  {pointsGuide[activePoint].description}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Before / After Guidelines */}
        <section className="bg-slate-100 py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-150">
              <h3 className="text-lg font-bold text-emerald-850 border-b border-slate-100 pb-3">Before Hijama Guidelines (হিজামার পূর্ব প্রস্তুতি)</h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">✔ Fast 3-4 hours prior to the session. Water is allowed.</li>
                <li className="flex items-start gap-2">✔ Avoid heavy workouts or physical labor on treatment day.</li>
                <li className="flex items-start gap-2">✔ Maintain proper hydration—drink at least 2 liters of water.</li>
                <li className="flex items-start gap-2">✔ Take a clean shower before attending the appointment.</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-150">
              <h3 className="text-lg font-bold text-emerald-850 border-b border-slate-100 pb-3">After Hijama Guidelines (হিজামা পরবর্তী যত্ন)</h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">✔ Avoid dairy, red meat, and seafood for 24 hours.</li>
                <li className="flex items-start gap-2">✔ Rest for at least 12 hours after the session.</li>
                <li className="flex items-start gap-2">✔ Avoid bathing or rubbing the scratches for 24 hours.</li>
                <li className="flex items-start gap-2">✔ Apply cold-pressed black seed oil over cupping scratches.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practitioner Directory with Gender Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-emerald-850">Certified Practitioners (থেরাপিস্ট তালিকা)</h2>
              <p className="text-xs text-slate-500 mt-1">We maintain complete male-to-male and female-to-female therapist policies.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setGenderFilter("all")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  genderFilter === "all" ? "bg-emerald-700 text-white" : "bg-white border border-slate-200 text-slate-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setGenderFilter("male")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  genderFilter === "male" ? "bg-emerald-700 text-white" : "bg-white border border-slate-200 text-slate-700"
                }`}
              >
                Male Experts
              </button>
              <button
                onClick={() => setGenderFilter("female")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  genderFilter === "female" ? "bg-emerald-700 text-white" : "bg-white border border-slate-200 text-slate-700"
                }`}
              >
                Female Experts
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTherapists.map((t, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-100 p-5 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-850 flex items-center justify-center font-bold mx-auto mb-3">
                  {t.avatar}
                </div>
                <h4 className="font-bold text-sm text-slate-800">{t.name}</h4>
                <p className="text-[11px] text-emerald-700 font-semibold">{t.title}</p>
                <p className="text-[10px] text-slate-400 mt-2">{t.certs}</p>
                <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-3 inline-block font-bold">
                  {t.gender} Patient Specialist
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Training Programs Banner & Search Booking */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Training Programs */}
          <div className="lg:col-span-7 bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200">
            <h3 className="text-lg font-bold text-emerald-850">Echo Sunnah Cupping Academy</h3>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed mt-2">
              Interested in becoming a certified Hijama therapist? Join our 3-month comprehensive diploma covering clinical hygiene, blood anatomy, negative pressure dynamics, and Sunnah points. Includes hands-on clinical internships.
            </p>
            <button className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg">
              Explore Training Programs
            </button>
          </div>

          {/* Search Booking Status */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-150 shadow-sm">
            <h3 className="text-base font-bold text-slate-800">Check Booking Status (বুকিং স্ট্যাটাস চেক)</h3>
            <form onSubmit={handleBookingSearch} className="flex gap-2 mt-4">
              <input
                type="text"
                required
                placeholder="e.g. BK-8739"
                value={searchBookingId}
                onChange={(e) => setSearchBookingId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
              <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 rounded-lg shrink-0">
                Inquire
              </button>
            </form>

            {searchResult && (
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs animate-fadeIn">
                {typeof searchResult === "string" ? (
                  <p className="text-rose-600 font-bold">{searchResult}</p>
                ) : (
                  <div className="space-y-1">
                    <p><strong>Service:</strong> {searchResult.serviceName}</p>
                    <p><strong>Scheduled:</strong> {searchResult.date} ({searchResult.timeSlot})</p>
                    <p><strong>Option:</strong> {searchResult.serviceOption}</p>
                    <p><strong>Payable:</strong> ৳{searchResult.totalPrice}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`font-bold uppercase ${
                        searchResult.status === "Upcoming" ? "text-emerald-700 animate-pulse" : "text-slate-500"
                      }`}>
                        {searchResult.status}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </section>

        {/* FAQs */}
        <section className="bg-white py-16 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-emerald-850 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800"
                  >
                    <span>{faq.q}</span>
                    <span className="text-emerald-700 font-black">{activeFaq === idx ? "−" : "+"}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 border-t border-slate-50 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* APPOINTMENT BOOKING MODAL */}
      {bookingModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 relative text-slate-800">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-650"
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
                <h3 className="text-xl font-bold text-slate-850">Booking Requested!</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Alhamdulillah, we have registered your Hijama appointment. You can track this booking status inside your Dashboard.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                    Confirm Hijama Appointment
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{selectedPackage.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">Cups Quantity: {selectedPackage.cups} cups</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg mb-4 text-[11px] text-slate-600 space-y-1">
                  <p><strong>Benefits:</strong> {selectedPackage.benefits}</p>
                  <p><strong>Clinical Note:</strong> {selectedPackage.whyTake}</p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">DATE</label>
                      <input
                        type="date"
                        required
                        name="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">TIME SLOT</label>
                      <select required name="slot" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                        <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                        <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">PATIENT NAME</label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="e.g. Arafat Hossain"
                      defaultValue="Arafat Hossain"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">SERVICE OPTION</label>
                    <select required name="serviceOption" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                      <option value="Center">Center Service (Default)</option>
                      <option value="Home">Home Service (+৳২,০০০ BDT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">HOME ADDRESS (FOR VISIT)</label>
                    <textarea
                      required
                      name="address"
                      rows={2}
                      defaultValue="House 12, Road 7, Sector 3, Uttara, Dhaka"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">LANDMARK / NOTE</label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="e.g. Near Sector 3 Mosque"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">PAYMENT OPTION</label>
                      <select required name="paymentOption" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                        <option value="Pay Now (Online)">Pay Now (Online)</option>
                        <option value="Pay in Center">Pay in Center (Later)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-end pt-3">
                      <button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold w-full py-2.5 rounded-lg shadow-md"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ITEM DETAIL MODAL */}
      {detailModalOpen && selectedDetailItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden relative text-slate-850 max-h-[90vh] flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setDetailModalOpen(false)}
              className="absolute top-4 right-4 text-white bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-sm rounded-full p-2 z-10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Header */}
            <div className="h-56 sm:h-64 w-full relative shrink-0">
              <img
                src={selectedDetailItem.image}
                alt={selectedDetailItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-[10px] bg-amber-400 text-emerald-950 font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedDetailItem.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2">
                  {selectedDetailItem.title}
                </h3>
                {selectedDetailItem.bengaliTitle && (
                  <p className="text-xs text-emerald-300 font-extrabold mt-0.5">{selectedDetailItem.bengaliTitle}</p>
                )}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Description</span>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  {selectedDetailItem.desc}
                </p>
              </div>

              {/* Hijama Specific Features */}
              {selectedDetailItem.features && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">What's Included</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDetailItem.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-slate-655 font-bold">
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
              )}
            </div>

            {/* Action Bar */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold leading-none">Price</span>
                <span className="text-2xl font-black text-emerald-800">{selectedDetailItem.price}</span>
              </div>

              <button
                onClick={() => {
                  setDetailModalOpen(false);
                  openBookingModal(selectedDetailItem);
                }}
                className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md active:scale-[0.97] uppercase tracking-wider"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
