"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Authentication & Profile State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "Arafat Center",
    email: "arafat.hossain@example.com",
    phone: "+880 1711-223344",
    address: "Apartment 4A, House 12, Road 7, Sector 3",
    area: "Uttara",
    city: "Dhaka City (North/South)",
    district: "Dhaka",
    division: "Dhaka",
    country: "Bangladesh",
    birthDate: "",
    gender: "",
    avatar: "",
    joinedDate: "May 2026"
  });

  // Cart State
  const [cart, setCart] = useState([]);

  // Bookings State (Hijama & Ruqyah)
  const [bookings, setBookings] = useState([
    {
      id: "BK-8739",
      serviceName: "Sunnah Detox (10 Cups)",
      serviceType: "hijama",
      date: "2026-06-12",
      timeSlot: "11:00 AM - 01:00 PM",
      status: "Upcoming", // Upcoming, Past, Cancelled
      serviceOption: "Home Service",
      totalPrice: 3800, // 1800 + 2000
      paymentOption: "Pay Now (Online)",
      landmark: "Near sector 3 mosque"
    },
    {
      id: "BK-4321",
      serviceName: "Mental Peace & Anxiety Relief",
      serviceType: "ruqyah",
      date: "2026-05-10",
      timeSlot: "03:00 PM - 05:00 PM",
      status: "Past",
      serviceOption: "Center Service",
      totalPrice: 1000,
      paymentOption: "Paid in Center",
      landmark: ""
    }
  ]);

  // Orders State (Shop)
  const [orders, setOrders] = useState([
    {
      id: "ORD-9912",
      date: "2026-05-28",
      items: [
        { name: "Organic Raw Sundarban Honey", qty: 2, price: 900 },
        { name: "Cold-Pressed Black Seed Oil", qty: 1, price: 600 }
      ],
      total: 2400,
      status: "Received", // Packaging, Cancelled, Rejected, Received
      address: "Apartment 4A, House 12, Road 7, Sector 3, Uttara, Dhaka"
    },
    {
      id: "ORD-2034",
      date: "2026-06-01",
      items: [
        { name: "Premium Khalas Dates (Saudi)", qty: 1, price: 750 }
      ],
      total: 750,
      status: "Packaging",
      address: "Apartment 4A, House 12, Road 7, Sector 3, Uttara, Dhaka"
    }
  ]);

  // Donations State (Charity)
  const [donations, setDonations] = useState([
    { id: "DON-102", amount: 5000, project: "Water Well Project", date: "2026-04-12" },
    { id: "DON-508", amount: 2000, project: "Orphan Sponsorship", date: "2026-05-20" }
  ]);

  // Enrolled Courses State (Academy)
  const [courses, setCourses] = useState([
    { id: "AC-101", title: "Quran Tajweed Masterclass", progress: 65, instructor: "Shaykh Ahmad" },
    { id: "AC-102", title: "Prophetic Medicine Basics", progress: 20, instructor: "Dr. Kamrul Hasan" }
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your Hijama booking (BK-8739) is scheduled for June 12.", time: "2 hrs ago", read: false },
    { id: 2, text: "Welcome to Echo Sunnah! Your profile is set up.", time: "1 day ago", read: true },
    { id: 3, text: "Special Offer: 10% off on Sidr Powder this week.", time: "3 days ago", read: true }
  ]);

  // Actions
  const login = (name, email) => {
    setIsLoggedIn(true);
    if (name) setUser(prev => ({ ...prev, name }));
    addNotification("Welcome back to Echo Sunnah portal!");
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateProfile = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
    addNotification("Your profile details have been successfully updated.");
  };

  const addNotification = (text) => {
    setNotifications(prev => [
      { id: Date.now(), text, time: "Just now", read: false },
      ...prev
    ]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    addNotification(`Added "${product.name}" to your cart.`);
  };

  const updateCartQty = (id, change) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.qty + change;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  // Create Booking
  const createBooking = (bookingData) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Upcoming",
      ...bookingData
    };
    setBookings(prev => [newBooking, ...prev]);
    addNotification(`Booking for "${newBooking.serviceName}" has been placed.`);
    return newBooking;
  };

  // Create Order
  const createOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Packaging",
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addNotification(`Order ${newOrder.id} has been placed successfully.`);
    return newOrder;
  };

  // Make Donation
  const makeDonation = (amount, project) => {
    const newDonation = {
      id: `DON-${Math.floor(100 + Math.random() * 900)}`,
      amount,
      project,
      date: new Date().toISOString().split("T")[0]
    };
    setDonations(prev => [newDonation, ...prev]);
    addNotification(`Jazakallah! Donation of ৳${amount} for ${project} received.`);
  };

  const updateUser = (updatedUser) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const cancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Cancelled" } : b));
    addNotification(`Booking ${id} has been cancelled.`);
  };

  const rescheduleBooking = (id, newDate) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, date: newDate } : b));
    addNotification(`Booking ${id} rescheduled to ${newDate}.`);
  };

  const confirmOrderReceived = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "Received" } : o));
    addNotification(`Order ${id} marked as Received.`);
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        cart,
        bookings,
        orders,
        donations,
        courses,
        notifications,
        login,
        logout,
        updateProfile,
        updateUser,
        cancelBooking,
        rescheduleBooking,
        confirmOrderReceived,
        addNotification,
        markAllNotificationsRead,
        addToCart,
        updateCartQty,
        clearCart,
        createBooking,
        createOrder,
        makeDonation,
        setBookings
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
