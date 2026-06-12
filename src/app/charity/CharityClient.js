"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";

const charitySlides = [
  {
    image: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?q=80&w=1600",
    badge: "ECHO SUNNAH CHARITY (যাকাত ও চ্যারিটি প্রজেক্ট)",
    title: "Echo Sunnah Humanitarian Charity Projects",
    desc: "Your Sadaqah, Zakat, and donations are 100% deployed to provide clean drinking water, orphans schooling, and free hijama clinical aids to destitute Muslims."
  },
  {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600",
    badge: "Sadaqah Jariyah",
    title: "Clean Water Hand-Pumps & Tube Wells",
    desc: "Install clean water wells in remote drought-hit regions of Bangladesh. Provide daily clean water to thousands of thirsty families."
  },
  {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600",
    badge: "Protecting Generations",
    title: "Sponsor Orphan Children Education",
    desc: "Change the destiny of a child. Provide clothing, school books, healthy meals, and basic living shelter for just ৳২,০০০ a month."
  },
  {
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600",
    badge: "Emergency Relief",
    title: "Feed Hungry Destitute Families",
    desc: "Sponsor food ration packages containing high quality organic staple goods, rice, lentils, oil, and flour to help struggling households."
  },
  {
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600",
    badge: "Zakat Calculations",
    title: "Fast Obligatory Zakat Calculator",
    desc: "Use our interactive tool to calculate Zakat (2.5%) based on your cash savings, gold, silver, and business assets, and pay securely online."
  }
];

