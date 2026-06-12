"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";

const blogSlides = [
  {
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1600",
    badge: "ECHO SUNNAH BLOG (স্বাস্থ্য ও দ্বীনি প্রবন্ধ)",
    title: "Prophetic Health Insights & Islamic Studies",
    desc: "Read authentic research from certified medical specialists and theologians on Sunnah therapies, spiritual defense, and prophetic nutrition."
  },
  {
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600",
    badge: "Clinical Cupping Analysis",
    title: "Hijama Under The Microscope",
    desc: "Dive into peer-reviewed research papers and theological analysis illustrating how wet cupping safely extracts somatic tissue wastes."
  },
  {
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1600",
    badge: "Spiritual Shields",
    title: "The Art of Self-Ruqyah Protection",
    desc: "Discover step-by-step methodologies to protect your household and maintain mental composure using the shield of morning and evening Adhkar."
  },
  {
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1600",
    badge: "Prophetic Diets",
    title: "Superfoods of Prophetic Medicine",
    desc: "Read our comprehensive write-ups on dietary fibers and therapeutic components found in organic honey, black seeds, Sidr leaves, and Ajwa dates."
  },
  {
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600",
    badge: "Community Writers",
    title: "Submit Your Knowledge",
    desc: "Join our expert group of writers! Submit guest posts on theological wellness, parenting, or modern clinical intersections."
  }
];

export default function BlogClient() {
  const { addNotification } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [guestPostSuccess, setGuestPostSuccess] = useState(false);

  const categories = ["All", "Hijama", "Ruqyah", "Prophetic Diet", "Lifestyle"];

  const articles = [
    {
      id: 1,
      title: "Hijama Therapy in Light of Sunnah and Modern Medicine",
      bengaliTitle: "সুন্নাহ ও আধুনিক চিকিৎসাবিজ্ঞানের আলোকে হিজামা থেরাপী",
      category: "Hijama",
      author: "Dr. Kamrul Hasan",
      date: "May 28, 2026",
      summary: "Understand how cupping therapy acts as a natural blood detox and micro-circulation booster in compliance with authentic prophetic recommendations.",
      content: "Hijama has been established as a primary wellness agent..."
    },
    {
      id: 2,
      title: "Daily Protection Guide: How to Recite Self-Ruqyah",
      bengaliTitle: "দৈনন্দিন সুরক্ষা নির্দেশিকা: কিভাবে নিজে নিজে রুকইয়াহ করবেন",
      category: "Ruqyah",
      author: "Mawlana Mufti Abdur Rahman",
      date: "May 25, 2026",
      summary: "A step-by-step theological guide on recitations, morning and evening supplications, and prayers required to maintain a spiritual shield.",
      content: "Maintaining daily protection is essential..."
    },
    {
      id: 3,
      title: "The Prophetic Diet: Health Secrets of Dates & Black Seed",
      bengaliTitle: "সুন্নাহ খাবার: খেজুর ও কালোজিরার অনন্য স্বাস্থ্যগুণ",
      category: "Prophetic Diet",
      author: "Shaykh Abu Bakr",
      date: "May 20, 2026",
      summary: "Uncovering the scientific benefits and references from Hadith concerning Ajwa dates, black seed oil, and organic honey remedies.",
      content: "Prophetic diet elements hold active antioxidants..."
    }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.bengaliTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const authorName = e.target.authorName.value;

    addNotification(`Thank you! Your guest article "${title}" has been submitted. Our editors will review it shortly.`);
    setGuestPostSuccess(true);
    e.target.reset();
    setTimeout(() => {
      setGuestPostSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={blogSlides} />

        {/* Filter Controls */}
        <section className="bg-white border-b border-slate-100 py-4 sticky top-[80px] z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-lg px-4 py-2 text-slate-800 w-full sm:max-w-xs focus:outline-none focus:border-emerald-600"
            />

            {/* Category selection */}
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto shrink-0 py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-emerald-700 text-white"
                      : "bg-slate-50 text-slate-650 hover:bg-slate-105"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Article Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article key={art.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded uppercase">
                    {art.category}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 mt-3 leading-snug hover:text-emerald-805 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">{art.bengaliTitle}</p>
                  <p className="text-xs text-slate-500 mt-2">By {art.author} • {art.date}</p>
                  <p className="text-xs text-slate-600 mt-4 leading-relaxed">{art.summary}</p>
                </div>
                <button className="text-xs text-emerald-700 font-bold hover:underline mt-6 text-left">
                  Read Full Article →
                </button>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <p>No articles found matching your criteria.</p>
            </div>
          )}
        </section>

        {/* Guest Post Submission */}
        <section className="bg-slate-100 border-t border-slate-200 py-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-slate-150">
              <h2 className="text-xl font-bold text-emerald-850 text-center">Guest Post Submission (মহামান্য লেখকদের কলাম)</h2>
              <p className="text-xs text-slate-500 text-center mt-1 mb-8">Share your expertise in prophetic medicine, parenting, or theology with our readers</p>

              {guestPostSuccess ? (
                <div className="text-center py-8 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="text-emerald-800 font-bold">Article Submitted!</div>
                  <p className="text-xs text-slate-500 mt-2">Jazakallah! Your draft has been sent to our theological and editorial review board.</p>
                </div>
              ) : (
                <form onSubmit={handleGuestSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-650 mb-1">WRITER NAME</label>
                      <input
                        type="text"
                        required
                        name="authorName"
                        placeholder="e.g. Abdullah Hasan"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-650 mb-1">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. abdullah@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">ARTICLE TITLE</label>
                    <input
                      type="text"
                      required
                      name="title"
                      placeholder="e.g. Healing Properties of Sidr Leaves"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">ARTICLE CONTENT (MARKDOWN SUPPORTED)</label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Write your draft here..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-md transition-colors"
                  >
                    Submit Draft for Review
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
