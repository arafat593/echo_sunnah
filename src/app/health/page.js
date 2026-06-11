"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerCarousel from "@/components/BannerCarousel";

const healthSlides = [
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600",
    badge: "ECHO SUNNAH HEALTH (সুন্নাহ স্বাস্থ্য ও পুষ্টি)",
    title: "Prophetic Lifestyle & Wellness Science",
    desc: "Reviving Sunnah routines, sleeping guidelines, nutritional frameworks, and interactive clinical calculators for family health."
  },
  {
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1600",
    badge: "Sunnah Diets",
    title: "Prophetic Portion Rule (1/3rd Capacity)",
    desc: "Avoid modern metabolic obesity by adopting the prophetic moderation framework: 1/3rd space for food, 1/3rd for liquid, and 1/3rd for easy respiration."
  },
  {
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600",
    badge: "Physical Activity",
    title: "Fitness & Strength",
    desc: "Prophet Muhammad (ﷺ) emphasized active, strong believers. Engage in healthy physical disciplines and sunnah cardio activities."
  },
  {
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1600",
    badge: "Expectant Mothers",
    title: "Pregnancy & Postnatal Guidance",
    desc: "Nurture new generations through prophetic diets, daily dhikr recitation, and natural breastfeeding nutrition support."
  },
  {
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1600",
    badge: "Intermittent Fasting",
    title: "Mondays & Thursdays Sunnah Fasts",
    desc: "Clear cellular trash and regenerate insulin sensitivity through the regular, scientifically-validated practice of voluntary Sunnah fasts."
  }
];

