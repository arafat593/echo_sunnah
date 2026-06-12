"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";

const jobsSlides = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
    badge: "ECHO SUNNAH JOBS (ক্যারিয়ার ও কর্মসংস্থান)",
    title: "Join Our Prophetic Wellness Mission",
    desc: "Work with us to revive the Sunnah of cupping and theology. Apply for full-time therapist, Raqi, or administrative coordinator roles."
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600",
    badge: "Hijama Specialists",
    title: "Female Hijama Therapists Wanted",
    desc: "We are hiring certified female nurses and physiotherapists to coordinate and operate hygienic cupping sessions in separate, dedicated private chambers."
  },
  {
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1600",
    badge: "Quranic Healing Careers",
    title: "Opportunities for Verified Raqis",
    desc: "Lead diagnostic and healing sessions for evil eye, Sihr, and anxiety. Kamil graduates with experience in self-ruqyah training are welcome to apply."
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600",
    badge: "Administrative Excellence",
    title: "Medical & Center Coordinator Roles",
    desc: "Manage doctor appointments scheduling, handle shop product inventories, and guide patients on booking guidelines at our Uttara and Mirpur centers."
  },
  {
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1600",
    badge: "Empowering Talents",
    title: "Grow Professionally & Spiritually",
    desc: "At Echo Sunnah, we provide safe workplaces, competitive salaries, continuous clinical training, and spiritual mentorship circles for our employees."
  }
];

export default function JobsClient() {
  const { addNotification } = useApp();
  const [applySuccess, setApplySuccess] = useState(false);

  const jobOpenings = [
    {
      id: "jb-1",
      title: "Female Hijama Therapist",
      bengaliTitle: "মহিলা হিজামা থেরাপিস্ট",
      type: "Full-Time",
      location: "Uttara Center, Dhaka",
      salary: "৳২৫,০০০ - ৳৩৫,০০০ / Month",
      requirements: "B.Sc Nursing / Diploma in Physiotherapy. Certified cupping expert with 1+ year practical clinical cupping exposure.",
      desc: "Perform hygienic cupping sessions for female patients. Maintain sterile instruments logs."
    },
    {
      id: "jb-2",
      title: "Senior Quranic Raqi",
      bengaliTitle: "সিনিয়র রুকইয়াহ প্র্যাকটিশনার (রাকী)",
      type: "Part-Time",
      location: "Remote & Home-Visits",
      salary: "৳২০,০০০ - ৳৩০,০০০ / Month",
      requirements: "Kamil Scholar / Graduate in Shariah. Strong knowledge of Jinn theology, Hadith sciences, and 3+ years Ruqyah experience.",
      desc: "Conduct self-ruqyah training programs and lead home-purification sessions under strictly Sunnah guidelines."
    },
    {
      id: "jb-3",
      title: "Medical & Center Coordinator",
      bengaliTitle: "মেডিকেল ও সেন্টার সমন্বয়কারী",
      type: "Full-Time",
      location: "Mirpur Branch, Dhaka",
      salary: "৳১৮,০০০ - ৳২৪,০০০ / Month",
      requirements: "Bachelor's Degree. Strong communications, customer service experience, basic Excel/PC skills.",
      desc: "Manage doctor appointments scheduling, handle shop product inventories, and guide patients on booking guidelines."
    }
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    const jobTitle = e.target.job.value;
    const applicant = e.target.name.value;

    addNotification(`Jazakallah! HR has received application for "${jobTitle}" from ${applicant}. We will email you.`);
    setApplySuccess(true);
    e.target.reset();
    setTimeout(() => {
      setApplySuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={jobsSlides} />

        {/* Job Listings */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* List of roles */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-lg font-bold text-slate-800">Available Positions</h2>
            
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:border-emerald-300 transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">{job.title}</h3>
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">{job.bengaliTitle}</p>
                    <p className="text-xs text-slate-400 mt-1">{job.location} • <span className="font-bold text-emerald-800">{job.type}</span></p>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full shrink-0">
                    {job.salary}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-650 mt-4 leading-relaxed">{job.desc}</p>
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-550 leading-relaxed">
                  <strong>Requirements:</strong> {job.requirements}
                </div>
              </div>
            ))}
          </div>

          {/* Careers Application Form */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm sticky top-[160px]">
              <h3 className="font-bold text-emerald-850 text-base">Quick Application</h3>
              <p className="text-xs text-slate-550 mt-1 mb-6">Submit your profile to apply for active openings</p>

              {applySuccess ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center text-xs text-emerald-800 font-bold">
                  Application Sent Successfully!
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">FULL NAME</label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="e.g. Abdullah Hasan"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">PHONE NUMBER</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +880 1711-000000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">POSITION APPLIED FOR</label>
                    <select required name="job" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                      <option value="Female Hijama Therapist">Female Hijama Therapist</option>
                      <option value="Senior Quranic Raqi">Senior Quranic Raqi</option>
                      <option value="Medical & Center Coordinator">Medical & Center Coordinator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">COVER NOTE / EXPERIENCES</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Summarize your professional qualifications..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-lg text-xs shadow-md"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}
