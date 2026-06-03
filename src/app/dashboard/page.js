"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";

const dashboardSlides = [
  {
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1600",
    badge: "ECHO SUNNAH DASHBOARD (ব্যক্তিগত ড্যাশবোর্ড)",
    title: "Welcome to Your Wellness Dashboard",
    desc: "Manage your clinical cupping, spiritual recitations, shop orders, and course progress in one place."
  },
  {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600",
    badge: "Clinical Progress",
    title: "Track Your Active Appointments",
    desc: "Keep tabs on your scheduled Hijama or Ruqyah appointments, reschedule times, or cancel slots easily."
  },
  {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600",
    badge: "Sunnah Shop Orders",
    title: "Order Tracking & Delivery Status",
    desc: "Review your black seed oil, organic honey, and date orders, confirm product arrivals, and download invoices."
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600",
    badge: "Academy Achievements",
    title: "Academic Courses Progress Bar",
    desc: "Stay on top of your registered course lessons, watch video lectures, and track your graduation milestones."
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600",
    badge: "Charitable Footprint",
    title: "Your Charitable Contribution Logs",
    desc: "Monitor your Zakat payments, Sadaqah wells sponsorship records, and download official donation certificate slips."
  }
];

export default function DashboardPage() {
  const {
    user,
    updateUser,
    bookings,
    cancelBooking,
    rescheduleBooking,
    orders,
    confirmOrderReceived,
    courses,
    donations,
    addNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState("profile");

  // Editable Profile fields
  const [profileName, setProfileName] = useState(user.name);
  const [profilePhone, setProfilePhone] = useState(user.phone);
  const [profileAddress, setProfileAddress] = useState(user.address);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateUser({
      name: profileName,
      phone: profilePhone,
      address: profileAddress
    });
    addNotification("Profile details updated successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "appointments", label: "Appointments", count: bookings.length, icon: "🗓️" },
    { id: "orders", label: "Shop Orders", count: orders.length, icon: "📦" },
    { id: "courses", label: "Enrolled Courses", count: courses.length, icon: "🎓" },
    { id: "charity", label: "Charity Logs", count: donations.length, icon: "❤️" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={dashboardSlides} />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-black text-emerald-850 mb-2">My Wellness Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mb-8">Manage your clinical cupping, spiritual recitations, shop orders, and course progress.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dashboard Tabs Sidebar */}
          <div className="lg:col-span-3 space-y-1.5 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-700 text-white shadow"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeTab === tab.id ? "bg-emerald-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Active Tab Panel content */}
          <div className="lg:col-span-9 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm min-h-[400px]">
            
            {/* Tab: Profile */}
            {activeTab === "profile" && (
              <div className="animate-fadeIn">
                <h3 className="text-lg font-bold text-slate-850 mb-1 border-b border-slate-100 pb-3">Personal Profile Details</h3>
                <form onSubmit={handleProfileSave} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">FULL NAME</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">CONTACT PHONE NUMBER</label>
                    <input
                      type="text"
                      required
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">SHIPPING / VISIT ADDRESS</label>
                    <textarea
                      rows={3}
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 resize-none"
                    />
                  </div>
                  <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-md transition-colors">
                    Save Modifications
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Appointments */}
            {activeTab === "appointments" && (
              <div className="animate-fadeIn space-y-4">
                <h3 className="text-lg font-bold text-slate-850 mb-1 border-b border-slate-100 pb-3">Appointments Ledger</h3>
                
                {bookings.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No active bookings registered.</p>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="border border-slate-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            booking.status === "Cancelled" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-800"
                          }`}>
                            {booking.status}
                          </span>
                          <span className="text-[10px] text-slate-400">ID: {booking.id}</span>
                        </div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-800 mt-2">{booking.serviceName}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Date: {booking.date} • {booking.timeSlot}</p>
                        <p className="text-xs text-slate-400 mt-1">Setup Option: {booking.serviceOption}</p>
                        <p className="text-xs text-emerald-700 font-bold mt-1">Payment Method: {booking.paymentOption}</p>
                      </div>

                      {booking.status === "Upcoming" && (
                        <div className="flex sm:flex-col justify-end gap-2 text-xs shrink-0 self-center">
                          <button
                            onClick={() => rescheduleBooking(booking.id, "2026-06-15")}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg text-[11px]"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-3 py-1.5 rounded-lg text-[11px]"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Orders */}
            {activeTab === "orders" && (
              <div className="animate-fadeIn space-y-4">
                <h3 className="text-lg font-bold text-slate-850 mb-1 border-b border-slate-100 pb-3">Shop Orders Ledger</h3>
                
                {orders.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No shop orders recorded.</p>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.id} className="border border-slate-100 rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-bold">Order ID: {ord.id}</span>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                              ord.status === "Received" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                            }`}>
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Date: {ord.date}</p>
                        </div>
                        <span className="text-sm font-black text-emerald-800">৳{ord.total}</span>
                      </div>

                      <div className="border-t border-slate-50 pt-3">
                        <p className="text-[10px] font-bold text-slate-450 uppercase mb-1">Products Ordered:</p>
                        <ul className="text-xs text-slate-650 space-y-1">
                          {ord.items.map((item, idx) => (
                            <li key={idx}>• {item.name} (x{item.qty})</li>
                          ))}
                        </ul>
                      </div>

                      {ord.status === "Packaging" && (
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => confirmOrderReceived(ord.id)}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg"
                          >
                            Mark As Received
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Courses */}
            {activeTab === "courses" && (
              <div className="animate-fadeIn space-y-6">
                <h3 className="text-lg font-bold text-slate-850 mb-1 border-b border-slate-100 pb-3">Enrolled Academy Progress</h3>
                
                {courses.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No academy enrollments registered.</p>
                ) : (
                  courses.map((course) => (
                    <div key={course.id} className="border border-slate-100 rounded-xl p-5 shadow-sm">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="font-bold text-sm sm:text-base text-slate-850">{course.title}</h4>
                          <p className="text-xs text-slate-400">Instructor: {course.instructor}</p>
                        </div>
                        <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Enrolled
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Progress Rate</span>
                          <span>{course.progress}% Completed</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div className="bg-emerald-600 h-2 rounded-full transition-all duration-500" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Charity Logs */}
            {activeTab === "charity" && (
              <div className="animate-fadeIn space-y-4">
                <h3 className="text-lg font-bold text-slate-850 mb-1 border-b border-slate-100 pb-3">Donation & Zakat Receipts</h3>
                
                {donations.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No donation contributions recorded.</p>
                ) : (
                  donations.map((don) => (
                    <div key={don.id} className="border border-slate-100 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-800">{don.project}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Transaction ID: {don.id} • Date: {don.date}</p>
                      </div>
                      <span className="text-sm font-black text-emerald-800 shrink-0">
                        ৳{don.amount.toLocaleString()} BDT
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </main>

      <Footer />
    </div>
  );
}
