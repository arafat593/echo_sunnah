"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";

const shopSlides = [
  {
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1600",
    badge: "ECHO SUNNAH SHOP (প্রাকৃতিক পণ্য বিপণি)",
    title: "Prophetic Medicine & Health Products",
    desc: "Premium, organic, and clinically-packed Islamic remedies and hijama cupping kits sourced under absolute quality standards."
  },
  {
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1600",
    badge: "Pure Black Seed Oil",
    title: "Cold-Pressed Nigella Sativa Oil",
    desc: "100% pure cold-pressed black seed oil, extracted hygienically without heat, preserving vital prophetic cure factors."
  },
  {
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1600",
    badge: "Raw Sundarban Honey",
    title: "Natural Honey Sourced Directly",
    desc: "Pure raw honey harvested directly from the deep mangrove forests of the Sundarbans. Zero additives, pure wellness."
  },
  {
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1600",
    badge: "Palestine Olive Oil",
    title: "Extra Virgin Organic Cold-Press",
    desc: "Premium grade olive oil imported directly from the blessed ancient orchards of Palestine. Ideal for consumption and massage."
  },
  {
    image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1600",
    badge: "Certified Kits",
    title: "Clinical Hijama Equipment & Cups",
    desc: "Sterile cupping pump sets and disposable blades to carry out prophetic wet cupping safely at home or in training."
  }
];