export default function HealthPage() {
  // BMI Calculator State
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  // Water Calculator State
  const [userWeight, setUserWeight] = useState("");
  const [waterResult, setWaterResult] = useState(null);

  const calculateBmi = (e) => {
    e.preventDefault();
    if (!weight || !height) return;
    const heightInMeters = parseFloat(height) / 100;
    const bmiVal = parseFloat(weight) / (heightInMeters * heightInMeters);
    const score = bmiVal.toFixed(1);

    let category = "Normal Weight";
    let advice = "Masha'Allah, you are in a healthy range. Maintain this through Sunnah eating habits (1/3 food, 1/3 water, 1/3 air).";

    if (bmiVal < 18.5) {
      category = "Underweight";
      advice = "We recommend incorporating nutrient-dense prophetic foods like dates, talbinah, and olive oil into your daily diet.";
    } else if (bmiVal >= 25 && bmiVal < 30) {
      category = "Overweight";
      advice = "Prophet Muhammad (ﷺ) advised against overeating. Try intermittent fasting (Mondays and Thursdays) and portion control.";
    } else if (bmiVal >= 30) {
      category = "Obese";
      advice = "Consider a consult for clinical detoxification and Hijama cupping. Regular exercise and reducing processed sugars is highly recommended.";
    }

    setBmiResult({ score, category, advice });
  };

  const calculateWater = (e) => {
    e.preventDefault();
    if (!userWeight) return;
    // Calculate water: Weight in kg * 35 ml
    const liters = (parseFloat(userWeight) * 0.035).toFixed(1);
    setWaterResult({
      liters,
      glasses: Math.ceil(liters / 0.25)
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={healthSlides} />

        {/* Sunnah Lifestyle Tips */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-emerald-850 text-center mb-8">Fundamental Sunnah Routines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <span className="text-3xl">🌙</span>
              <h3 className="font-bold text-slate-850 mt-3 text-base">Sleeping Etiquette (ঘুমের সুন্নাহ)</h3>
              <p className="text-xs text-slate-550 leading-relaxed mt-2">
                Sleep early after Isha prayer and wake up early for Tahajjud and Fajr. Always sleep on your right side with your right hand under your cheek, and recite daily protection Du&apos;as.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <span className="text-3xl">🥣</span>
              <h3 className="font-bold text-slate-850 mt-3 text-base">Diet & Eating (খাদ্যাভ্যাস)</h3>
              <p className="text-xs text-slate-550 leading-relaxed mt-2">
                Avoid overeating. The Prophet (ﷺ) said: &quot;A human fills no vessel worse than his stomach. A few morsels are enough... 1/3 food, 1/3 drink, 1/3 breath.&quot; [Sunan at-Tirmidhi].
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <span className="text-3xl">🏃</span>
              <h3 className="font-bold text-slate-850 mt-3 text-base">Physical Activity (শারীরিক কসরত)</h3>
              <p className="text-xs text-slate-550 leading-relaxed mt-2">
                Participate in active sports like archery, swimming, running, and horseback riding. Physical fitness aids devotion and acts as a barrier against modern lethargy.
              </p>
            </div>
          </div>
        </section>

        {/* Gender / Maternal Guides */}
        <section className="bg-slate-100 py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-150 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-850 border-b border-slate-100 pb-3">Pregnancy & Child Care (মাতৃত্ব ও শিশু যত্ন)</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed mt-3">
                Prophetic guidelines for expectant mothers include regular recitation of Surah Maryam and eating foods rich in vitamins like dates, milk, and olive oil. Postpartum care emphasizes breastfeeding up to 2 years as highlighted in the Quran, providing optimum child immunity.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-150 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-850 border-b border-slate-100 pb-3">Men & Women Wellness (নারী ও পুরুষের স্বাস্থ্য)</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed mt-3">
                Addressing physical wellness through biological hygiene and Sunnah routines. Promotes herbal support, stress relaxation, pelvic exercises, sleep hygiene, and specialized hijama therapy sessions for hormonal balance in both men and women.
              </p>
            </div>
          </div>
        </section>

        {/* Health Calculators */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* BMI Calculator */}
          <div className="bg-white rounded-2xl border border-slate-150 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-850 mb-1">BMI Health Calculator</h3>
            <p className="text-xs text-slate-500 mb-6">Calculate your Body Mass Index for weight-management recommendations</p>

            <form onSubmit={calculateBmi} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-650 mb-1">WEIGHT (KG)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-650 mb-1">HEIGHT (CM)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
              <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow">
                Calculate BMI
              </button>
            </form>

            {bmiResult && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-fadeIn text-xs">
                <p><strong>BMI Score:</strong> {bmiResult.score}</p>
                <p className="mt-1"><strong>Status Category:</strong> <span className="font-bold text-emerald-800">{bmiResult.category}</span></p>
                <p className="mt-2 text-slate-600 border-t border-emerald-100 pt-2 leading-relaxed">
                  <strong>Sunnah Advice:</strong> {bmiResult.advice}
                </p>
              </div>
            )}
          </div>

          {/* Water Calculator */}
          <div className="bg-white rounded-2xl border border-slate-150 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-850 mb-1">Water Intake Calculator</h3>
            <p className="text-xs text-slate-500 mb-6">Determine your optimal daily water intake and read prophetic drinking manners</p>

            <form onSubmit={calculateWater} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-650 mb-1">YOUR WEIGHT (KG)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 65"
                  value={userWeight}
                  onChange={(e) => setUserWeight(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
              <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow">
                Calculate Water Needs
              </button>
            </form>

            {waterResult && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-fadeIn text-xs">
                <p><strong>Daily Target:</strong> {waterResult.liters} Liters (Approx. {waterResult.glasses} glasses of 250ml)</p>
                
                <div className="mt-3 border-t border-emerald-100 pt-2 text-slate-600 space-y-1 leading-relaxed">
                  <p className="font-bold text-emerald-800">Sunnah Drinking Manners:</p>
                  <p>• Sit down before drinking (do not stand).</p>
                  <p>• Drink in 3 slow breaths (do not gulp in one go).</p>
                  <p>• Recite <em>Bismillah</em> before starting, and <em>Alhamdulillah</em> at the end.</p>
                </div>
              </div>
            )}
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