export default function CharityClient() {
  const { makeDonation } = useApp();

  // Zakat Calculator state
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [business, setBusiness] = useState("");
  const [receivables, setReceivables] = useState("");
  const [debts, setDebts] = useState("");
  const [goldPrice, setGoldPrice] = useState("11000"); // default approx BDT/g
  const [silverPrice, setSilverPrice] = useState("150"); // default approx BDT/g
  const [zakatPayable, setZakatPayable] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Custom Donation states
  const [donateAmounts, setDonateAmounts] = useState({
    "Water Well Project": "",
    "Orphan Sponsorship": "",
    "Food Distribution": ""
  });

  const charityProjects = [
    {
      name: "Water Well Project",
      bengaliName: "বিশুদ্ধ পানির নলকূপ স্থাপন",
      desc: "Install clean water hand-pumps in draught-affected remote villages of Bangladesh."
    },
    {
      name: "Orphan Sponsorship",
      bengaliName: "এতিম শিশু স্পন্সরশিপ",
      desc: "Provide clothing, academic books, clean shelter, and clinical care for orphans."
    },
    {
      name: "Food Distribution",
      bengaliName: "দুস্থ পরিবারে খাদ্য বিতরণ",
      desc: "Distribute monthly food ration packs (rice, lentils, oil, potatoes) to poor families."
    }
  ];

  const handleCalculateZakat = (e) => {
    e.preventDefault();
    const cashVal = parseFloat(cash) || 0;
    const goldVal = parseFloat(gold) || 0;
    const silverVal = parseFloat(silver) || 0;
    const businessVal = parseFloat(business) || 0;
    const receivablesVal = parseFloat(receivables) || 0;
    const debtsVal = parseFloat(debts) || 0;

    const totalAssets = cashVal + goldVal + silverVal + businessVal + receivablesVal;
    const netAssets = totalAssets - debtsVal;

    const gPrice = parseFloat(goldPrice) || 11000;
    const sPrice = parseFloat(silverPrice) || 150;
    
    // Gold Nisab = 85g, Silver Nisab = 595g
    const goldNisabValue = 85 * gPrice;
    const silverNisabValue = 595 * sPrice;

    const meetsSilver = netAssets >= silverNisabValue;
    const meetsGold = netAssets >= goldNisabValue;

    let due = 0;
    let text = "";

    if (netAssets <= 0) {
      text = "Your net assets are zero or negative. Zakat is not due.";
    } else if (!meetsSilver && !meetsGold) {
      text = `Your net assets (৳${netAssets.toLocaleString()}) are below both the Silver Nisab (৳${silverNisabValue.toLocaleString()}) and Gold Nisab (৳${goldNisabValue.toLocaleString()}) thresholds. Zakat is not obligatory.`;
    } else {
      due = Math.floor(netAssets * 0.025);
      if (meetsGold && meetsSilver) {
        text = `Your net assets (৳${netAssets.toLocaleString()}) meet/exceed both the Silver & Gold Nisab thresholds. Your obligatory Zakat (2.5%) is:`;
      } else {
        text = `Your net assets (৳${netAssets.toLocaleString()}) meet/exceed the Silver Nisab threshold (৳${silverNisabValue.toLocaleString()}) but are below Gold Nisab (৳${goldNisabValue.toLocaleString()}). Zakat is obligatory according to most scholars for mixed assets. Your obligatory Zakat (2.5%) is:`;
      }
    }

    setZakatPayable({
      due,
      totalAssets,
      debtsVal,
      netAssets,
      goldNisabValue,
      silverNisabValue,
      meetsSilver,
      meetsGold,
      text
    });
  };

  const handleDonate = (project) => {
    const amt = parseInt(donateAmounts[project]);
    if (!amt || amt <= 0) return;

    setToastMessage("Online donation payment gateway is coming soon! (অনলাইন পেমেন্ট গেটওয়ে খুব শীঘ্রই আসছে!)");
    setTimeout(() => setToastMessage(null), 4000);
    setDonateAmounts(prev => ({ ...prev, [project]: "" }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={charitySlides} />

        {/* Charity Projects Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-center text-emerald-850 mb-8">Active Donation Campaigns</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {charityProjects.map((proj) => (
              <div key={proj.name} className="bg-white rounded-2xl p-6 border border-slate-105 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-colors">
                <div>
                  <h3 className="font-extrabold text-slate-850 text-lg leading-tight">{proj.name}</h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">{proj.bengaliName}</p>
                  <p className="text-xs text-slate-550 leading-relaxed mt-4">{proj.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2">
                  <input
                    type="number"
                    placeholder="Enter ৳ amount"
                    value={donateAmounts[proj.name]}
                    onChange={(e) => setDonateAmounts(prev => ({ ...prev, [proj.name]: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    onClick={() => handleDonate(proj.name)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shrink-0"
                  >
                    Donate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zakat Calculator */}
        <section className="bg-slate-100 py-16 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-150">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-emerald-850 tracking-tight">Obligatory Zakat Calculator (যাকাত ক্যালকুলেটর)</h2>
              <p className="text-xs sm:text-sm text-slate-500 text-center mt-1.5 mb-8 max-w-2xl mx-auto">
                Easily compute your obligatory Zakat (2.5%) on cash, gold, silver, receivables, and business net holdings according to pure Islamic principles.
              </p>

              <form onSubmit={handleCalculateZakat} className="space-y-6">
                
                {/* Nisab settings */}
                <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-6 border border-emerald-100/80 space-y-4">
                  <h3 className="text-xs font-black text-emerald-800 uppercase tracking-widest">1. Nisab Threshold Settings (নিসাব বাজার মূল্য)</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">GOLD PRICE PER GRAM (৳)</label>
                      <input
                        type="number"
                        value={goldPrice}
                        onChange={(e) => setGoldPrice(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-bold"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block leading-normal">
                        * Used to calculate Gold Nisab (85 grams of pure gold).
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">SILVER PRICE PER GRAM (৳)</label>
                      <input
                        type="number"
                        value={silverPrice}
                        onChange={(e) => setSilverPrice(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-bold"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block leading-normal">
                        * Used to calculate Silver Nisab (595 grams of pure silver).
                      </span>
                    </div>
                  </div>
                </div>

                {/* Assets & Liabilities */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest">2. Your Wealth & Liabilities (সম্পদ ও দায়-দেনা)</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">CASH ON HAND & BANK (৳)</label>
                      <input
                        type="number"
                        placeholder="যেমন: ৫০,০০০ টাকা"
                        value={cash}
                        onChange={(e) => setCash(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">GOLD MARKET VALUE (৳)</label>
                      <input
                        type="number"
                        placeholder="যেমন: ১,২০,০০০ টাকা"
                        value={gold}
                        onChange={(e) => setGold(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">SILVER MARKET VALUE (৳)</label>
                      <input
                        type="number"
                        placeholder="যেমন: ৫,০০০ টাকা"
                        value={silver}
                        onChange={(e) => setSilver(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">BUSINESS ASSETS & STOCK (৳)</label>
                      <input
                        type="number"
                        placeholder="যেমন: ৮০,০০০ টাকা"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">RECEIVABLES / OWED TO YOU (৳)</label>
                      <input
                        type="number"
                        placeholder="যেমন: ১৫,০০০ টাকা"
                        value={receivables}
                        onChange={(e) => setReceivables(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                      <span className="text-[9px] text-slate-400 block mt-0.5 leading-normal">
                        * Owed funds that you are confident will be paid back.
                      </span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">DEBTS & LIABILITIES TO DEDUCT (৳)</label>
                      <input
                        type="number"
                        placeholder="যেমন: ২০,০০০ টাকা"
                        value={debts}
                        onChange={(e) => setDebts(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                      <span className="text-[9px] text-slate-400 block mt-0.5 leading-normal">
                        * Immediate liabilities, utility bills, short-term debt repayments.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-10 py-3.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_14px_rgba(4,120,87,0.2)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.3)] transition-all active:scale-[0.97]"
                  >
                    Calculate Obligatory Zakat
                  </button>
                </div>
              </form>

              {zakatPayable && (
                <div className="mt-8 p-6 sm:p-8 bg-emerald-50 rounded-2xl border border-emerald-100 animate-fadeIn font-sans space-y-4">
                  <div className="border-b border-emerald-100/50 pb-3">
                    <h4 className="text-sm font-black text-emerald-900 tracking-wider uppercase">Calculation Summary (হিসাব বিবরণী)</h4>
                  </div>
                  
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                    <div className="flex justify-between">
                      <span>Total Zakatable Assets (মোট জাকাতযোগ্য সম্পদ):</span>
                      <span className="font-bold">৳{zakatPayable.totalAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liabilities Deducted (বাদ দেওয়া ঋণ/দায়):</span>
                      <span className="font-bold text-red-655">- ৳{zakatPayable.debtsVal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-emerald-100/80 pt-2 pb-1">
                      <span className="font-bold text-slate-900">Net Wealth (নিট সম্পদ):</span>
                      <span className="font-extrabold text-emerald-850">৳{zakatPayable.netAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-2">
                      <span>Silver Nisab Threshold (৫৯৫ গ্রাম রূপার নিসাব সীমা):</span>
                      <span className="flex items-center gap-1.5 font-bold">
                        ৳{zakatPayable.silverNisabValue.toLocaleString()}
                        {zakatPayable.meetsSilver ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-black">MET</span>
                        ) : (
                          <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-black">NOT MET</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gold Nisab Threshold (৮৫ গ্রাম সোনার নিসাব সীমা):</span>
                      <span className="flex items-center gap-1.5 font-bold">
                        ৳{zakatPayable.goldNisabValue.toLocaleString()}
                        {zakatPayable.meetsGold ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-black">MET</span>
                        ) : (
                          <span className="bg-slate-100 text-slate-500 text-[10px] px-1.5 py-0.5 rounded font-black">NOT MET</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-emerald-100/80 pt-4 mt-2">
                    <h5 className="text-xs sm:text-sm font-semibold text-emerald-900 leading-relaxed">
                      {zakatPayable.text}
                    </h5>
                    
                    {zakatPayable.due > 0 && (
                      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/70 p-4 rounded-xl border border-emerald-100">
                        <div className="text-center sm:text-left">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Obligatory Zakat Due (২.৫%)</span>
                          <span className="text-2xl sm:text-3xl font-black text-emerald-800">৳{zakatPayable.due.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => {
                            setToastMessage("Online Zakat payment gateway is coming soon! (অনলাইন যাকাত পেমেন্ট গেটওয়ে খুব শীঘ্রই আসছে!)");
                            setTimeout(() => setToastMessage(null), 4000);
                          }}
                          className="w-full sm:w-auto bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white font-black text-xs px-6 py-3 rounded-xl transition-all shadow-md active:scale-[0.97] uppercase tracking-wider text-center"
                        >
                          Pay Zakat Online Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {toastMessage && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 max-w-sm w-full text-center shadow-2xl relative text-slate-800 animate-scaleIn">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-100">
              ⏳
            </div>
            <h3 className="text-lg font-black text-emerald-900 uppercase tracking-wider">Coming Soon!</h3>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5">খুব শীঘ্রই আসছে!</p>
            <p className="text-xs text-slate-500 leading-relaxed mt-4 font-medium">
              {toastMessage}
            </p>
            <button
              onClick={() => setToastMessage(null)}
              className="mt-6 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-[0.98]"
            >
              Okay (ঠিক আছে)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