export default function ShopPage() {
  const { cart, addToCart, updateCartQty, createOrder, orders, confirmOrderReceived } = useApp();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [activeOrderTab, setActiveOrderTab] = useState("All");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [activeView, setActiveView] = useState("products"); // "products", "cart", "orders"

  const categories = [
    "All",
    "Honey",
    "Black Seed",
    "Olive Oil",
    "Miswak",
    "Zamzam Accessories",
    "Islamic Books",
    "Ruqyah Products",
    "Health Supplements",
    "Hijama Equipment"
  ];

  const products = [
    {
      id: "prod-1",
      name: "Organic Raw Sundarban Honey",
      category: "Honey",
      price: "৳৯০০",
      weight: "500g",
      rating: 4.9,
      emoji: "🍯",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=500",
      desc: "Harvested directly from the deep mangrove forests of the Sundarbans. 100% pure and unprocessed.",
      benefits: "Boosts immune system, aids digestion, serves as natural energy source.",
      usage: "Mix 1-2 teaspoons in lukewarm water and drink on an empty stomach in the morning.",
      sunnahRef: "Honey is a remedy for every illness and the Qur'an is a remedy for all illness of the mind.",
      origin: "Sundarbans Mangrove Forest, Bangladesh"
    },
    {
      id: "prod-2",
      name: "Cold-Pressed Black Seed Oil",
      category: "Black Seed",
      price: "৳৬০০",
      weight: "250ml",
      rating: 4.8,
      emoji: "🫙",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500",
      desc: "Extracted from premium Nigella Sativa seeds using hygienic cold-press methods.",
      benefits: "Supports respiratory health, strengthens hair roots, acts as general health tonic.",
      usage: "Take 1/2 teaspoon daily mixed with honey or apply topically to hair and skin joints.",
      sunnahRef: "Use the Black Seed, for indeed it contains a cure for every disease except death.",
      origin: "Al-Sharqiya Governorate, Egypt"
    },
    {
      id: "prod-3",
      name: "Premium Khalas Dates (Saudi)",
      category: "Health Supplements",
      price: "৳৭৫০",
      weight: "1kg",
      rating: 4.7,
      emoji: "🌴",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=500",
      desc: "Soft, sweet, and rich in natural fibers. Sourced directly from farms in Qassim, Saudi Arabia.",
      benefits: "High in potassium, provides instant energy boost, rich in antioxidants.",
      usage: "Eat 7 dates in the morning for breakfast as a natural energy booster and detoxifier.",
      sunnahRef: "He who eats seven Ajwa dates in the morning, neither poison nor magic will harm him on that day.",
      origin: "Al-Qassim, Saudi Arabia"
    },
    {
      id: "prod-4",
      name: "Pure Sidr Powder (Prophetic)",
      category: "Ruqyah Products",
      price: "৳৩৫০",
      weight: "150g",
      rating: 4.9,
      emoji: "🍃",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=500",
      desc: "Finely ground wild Sidr (Lote) leaves, essential for purification rituals and self-ruqyah baths.",
      benefits: "Aids spiritual purification, helps treat skin irritations, used for hair washing.",
      usage: "Mix 1 tablespoon in water to wash hair, or dissolve 7 crushed leaves in water for Ruqyah bath.",
      sunnahRef: "Mentioned in Surah An-Najm and used in Sunnah for cleansing rites and hair care.",
      origin: "Wild Sidr Groves, Yemen"
    },
    {
      id: "prod-5",
      name: "Hijama Therapy Starter Pump",
      category: "Hijama Equipment",
      price: "৳১,৫০০",
      weight: "1 Unit",
      rating: 4.6,
      emoji: "🔫",
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=500",
      desc: "Clinical-grade hand-held vacuum suction pump with 12 pieces of assorted sterile cups.",
      benefits: "Durable medical build, smooth pulling trigger, ideal for beginners and training.",
      usage: "Use with sterile cupping sets. Best performed on the 17th, 19th, or 21st of the lunar month.",
      sunnahRef: "Indeed, the best of remedies you have is Hijama (wet cupping).",
      origin: "Certified Medical Supplies Factory"
    },
    {
      id: "prod-6",
      name: "Extra Virgin Olive Oil (Palestine)",
      category: "Olive Oil",
      price: "৳১,২০০",
      weight: "500ml",
      rating: 5.0,
      emoji: "🫒",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500",
      desc: "First cold-pressed organic olive oil sourced from ancient olive trees in Palestine.",
      benefits: "Excellent cardiovascular support, deeply hydrates skin, high anti-inflammatory traits.",
      usage: "Eat 1 tablespoon daily on an empty stomach, use in cooking, or massage on hair and joints.",
      sunnahRef: "Eat olive oil and massage it over your bodies since it is from a blessed tree.",
      origin: "Nablus Orchards, Palestine"
    },
    {
      id: "prod-7",
      name: "Premium Al-Badr Miswak (Sewak)",
      category: "Miswak",
      price: "৳১০০",
      weight: "2 Pcs",
      rating: 4.8,
      emoji: "🪵",
      image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=500",
      desc: "Fresh Salvadora Persica root sticks, vacuum sealed to preserve natural mineral resins.",
      benefits: "Natural teeth whitening, fights plaque and oral bacteria, highly recommended Sunnah.",
      usage: "Trim outer bark, chew the tip until soft bristles form, and brush teeth gently.",
      sunnahRef: "The Miswak is a purification for the mouth and a means of pleasing the Lord.",
      origin: "Peshawar, Pakistan"
    },
    {
      id: "prod-8",
      name: "Zad al-Ma'ad (Prophetic Medicine Book)",
      category: "Islamic Books",
      price: "৳৪৫০",
      weight: "1 Book",
      rating: 4.9,
      emoji: "📚",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500",
      desc: "Famous masterpiece by Ibn Al-Qayyim detailing the Prophet's guidance on medicine and wellness.",
      benefits: "Deep theological insight into cupping, diet, and spiritual cure methodologies.",
      usage: "Read daily for authentic referencing of Prophetic medicine and holistic health practices.",
      sunnahRef: "Classic encyclopedic text detailing references from the Quran, Hadith, and Islamic medicine.",
      origin: "Published under Scholar Oversight, Cairo"
    }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const cartTotal = cart.reduce((acc, item) => {
    const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""));
    return acc + (numericPrice * item.qty);
  }, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const payment = e.target.payment.value;

    const orderItems = cart.map(item => ({
      name: item.name,
      qty: item.qty,
      price: parseInt(item.price.replace(/[^\d]/g, ""))
    }));

    const newOrder = createOrder({
      items: orderItems,
      total: cartTotal,
      address,
      paymentOption: payment
    });

    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setActiveView("orders");
      if (newOrder && newOrder.id) {
        setSelectedOrderId(newOrder.id);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={shopSlides} />

        {/* Shop Sub-Navigation Tabs */}
        <div className="bg-white border-b border-slate-100 py-3 sticky top-[80px] z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveView("products")}
                className={`flex items-center gap-2 pb-2 pt-1 border-b-2 text-xs font-black transition-all ${
                  activeView === "products"
                    ? "border-emerald-600 text-emerald-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>🛍️ Products</span>
              </button>
              
              <button
                onClick={() => setActiveView("cart")}
                className={`flex items-center gap-2 pb-2 pt-1 border-b-2 text-xs font-black transition-all relative ${
                  activeView === "cart"
                    ? "border-emerald-600 text-emerald-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>🛒 My Cart</span>
                {cart.length > 0 && (
                  <span className="bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse">
                    {cart.reduce((acc, i) => acc + i.qty, 0)}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setActiveView("orders")}
                className={`flex items-center gap-2 pb-2 pt-1 border-b-2 text-xs font-black transition-all ${
                  activeView === "orders"
                    ? "border-emerald-600 text-emerald-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>📦 Track Orders</span>
                {orders.filter(o => o.status === "Packaging" || o.status === "Shipped").length > 0 && (
                  <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full ml-1">
                    {orders.filter(o => o.status === "Packaging" || o.status === "Shipped").length} Active
                  </span>
                )}
              </button>
            </div>
            
            <div className="hidden sm:block text-[10px] text-slate-400 font-bold uppercase tracking-wide">
              {activeView === "products" ? "Prophetic Medicine & Remedies (তিব্ব-ই-নববী)" : activeView === "cart" ? "Confirm Delivery Details (চেকআউট)" : "Live Shipping Tracker (অর্ডার ট্র্যাকিং)"}
            </div>
          </div>
        </div>

        {activeView === "products" && (
          <>

            {/* Search & Categories Bar */}
            <section className="bg-white border-b border-slate-100 py-3.5 sticky top-[110px] sm:top-[128px] z-30 shadow-sm transition-all duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                
                {/* Modern Search Field */}
                <div className="relative flex-grow max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-emerald-700/75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search prophetic medicines & wellness items..."
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-10 py-2.5 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all shadow-inner font-semibold"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-655 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Categories Bar */}
                <div className="flex gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none snap-x smooth-scroll-x">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all shrink-0 snap-align-start border ${
                        activeCategory === cat
                          ? "bg-emerald-800 border-emerald-800 text-white shadow-[0_4px_12px_rgba(6,95,70,0.15)] scale-[1.02]"
                          : "bg-slate-50 border-slate-200/40 text-slate-655 hover:bg-slate-100/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onCardClick={() => setSelectedProduct(p)}
                      onAddToCart={(prod) => addToCart({ id: prod.id, name: prod.name, price: prod.price, unit: prod.weight })}
                    />
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center">
                    <span className="text-4xl">🔍</span>
                    <h3 className="text-slate-800 font-extrabold mt-3">No products match your search</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">Try checking your spelling or selecting a different category</p>
                    <button 
                      onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                      className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage(prev => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => {
                        setCurrentPage(pageNumber);
                        window.scrollTo({ top: 350, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                        currentPage === pageNumber
                          ? "bg-emerald-800 text-white shadow-md shadow-emerald-800/10 scale-105"
                          : "bg-white border border-slate-200 text-slate-655 hover:bg-slate-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage(prev => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {activeView === "cart" && (
          /* Checkout Area */
          <section id="checkout" className="max-w-3xl mx-auto px-4 py-16">
          {cart.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-slate-150">
              <h2 className="text-xl font-bold text-emerald-850 text-center">Complete Your Order (চেকআউট ফর্ম)</h2>
              <p className="text-xs text-slate-500 text-center mt-1 mb-8">Enter your delivery coordinates to process order</p>

              {checkoutSuccess ? (
                <div className="text-center py-8">
                  <div className="bg-emerald-100 text-emerald-800 p-4 rounded-full w-fit mx-auto mb-4 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Order Placed Successfully!</h3>
                  <p className="text-xs text-slate-500 mt-2">
                    Jazakallah, we have received your order details. Track packaging states inside your personal Dashboard.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl mb-4">
                    <h3 className="text-xs font-bold text-slate-650 uppercase mb-2">Order Summary</h3>
                    <div className="divide-y divide-slate-100 text-xs text-slate-700">
                      {cart.map((item) => (
                        <div key={item.id} className="py-2 flex justify-between">
                          <span>{item.name} (x{item.qty})</span>
                          <span>৳{parseInt(item.price.replace(/[^\d]/g, "")) * item.qty}</span>
                        </div>
                      ))}
                      <div className="py-3 flex justify-between font-black text-sm text-emerald-850 pt-3">
                        <span>Total Payable</span>
                        <span>৳{cartTotal}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">RECIPIENT NAME</label>
                    <input
                      type="text"
                      required
                      name="name"
                      defaultValue="Arafat Hossain"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">CONTACT PHONE NUMBER</label>
                    <input
                      type="text"
                      required
                      name="phone"
                      defaultValue="+880 1711-223344"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">SHIPPING HOME ADDRESS</label>
                    <textarea
                      required
                      name="address"
                      rows={2}
                      defaultValue="House 12, Road 7, Sector 3, Uttara, Dhaka"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-650 mb-1">PAYMENT METHOD</label>
                    <select required name="payment" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                      <option value="Online Payment">Online Payment (bKash/Nagad/Cards)</option>
                      <option value="Cash on Delivery">Cash on Delivery (Pay in Center/Home)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg text-xs shadow-md transition-all duration-200"
                  >
                    Confirm Order (অর্ডার নিশ্চিত করুন)
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xs text-slate-400">Cart is empty. Add products above to check out.</p>
            </div>
          )}
        </section>
        )}

        {activeView === "orders" && (
          /* Track Your Orders Section */
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              My Orders & Delivery Tracker (আমার অর্ডারসমূহ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              Monitor processing status, shipping logs, and confirm receipt of your holistic wellness goods.
            </p>
          </div>

          {/* Orders Tabs */}
          <div className="flex justify-center mb-8 gap-2 bg-slate-100/80 p-1.5 rounded-2xl w-fit mx-auto border border-slate-200/50">
            {["All", "Active", "Completed", "Cancelled"].map((tab) => {
              const count = orders.filter(o => {
                if (tab === "All") return true;
                if (tab === "Active") return o.status === "Packaging" || o.status === "Shipped";
                if (tab === "Completed") return o.status === "Received";
                if (tab === "Cancelled") return o.status === "Cancelled" || o.status === "Rejected";
                return true;
              }).length;

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveOrderTab(tab);
                    setSelectedOrderId(null); // Reset detail when tab changes
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    activeOrderTab === tab
                      ? "bg-white text-emerald-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab === "All" ? "All Orders" : tab} ({count})
                </button>
              );
            })}
          </div>

          {/* Split Container or Empty state */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/50 p-12 text-center max-w-md mx-auto shadow-sm">
              <span className="text-4xl">📦</span>
              <h3 className="font-bold text-slate-800 mt-4">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-500 mt-2">Browse our high-quality natural goods above and complete your check out.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Orders list */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Order History</h3>
                
                {orders.filter(o => {
                  if (activeOrderTab === "All") return true;
                  if (activeOrderTab === "Active") return o.status === "Packaging" || o.status === "Shipped";
                  if (activeOrderTab === "Completed") return o.status === "Received";
                  if (activeOrderTab === "Cancelled") return o.status === "Cancelled" || o.status === "Rejected";
                  return true;
                }).map((order) => {
                  const isSelected = selectedOrderId === order.id;
                  return (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrderId(order.id === selectedOrderId ? null : order.id)}
                      className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "border-emerald-500 shadow-[0_10px_25px_-5px_rgba(4,120,87,0.08)] bg-emerald-50/5"
                          : "border-slate-200/60 hover:border-slate-350 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-black text-slate-800">{order.id}</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                          order.status === "Received"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                            : order.status === "Packaging"
                              ? "bg-amber-50 text-amber-800 border-amber-100"
                              : order.status === "Shipped"
                                ? "bg-sky-50 text-sky-800 border-sky-100"
                                : "bg-rose-50 text-rose-800 border-rose-100"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      
                      {/* Products Summary */}
                      <div className="text-xs text-slate-600 font-medium space-y-1 my-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.name} <span className="text-slate-400">x{item.qty}</span></span>
                            <span>৳{item.price * item.qty}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-450 font-semibold">Date: {order.date}</span>
                        <span className="font-black text-emerald-800 text-sm">Total: ৳{order.total}</span>
                      </div>

                      {/* Expand tracking hint */}
                      <div className="mt-2 text-center">
                        <span className="text-[10px] text-emerald-700 font-extrabold group-hover:underline">
                          {isSelected ? "▲ Hide Tracker" : "▼ Click to Track Delivery"}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {orders.filter(o => {
                  if (activeOrderTab === "All") return true;
                  if (activeOrderTab === "Active") return o.status === "Packaging" || o.status === "Shipped";
                  if (activeOrderTab === "Completed") return o.status === "Received";
                  if (activeOrderTab === "Cancelled") return o.status === "Cancelled" || o.status === "Rejected";
                  return true;
                }).length === 0 && (
                  <div className="py-10 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-455">No orders match this status tab.</p>
                  </div>
                )}
              </div>

              {/* Right Column: Tracking Progress Stepper */}
              <div className="lg:col-span-7 font-sans">
                {selectedOrderId ? (() => {
                  const order = orders.find(o => o.id === selectedOrderId);
                  if (!order) return null;

                  const isCancelled = order.status === "Cancelled" || order.status === "Rejected";
                  
                  // Progress step indices
                  const stepIndex = 
                    order.status === "Received" ? 4 :
                    order.status === "Shipped" ? 3 :
                    order.status === "Packaging" ? 2 : 1;

                  return (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm animate-fadeIn">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                        <div>
                          <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wide">Live Tracking Status</h4>
                          <span className="font-mono text-base font-black text-slate-800">{order.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-450 block font-semibold">Pay Option: {order.paymentOption || "Cash on Delivery"}</span>
                          <span className="text-xs text-slate-400 font-medium">Deliver to: {order.address.split(",")[0]}</span>
                        </div>
                      </div>

                      {isCancelled ? (
                        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 text-center">
                          <span className="text-3xl">⚠️</span>
                          <h4 className="font-bold text-rose-800 mt-2">Order Cancelled/Rejected</h4>
                          <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto">
                            This order was cancelled by the user or rejected during initial verification. Please contact support center for assistance.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                          
                          {/* Step 1: Placed */}
                          <div className="flex gap-4 relative">
                            <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold ${
                              stepIndex >= 1 ? "bg-emerald-600 shadow-sm" : "bg-slate-200"
                            }`}>
                              ✓
                            </div>
                            <div>
                              <h5 className="font-bold text-xs sm:text-sm text-slate-800">Order Confirmed & Placed</h5>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">Verification complete. Sourcing organic ingredients.</p>
                              <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border inline-block mt-1 font-semibold">{order.date}</span>
                            </div>
                          </div>

                          {/* Step 2: Packaging */}
                          <div className="flex gap-4 relative">
                            <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold ${
                              stepIndex >= 2 ? "bg-emerald-600 shadow-sm" : "bg-slate-200 text-slate-400"
                            }`}>
                              {stepIndex > 2 ? "✓" : "2"}
                            </div>
                            <div>
                              <h5 className="font-bold text-xs sm:text-sm text-slate-800">Hygienic Packaging</h5>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">Products verified, sealed, and sanitized under clinical oversight.</p>
                              {order.status === "Packaging" && (
                                <span className="text-[10px] text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100 inline-block mt-1 font-bold animate-pulse">In Progress</span>
                              )}
                            </div>
                          </div>

                          {/* Step 3: Shipped */}
                          <div className="flex gap-4 relative">
                            <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold ${
                              stepIndex >= 3 ? "bg-emerald-600 shadow-sm" : "bg-slate-200 text-slate-400"
                            }`}>
                              {stepIndex > 3 ? "✓" : "3"}
                            </div>
                            <div>
                              <h5 className="font-bold text-xs sm:text-sm text-slate-800">Shipped & In Transit</h5>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">Handed over to logistics carrier. Moving to Uttara Hub.</p>
                              {order.status === "Shipped" && (
                                <span className="text-[10px] text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100 inline-block mt-1 font-bold animate-pulse">Out for Delivery</span>
                              )}
                            </div>
                          </div>

                          {/* Step 4: Received */}
                          <div className="flex gap-4 relative">
                            <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold ${
                              stepIndex >= 4 ? "bg-emerald-600 shadow-sm" : "bg-slate-200 text-slate-400"
                            }`}>
                              {stepIndex >= 4 ? "✓" : "4"}
                            </div>
                            <div>
                              <h5 className="font-bold text-xs sm:text-sm text-slate-800">Delivered & Received</h5>
                              <p className="text-xs text-slate-400 font-medium mt-0.5">Completed successfully. Safe prophetic products received.</p>
                              {order.status === "Received" && (
                                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 inline-block mt-1 font-bold">Successfully Completed</span>
                              )}
                            </div>
                          </div>

                        </div>
                      )}

                      {/* Complete confirmation action button */}
                      {order.status !== "Received" && !isCancelled && (
                        <div className="mt-8 pt-6 border-t border-slate-100 text-right">
                          <p className="text-xs text-slate-400 mb-3 text-left font-semibold">Got your items? Mark this order received to complete the record.</p>
                          <button
                            onClick={() => confirmOrderReceived(order.id)}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(4,120,87,0.12)] active:scale-[0.98]"
                          >
                            ✓ Confirm Order Received
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })() : (
                  <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                    <span className="text-4xl text-slate-350 animate-bounce">👉</span>
                    <h4 className="font-bold text-slate-500 mt-4">Select an Order from the Left</h4>
                    <p className="text-xs text-slate-400 mt-2">Click on any order card to see active delivery routes and timelines.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
        )}

      </main>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 md:p-8 relative text-slate-800 overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Premium Image showcase & metadata */}
              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-full h-56 md:h-64 rounded-2xl overflow-hidden mb-4 border border-slate-200 shadow-md relative group">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm shadow flex items-center justify-center text-lg">
                    {selectedProduct.emoji}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white font-extrabold text-[10px] uppercase px-3 py-1 rounded-lg backdrop-blur-xs">
                    {selectedProduct.weight}
                  </div>
                </div>

                <span className="text-[10px] text-emerald-800 font-extrabold uppercase bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full tracking-wider">
                  {selectedProduct.category}
                </span>

                <div className="flex items-center gap-1.5 mt-3 bg-amber-50 border border-amber-100/60 px-2.5 py-1 rounded-lg text-xs font-black text-amber-800">
                  <span>★</span>
                  <span>{selectedProduct.rating} / 5.0 Rating</span>
                </div>
              </div>

              {/* Right Column: Rich Info, Usage, and Sunnah References */}
              <div className="md:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
                    {selectedProduct.name}
                  </h3>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                    {/* Description */}
                    <div>
                      <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 mb-1">Description</h4>
                      <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-medium">
                        {selectedProduct.desc}
                      </p>
                    </div>

                    {/* Health Benefits */}
                    {selectedProduct.benefits && (
                      <div className="bg-emerald-50/50 border border-emerald-100/40 rounded-xl p-3.5">
                        <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-850 mb-1.5 flex items-center gap-1">
                          <span>🌿</span> Health Benefits
                        </h4>
                        <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                          {selectedProduct.benefits}
                        </p>
                      </div>
                    )}

                    {/* Usage Instructions */}
                    {selectedProduct.usage && (
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5">
                        <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500 mb-1.5 flex items-center gap-1">
                          <span>🥣</span> Recommended Usage (ব্যবহার বিধি)
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {selectedProduct.usage}
                        </p>
                      </div>
                    )}

                    {/* Sunnah & Hadith reference */}
                    {selectedProduct.sunnahRef && (
                      <div className="bg-amber-50/50 border border-amber-105/40 rounded-xl p-3.5">
                        <h4 className="text-[10px] uppercase font-extrabold tracking-widest text-amber-850 mb-1.5 flex items-center gap-1">
                          <span>📖</span> Sunnah & Hadith Reference
                        </h4>
                        <p className="text-xs sm:text-sm text-amber-950 italic leading-relaxed font-medium">
                          "{selectedProduct.sunnahRef}"
                        </p>
                      </div>
                    )}

                    {/* Sourcing Origin */}
                    {selectedProduct.origin && (
                      <div className="flex justify-between items-center text-xs pt-2.5 border-t border-slate-100 text-slate-500">
                        <span><strong>Sourcing Origin:</strong></span>
                        <span className="font-bold text-slate-700">{selectedProduct.origin}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Add To Cart */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-800 tracking-tight">
                      {selectedProduct.price}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, unit: selectedProduct.weight });
                      setSelectedProduct(null);
                    }}
                    className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white text-xs sm:text-sm font-black px-6 py-3 rounded-xl transition-all shadow-[0_4px_14px_rgba(4,120,87,0.15)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.25)] active:scale-[0.97]"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
