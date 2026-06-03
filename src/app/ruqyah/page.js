"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";
import RuqyahCard from "@/components/RuqyahCard";

const ruqyahSlides = [
  {
    image: "https://images.unsplash.com/photo-1609599006353-e629f1d29718?q=80&w=1600",
    badge: "ECHO SUNNAH RUQYAH (রুকইয়াহ শারইয়াহ)",
    title: "Quranic Healing & Spiritual Wellness",
    desc: "Heal Jinn affliction, evil eye, Sihr, and anxiety through authentic, strictly Sunnah-compliant Quranic recitations performed by trained theologians."
  },
  {
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600",
    badge: "Divine Remedy",
    title: "Prophetic Cure from Sihr & Ayn",
    desc: "Our senior Raqis provide dedicated sessions for diagnostic recitation and physical cleansing following strictly established prophetic traditions."
  },
  {
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600",
    badge: "Mental Peace",
    title: "Anxiety & Depressive Relief",
    desc: "Combine therapeutic Quranic sound recitations with psychological counseling to find solace and tranquility from severe stress and panic."
  },
  {
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1600",
    badge: "Home & Business Purification",
    title: "Clear Spiritual Blockages",
    desc: "Specialized service involving physical inspection and recitation to purge your household or commercial space of negative energy and hidden magic."
  },
  {
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1600",
    badge: "Daily Protection (Hisn)",
    title: "Daily Spiritual Shields",
    desc: "Learn self-ruqyah guidelines and morning/evening Adhkar to protect yourself and your family on a daily basis from negative influences."
  }
];

