"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";

const communitySlides = [
  {
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1600",
    badge: "ECHO SUNNAH COMMUNITY (আলোচনা ও স্বেচ্ছাসেবক ফোরাম)",
    title: "Echo Sunnah Discussion Forum & Q&A Support",
    desc: "Share health updates, ask question to qualified Raqis and therapists, and join volunteer campaigns for charity projects."
  },
  {
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1600",
    badge: "Medical Cupping Dialogues",
    title: "Share Your Hijama Experience",
    desc: "Join conversations with community members discussing clinical benefits, recovery times, and prophetic dates schedules."
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600",
    badge: "Ask The Experts",
    title: "Direct Channels to Verified Raqis",
    desc: "Post your questions about spiritual treatment, symptoms of Ayn or Sihr, and get theological counseling from qualified scholars."
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600",
    badge: "Charity Operations",
    title: "Become a Volunteer Today",
    desc: "Register to participate in organizing medical camps, digging tube wells, and delivering winter clothing to underprivileged villages."
  },
  {
    image: "https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1600",
    badge: "Islamic Studies circle",
    title: "Theology & Academy Study Groups",
    desc: "Coordinate studies with other students on Tajweed masterclasses, Tibb An-Nabawi basics, and daily practical Fiqh."
  }
];

export default function CommunityPage() {
  const { addNotification } = useApp();

  const [forumThreads, setForumThreads] = useState([
    {
      id: 1,
      title: "Symptom check: Severe headache after self-ruqyah, is it normal?",
      bengaliTitle: "সেলফ রুকইয়াহ করার পর তীব্র মাথাব্যথা, এটা কি স্বাভাবিক?",
      author: "Hasan Karim",
      replies: 5,
      views: 42,
      category: "Ruqyah Discussion"
    },
    {
      id: 2,
      title: "Hijama during Dhul-Hijjah Sunnah dates feedback",
      bengaliTitle: "জিলহজ্জ মাসের সুন্নাহ তারিখগুলোতে হিজামা করার অভিজ্ঞতা",
      author: "Amina Rahman",
      replies: 12,
      views: 110,
      category: "Hijama Experiences"
    },
    {
      id: 3,
      title: "Recommend books on Islamic theology for young children",
      bengaliTitle: "শিশুদের জন্য আকীদাহ ও ইসলামিক ইতিহাসের বইয়ের তালিকা",
      author: "Tareq Jamil",
      replies: 3,
      views: 18,
      category: "Theology & Academy"
    }
  ]);

  const [questionInput, setQuestionInput] = useState("");
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!questionInput) return;

    const newThread = {
      id: Date.now(),
      title: questionInput,
      bengaliTitle: "সরাসরি প্রশ্নোত্তর ফোরাম",
      author: "You (Arafat Center)",
      replies: 0,
      views: 1,
      category: "Q&A Support"
    };

    setForumThreads(prev => [newThread, ...prev]);
    addNotification(`Question posted: "${questionInput}" successfully published in discussion board.`);
    setQuestionInput("");
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    addNotification("Jazakallah! You have registered as an Echo Sunnah Charity Volunteer. We will contact you on WhatsApp.");
    setVolunteerSuccess(true);
    e.target.reset();
    setTimeout(() => {
      setVolunteerSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={communitySlides} />

        {/* Discussion Forum */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Threads List */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Recent Forum Discussions</h2>
            
            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-sm">
              {forumThreads.map((thread) => (
                <div key={thread.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors flex justify-between items-center gap-4">
                  <div>
                    <span className="bg-emerald-50 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded">
                      {thread.category}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-2 leading-snug hover:text-emerald-800 cursor-pointer">
                      {thread.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Posted by {thread.author}</p>
                  </div>
                  <div className="text-right shrink-0 flex gap-4 text-xs font-semibold text-slate-500">
                    <div>
                      <span className="block font-black text-slate-700 text-center">{thread.replies}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Replies</span>
                    </div>
                    <div>
                      <span className="block font-black text-slate-700 text-center">{thread.views}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ask Question form */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mt-8">
              <h3 className="font-bold text-emerald-850 text-base">Ask a Question to Experts</h3>
              <p className="text-xs text-slate-400 mt-0.5 mb-4">Your posts will be checked and replied by qualified doctors/clerics</p>
              <form onSubmit={handleAskQuestion} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. Can pregnant women get dry cupping therapy?"
                  value={questionInput}
                  onChange={(e) => setQuestionInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                />
                <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 rounded-lg shrink-0">
                  Post Question
                </button>
              </form>
            </div>

          </div>

          {/* Volunteer registration */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm sticky top-[160px]">
              <h3 className="font-bold text-emerald-850 text-base">Volunteer Registration</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Register as a volunteer to help distribute charity supplies, set up free medical camps, and manage mosque structures.
              </p>

              {volunteerSuccess ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center text-xs text-emerald-800 font-bold">
                  Volunteer Application Received! We will contact you soon.
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">FULL NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hasan Kabir"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">WHATSAPP PHONE NUMBER</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +880 1700-000000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">PROJECT OF INTEREST</label>
                    <select required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                      <option value="Water Well Distribution">Water Well Projects</option>
                      <option value="Free Hijama Medical Camps">Free Hijama Medical Camps</option>
                      <option value="Orphan Sponsorship Operations">Orphan Sponsorship</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-lg text-xs shadow-md transition-colors"
                  >
                    Submit Volunteer Application
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
