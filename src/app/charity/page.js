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

export default function CharityPage() {
  const { makeDonation } = useApp();

  // Zakat Calculator state
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [business, setBusiness] = useState("");
  const [debts, setDebts] = useState("");
  const [zakatPayable, setZakatPayable] = useState(null);

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
      desc: "Install clean water hand-pumps in draught-affected remote villages of Bangladesh.",
      cost: "৳১৫,০০০ / Well"
    },
    {
      name: "Orphan Sponsorship",
      bengaliName: "এতিম শিশু স্পন্সরশিপ",
      desc: "Provide clothing, academic books, clean shelter, and clinical care for orphans.",
      cost: "৳২,০০০ / Month"
    },
    {
      name: "Food Distribution",
      bengaliName: "দুস্থ পরিবারে খাদ্য বিতরণ",
      desc: "Distribute monthly food ration packs (rice, lentils, oil, potatoes) to poor families.",
      cost: "৳৫০০ / Pack"
    }
  ];

  const handleCalculateZakat = (e) => {
    e.preventDefault();
    const cashVal = parseFloat(cash) || 0;
    const goldVal = parseFloat(gold) || 0;
    const silverVal = parseFloat(silver) || 0;
    const businessVal = parseFloat(business) || 0;
    const debtsVal = parseFloat(debts) || 0;

    const totalAssets = cashVal + goldVal + silverVal + businessVal;
    const netAssets = totalAssets - debtsVal;

    // Nisab threshold (Silver value equivalent, e.g. approx 100,000 BDT)
    const nisabThreshold = 100000;

    if (netAssets <= 0) {
      setZakatPayable({ due: 0, text: "Your net assets are negative. No Zakat is due." });
    } else if (netAssets < nisabThreshold) {
      setZakatPayable({
        due: 0,
        text: `Your net assets (৳${netAssets.toLocaleString()}) are below the Nisab threshold (৳${nisabThreshold.toLocaleString()}). Zakat is not obligatory.`
      });
    } else {
      const due = Math.floor(netAssets * 0.025);
      setZakatPayable({
        due,
        text: `Your net assets (৳${netAssets.toLocaleString()}) exceed the Nisab. Your obligatory Zakat (2.5%) is:`
      });
    }
  };

  const handleDonate = (project) => {
    const amt = parseInt(donateAmounts[project]);
    if (!amt || amt <= 0) return;

    makeDonation(amt, project);
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
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded mt-3 inline-block">
                    {proj.cost}
                  </span>
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
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-slate-150">
              <h2 className="text-2xl font-bold text-center text-emerald-850">Obligatory Zakat Calculator (যাকাত ক্যালকুলেটর)</h2>
              <p className="text-xs text-slate-500 text-center mt-1 mb-8">Calculate Zakat on your cash, gold, silver, and business net holdings (2.5%)</p>

              <form onSubmit={handleCalculateZakat} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-655 mb-1">CASH ON HAND & BANK (৳)</label>
                    <input
                      type="number"
                      placeholder="e.g. 50000"
                      value={cash}
                      onChange={(e) => setCash(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-655 mb-1">GOLD MARKET VALUE (৳)</label>
                    <input
                      type="number"
                      placeholder="e.g. 120000"
                      value={gold}
                      onChange={(e) => setGold(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-655 mb-1">SILVER MARKET VALUE (৳)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={silver}
                      onChange={(e) => setSilver(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-655 mb-1">BUSINESS ASSETS & STOCK (৳)</label>
                    <input
                      type="number"
                      placeholder="e.g. 80000"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-655 mb-1">LIABILITIES & SHORT-TERM DEBTS TO DEDUCT (৳)</label>
                  <input
                    type="number"
                    placeholder="e.g. 20000"
                    value={debts}
                    onChange={(e) => setDebts(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 animate-fadeIn"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3 rounded-lg text-xs shadow-md transition-colors"
                  >
                    Calculate Obligatory Zakat
                  </button>
                </div>
              </form>

              {zakatPayable && (
                <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100 animate-fadeIn">
                  <h4 className="text-sm font-semibold text-slate-700">{zakatPayable.text}</h4>
                  {zakatPayable.due > 0 && (
                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <span className="text-2xl font-black text-emerald-800">৳{zakatPayable.due.toLocaleString()}</span>
                      <button
                        onClick={() => {
                          makeDonation(zakatPayable.due, "Zakat Obligatory Fund");
                          setZakatPayable(null);
                        }}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-md"
                      >
                        Pay Zakat Online Now
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