export default function RuqyahPage() {
  const { isLoggedIn, createBooking, addNotification } = useApp();

  // Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Symptom Checker State
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState(null);

  const ruqyahSessions = [
    {
      id: "rq-1",
      title: "Basic Package (Short Session)",
      bengaliTitle: "বেসিক প্যাকেজ (সংক্ষিপ্ত সেশন)",
      category: "Basic",
      price: "৳২,০০০",
      duration: "1.5 hours",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
      desc: "Perfect for quick consultation, addressing minor issues, and single-topic spiritual/wellness discussions.",
      benefits: "Quick consultation, minor issues, single-topic discussion",
      whyTake: "Sunnah-compliant spiritual guidance and quick theological advice.",
      forWhom: "Individuals experiencing minor wellness blockages or seeking immediate prophetic counsel.",
      cups: 0
    },
    {
      id: "rq-2",
      title: "Diagnosis Package",
      bengaliTitle: "ডায়াগনসিস প্যাকেজ",
      category: "Diagnosis",
      price: "৳৩,০০০",
      duration: "1.5 hours",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=600",
      desc: "Comprehensive diagnostic session offering full problem analysis, initial spiritual assessment, and detailed analysis.",
      benefits: "Full problem analysis, initial assessment, detailed diagnosis",
      whyTake: "Deep spiritual diagnostic recitation by senior qualified Raqis.",
      forWhom: "Those seeking to understand the root causes of unexplained spiritual or somatic struggles.",
      cups: 0
    },
    {
      id: "rq-3",
      title: "Follow-up Package",
      bengaliTitle: "ফলো-আপ প্যাকেজ",
      category: "Follow-up",
      price: "৳২,০০০",
      duration: "1.5 hours",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600",
      desc: "Dedicated monitoring session best for progress review, recovery updates, and treatment adjustments after diagnosis.",
      benefits: "Progress review, updates, adjustments after diagnosis",
      whyTake: "Ensures therapeutic continuity and adjustment of water/oil recitation shields.",
      forWhom: "Patients undergoing active treatment who need verification of spiritual progress.",
      cups: 0
    },
    {
      id: "rq-4",
      title: "Premium Package (Long Session)",
      bengaliTitle: "প্রিমিয়াম প্যাকেজ (দীর্ঘ সেশন)",
      category: "Premium",
      price: "৳৫,০০০",
      duration: "3 hours",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600",
      desc: "Intensive therapy designed for deep dive work, addressing complex spiritual issues, and full end-to-end solutions.",
      benefits: "Deep dive work, complex issues, full end-to-end solution",
      whyTake: "Extended diagnostic recitation, business/home purification advice, and intensive self-ruqyah training.",
      forWhom: "Individuals dealing with heavy chronic distress, deep-rooted blockages, or severe affliction.",
      cups: 0
    }
  ];

  const raqiDirectory = [
    {
      name: "Mawlana Mufti Abdur Rahman",
      title: "Senior Raqi & Scholar",
      qualifications: "Deoband Kamil Grad, Specialist in Jinn Theology",
      experience: "8+ Years Experience",
      avatar: "AR"
    },
    {
      name: "Ustadh Abu Bakr Al-Azhari",
      title: "Consultant Therapist & Raqi",
      qualifications: "B.A. Shariah, Al-Azhar University, Egypt",
      experience: "6+ Years Experience",
      avatar: "AA"
    },
    {
      name: "Dr. Kamrul Hasan",
      title: "Clinical Psychologist & Raqi",
      qualifications: "M.Sc. Clinical Psychology (DU), Certified Raqi",
      experience: "5+ Years Experience",
      avatar: "KH"
    }
  ];

  const symptomList = [
    { id: "sym-1", label: "Sudden extreme hatred towards spouse (স্বামী/স্ত্রীর প্রতি চরম ঘৃণা)", cat: "Spiritual" },
    { id: "sym-2", label: "Chronic headaches with no medical cause (অকারণ মাথাব্যথা)", cat: "Physical" },
    { id: "sym-3", label: "Severe chest tightness during Salah/Quran (নামাজে বুকে চাপ অনুভূত হওয়া)", cat: "Spiritual" },
    { id: "sym-4", label: "Unexplained constant body pains (অকারণ শরীর ব্যথা)", cat: "Physical" },
    { id: "sym-5", label: "Extreme anxiety, panic attacks, depression (দুশ্চিন্তা ও চরম অস্থিরতা)", cat: "Mental" },
    { id: "sym-6", label: "Violent nightmares or dreams of animals (ভয়ঙ্কর স্বপ্ন বা সাপের স্বপ্ন)", cat: "Spiritual" },
    { id: "sym-7", label: "Chronic laziness or block in business/studies (কাজে চরম অলসতা ও বাধা)", cat: "Spiritual" },
    { id: "sym-8", label: "Frequent sudden mood swings or anger outbursts (অতিরিক্ত রাগ ও মেজাজ খিটখিটে)", cat: "Mental" }
  ];

  const faqs = [
    { q: "রুকইয়াহ কি সত্যিই কাজ করে?", a: "হ্যাঁ, রুকইয়াহ হচ্ছে আল্লাহর কালামের মাধ্যমে চিকিৎসা যা সরাসরি রাসূলুল্লাহ (সা.) এর সুন্নাহ দ্বারা প্রমাণিত। এটি আল্লাহর ইচ্ছায় জাদুটোনা, বদনজর ও ওয়াসওয়াসা দূর করে।" },
    { q: "সেলফ রুকইয়াহ বা নিজে নিজে করা কি সম্ভব?", a: "অবশ্যই সম্ভব। একজন মুসলমানের জন্য সবচেয়ে উত্তম হচ্ছে নিজে নিজে রুকইয়াহ করা। আমরা ওয়েবসাইটে একটি সেলফ রুকইয়াহ গাইড দিয়েছি যা দেখে আপনি শুরু করতে পারেন।" },
    { q: "সেশনের সময় কি কি উপকরণ প্রয়োজন হয়?", a: "সাধারণত একটি পানির বোতল, অলিভ অয়েল এবং সুন্নাহ সম্মত মধু রেডি রাখতে বলা হয় যাতে রাকী সেশন শেষে সেগুলোর ওপর রুকইয়াহ করে দিতে পারেন।" }
  ];

  // Symptom Checker Logic
  const handleSymptomToggle = (id) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const runDiagnosis = () => {
    if (selectedSymptoms.length === 0) {
      setDiagnosisResult("Please select at least one symptom.");
      return;
    }
    const categories = selectedSymptoms.map(sid => symptomList.find(s => s.id === sid).cat);
    const count = categories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    let mainCat = "Spiritual";
    let maxVal = 0;
    Object.keys(count).forEach(key => {
      if (count[key] > maxVal) {
        maxVal = count[key];
        mainCat = key;
      }
    });

    if (mainCat === "Spiritual") {
      setDiagnosisResult({
        verdict: "Possibility of Spiritual Affliction (জাদুটোনা বা বদনজরের প্রভাব)",
        recommendation: "Spiritual Affliction Session (আধ্যাত্মিক রুকইয়াহ সেশন)",
        service: ruqyahSessions[0]
      });
    } else if (mainCat === "Mental") {
      setDiagnosisResult({
        verdict: "High levels of Anxiety or Emotional Fatigue (মানসিক অবসাদ বা দুশ্চিন্তা)",
        recommendation: "Mental Peace & Anxiety Relief (মানসিক প্রশান্তি সেশন)",
        service: ruqyahSessions[1]
      });
    } else {
      setDiagnosisResult({
        verdict: "Physical exhaustion or somatic blockages (শারীরিক ক্লান্তি বা অকারণ ব্যথা)",
        recommendation: "Physical Healing & Shifa Session (শারীরিক নিরাময় সেশন)",
        service: ruqyahSessions[2]
      });
    }
  };

  // Open booking modal
  const openBookingModal = (session) => {
    setSelectedSession(session);
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

    const basePrice = selectedSession?.price ? parseInt(selectedSession.price.replace(/[^\d]/g, "")) : 0;
    const finalPrice = serviceOption === "Home" ? basePrice + 2000 : basePrice;

    if (selectedSession) {
      createBooking({
        serviceName: selectedSession?.title || "",
        serviceType: "ruqyah",
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={ruqyahSlides} />

        {/* Intro */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-50 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-emerald-850">What is Ruqyah Shariah? (রুকইয়াহ কি?)</h2>
              <p className="mt-4 text-sm text-slate-650 leading-relaxed">
                Ruqyah Shariah refers to the recitation of specific verses from the Holy Quran and authentic supplications (Du'as) taught by Prophet Muhammad (ﷺ). It is a spiritual remedy against various evils, diseases, and psychological illnesses. 
              </p>
              <p className="mt-3 text-sm text-slate-650 leading-relaxed">
                Our team ensures absolute theological safety—we strictly avoid any forms of shirk, amulets (taweez), or unIslamic methods, bringing you pure healing grounded in Tawheed.
              </p>
            </div>
            <div className="lg:col-span-5 bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <h3 className="font-bold text-emerald-850 text-sm">Key Foundations of Our Treatment</h3>
              <ul className="mt-3 space-y-2 text-xs text-emerald-900">
                <li className="flex items-center gap-2">✔ Authentic Quranic Verses</li>
                <li className="flex items-center gap-2">✔ Free of Taweez (Amulets) and Shirk</li>
                <li className="flex items-center gap-2">✔ Clinical Counseling Integration</li>
                <li className="flex items-center gap-2">✔ Complete Privacy for Patients</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sessions Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-black text-center text-emerald-850">Premium Ruqyah Sessions</h2>
          <p className="text-center text-xs sm:text-sm text-slate-500 mt-2 mb-10">Select a specialized session crafted by expert scholars</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ruqyahSessions.map((session) => (
              <RuqyahCard
                key={session.id}
                session={session}
                onCardClick={() => openBookingModal(session)}
                onBookClick={openBookingModal}
              />
            ))}
          </div>
        </section>

        {/* Symptom Checker */}
        <section className="bg-slate-100/60 border-y border-slate-200/50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-slate-150">
              <h2 className="text-2xl font-bold text-center text-emerald-850">Interactive Symptoms Checker (রোগ নির্ণায়ক)</h2>
              <p className="text-center text-xs text-slate-500 mt-1 mb-8">
                Select your physical, mental, or spiritual symptoms to get a recommended diagnostic path.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {symptomList.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => handleSymptomToggle(symptom.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                      selectedSymptoms.includes(symptom.id)
                        ? "border-emerald-600 bg-emerald-50/50 text-emerald-900 font-semibold"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <span>{symptom.label}</span>
                    {selectedSymptoms.includes(symptom.id) && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={runDiagnosis}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3 rounded-lg text-sm shadow-md transition-all duration-200"
                >
                  Diagnose & Suggest Session
                </button>
              </div>

              {diagnosisResult && (
                <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100 animate-fadeIn">
                  {typeof diagnosisResult === "string" ? (
                    <p className="text-sm text-rose-600 text-center font-bold">{diagnosisResult}</p>
                  ) : (
                    <div>
                      <span className="text-[10px] bg-amber-400 text-emerald-950 font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Suggested Recommendation
                      </span>
                      <h4 className="text-base font-bold text-emerald-900 mt-2">{diagnosisResult.verdict}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Based on your selections, we highly recommend our <strong>{diagnosisResult.recommendation}</strong>.
                      </p>
                      <button
                        onClick={() => openBookingModal(diagnosisResult.service)}
                        className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg"
                      >
                        Book Suggested Session
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Self-Ruqyah Guide */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 bg-emerald-800 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-amber-400">Self-Ruqyah Guide</h3>
              <h4 className="text-sm font-semibold mt-1">নিজে নিজে রুকইয়াহ করার সুন্নাহ গাইডলাইন</h4>
              <p className="mt-4 text-xs sm:text-sm text-emerald-100 leading-relaxed">
                The best healer is yourself. Reciting protection Du'as and Surahs daily strengthens your spiritual shield (Hisn) against all spiritual harm.
              </p>
              <div className="mt-6 space-y-3 text-xs sm:text-sm">
                <p><strong>1. Intention (নিয়ত):</strong> Purely seeking Shifa from Allah alone.</p>
                <p><strong>2. Perform Wudu (ওযু):</strong> Remain in pure state.</p>
                <p><strong>3. Morning & Evening Azkar:</strong> Daily Al-Mu'awwidhat (Surah Ikhlas, Falaq, Naas) 3 times.</p>
                <p><strong>4. Ayat al-Kursi:</strong> Recited after every obligatory prayer and before sleeping.</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-emerald-850">Practitioner Directory (সার্টিফাইড রাকী)</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">Experienced scholars verified in theological healing</p>

              <div className="space-y-4">
                {raqiDirectory.map((raqi, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-100 p-4 flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-850 flex items-center justify-center font-bold text-sm shrink-0">
                      {raqi.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-800">{raqi.name}</h4>
                      <p className="text-xs text-emerald-700 font-semibold">{raqi.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{raqi.qualifications} • {raqi.experience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
      {bookingModalOpen && selectedSession && (
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
                  Alhamdulillah, we have registered your appointment request. You can track this booking status inside your Dashboard.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                    Confirm Ruqyah Session
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{selectedSession.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">Duration: {selectedSession.duration}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg mb-4 text-[11px] text-slate-600 space-y-1">
                  <p><strong>Benefits:</strong> {selectedSession.benefits}</p>
                  <p><strong>For Whom:</strong> {selectedSession.forWhom}</p>
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

      <Footer />
    </div>
  );
}
