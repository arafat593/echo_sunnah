"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";

const academySlides = [
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600",
    badge: "ECHO SUNNAH ACADEMY (দ্বীনি শিক্ষা কেন্দ্র)",
    title: "Learn Authentic Islamic Knowledge & Prophetic Science",
    desc: "Master Tajweed, explore Hadith compilations, study Fiqh essentials, and understand theological medicine under qualified Islamic scholars."
  },
  {
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1600",
    badge: "Quran Tajweed",
    title: "Quran Recitation Masterclass",
    desc: "Refine your Arabic letter exits (Makharij) and phonetical guidelines (Tajweed) in an online certified course led by senior Azhar university graduates."
  },
  {
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1600",
    badge: "Prophetic Medicine Basics",
    title: "Tibb An-Nabawi Scientific Foundations",
    desc: "Acquire theoretical and clinical skills in Prophet Muhammad's (ﷺ) medical teachings on cupping, organic foods, and black seed oil."
  },
  {
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1600",
    badge: "Fiqh & Aqeedah Essentials",
    title: "Theology & Juristic Fundamentals",
    desc: "Gain deep, structured insight into day-to-day juristic rulings (Fiqh) and correct theological creeds (Aqeedah) through weekly interactive seminars."
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600",
    badge: "Interactive E-Learning",
    title: "Certified Semesters & Diplomas",
    desc: "Complete courses at your own pace with downloadable study guides, quizzes, video recordings, and official academic graduation certificates."
  }
];

export default function AcademyPage() {
  const { courses, addNotification } = useApp();

  const availableCourses = [
    {
      id: "AC-101",
      title: "Quran Tajweed Masterclass",
      bengaliTitle: "কুরআন তাজবীদ মাস্টারক্লাস",
      instructor: "Shaykh Ahmad Al-Misri",
      duration: "12 Weeks",
      level: "Beginner to Advanced",
      desc: "Learn the rules of Tajweed, exit-points (Makharij) of Arabic letters, and master correct Quranic recitation.",
      lessons: 24,
      cost: "৳২,০০০"
    },
    {
      id: "AC-102",
      title: "Prophetic Medicine Basics",
      bengaliTitle: "তিব্ব আন-নাবাবী বা নববী চিকিৎসা বিজ্ঞান",
      instructor: "Dr. Kamrul Hasan & Shaykh Abu Bakr",
      duration: "8 Weeks",
      level: "Intermediate",
      desc: "Study the health instructions of the Prophet (ﷺ) covering Hijama, honey, black seed, dates, and dietary regulations.",
      lessons: 16,
      cost: "৳৩,০০০"
    },
    {
      id: "AC-103",
      title: "Aqeedah & Fiqh Essentials",
      bengaliTitle: "আকীদাহ ও দৈনন্দিন ফিকহ শিক্ষা",
      instructor: "Mufti Abdur Rahman",
      duration: "10 Weeks",
      level: "Beginner",
      desc: "Fundamental principles of Islamic theology (Aqeedah) and daily practical jurisprudence (Fiqh) regarding Salah and purification.",
      lessons: 20,
      cost: "৳১,৫০০"
    }
  ];

  const handleEnroll = (course) => {
    addNotification(`Jazakallah! You have registered interest for: ${course.title}. Our academic registrar will send enrollment invoices soon.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={academySlides} />

        {/* Highlights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center font-black mx-auto text-lg mb-3">📖</div>
            <h3 className="font-bold text-slate-850">Full Quran & Tafsir</h3>
            <p className="text-xs text-slate-550 leading-relaxed mt-2">
              Browse Surahs, read translations, and listen to recitation audios with word-by-word grammatical tafsir.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center font-black mx-auto text-lg mb-3">📚</div>
            <h3 className="font-bold text-slate-850">Hadith Library</h3>
            <p className="text-xs text-slate-550 leading-relaxed mt-2">
              Explore authentic narrations from Bukhari, Muslim, Abu Dawud, and other compilations covering medical healing and lifestyle.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center font-black mx-auto text-lg mb-3">🤲</div>
            <h3 className="font-bold text-slate-850">Daily Du&apos;a & Azkar</h3>
            <p className="text-xs text-slate-550 leading-relaxed mt-2">
              Fortress of the Muslim (Hisnul Muslim) daily morning/evening supplications, and self-protection prayers.
            </p>
          </div>
        </section>

        {/* Enrolled Courses Progress */}
        <section className="bg-slate-100 py-12 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-black text-slate-800 mb-6">Your Course Enrollments</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-800">{course.title}</h4>
                      <p className="text-xs text-slate-400">Instructor: {course.instructor}</p>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Enrolled
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available courses */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-center text-emerald-850">Prophetic Science & Quran Masterclasses</h2>
          <p className="text-center text-xs sm:text-sm text-slate-500 mt-1 mb-12">Enroll in structured video courses with certification</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded uppercase">
                    {c.level}
                  </span>
                  <h3 className="font-bold text-lg text-slate-900 mt-3">{c.title}</h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">{c.bengaliTitle}</p>
                  <p className="text-xs text-slate-400 mt-2">Duration: {c.duration} • {c.lessons} Lessons</p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{c.desc}</p>
                  <p className="text-xs text-slate-450 mt-3 font-semibold">Taught by: {c.instructor}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block">Registration Fee</span>
                    <span className="text-base font-black text-emerald-800">{c.cost}</span>
                  </div>
                  <button
                    onClick={() => handleEnroll(c)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
