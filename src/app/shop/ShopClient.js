"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";
import ProductCard from "@/components/ProductCard";

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const banglaDigits = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
  const englishDigitsStr = String(priceStr).replace(/[০-৯]/g, d => banglaDigits[d]);
  const cleanedStr = englishDigitsStr.replace(/[^\d]/g, "");
  return parseInt(cleanedStr) || 0;
};

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

// Static constants moved outside the component to optimize rendering performance
const categories = [
  "All",
  "Sunnah Products",
  "Detox Powders",
  "Personal Care",
  "Hijama and Therapy instruments",
  "Herbal Wellness",
  "Organic and Hand Made Products"
];

const products = [
  // --- Category: Sunnah Products ---
  {
    id: "prod-honey",
    name: "খাঁটি সিদর মধু (Premium Sidr Honey)",
    category: "Sunnah Products",
    price: "৳১২০০",
    originalPrice: "৳১৫০০",
    weight: "৫০০ গ্রাম",
    rating: 5.0,
    emoji: "🍯",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=500",

    desc: "প্রাকৃতিক উপায়ে সংগৃহীত শতভাগ খাঁটি সুন্দরবনের সিদর (কুল) মধু। এটি সুনাহসম্মত এবং ওষধি গুণে অনন্য।",
    benefits: "রোগ প্রতিরোধ ক্ষমতা বাড়ায়, তাৎক্ষণিক শক্তি যোগায়, সর্দি-কাশি উপশম করে।",
    usage: "প্রতিদিন সকালে খালি পেটে এক চামচ কুসুম গরম পানিতে মিশিয়ে সেবন করুন।",
    origin: "সুন্দরবন, বাংলাদেশ"
  },
  {
    id: "prod-kalo-gira-tel",
    name: "কালোজিরার তেল (Kalo Gira Tel)",
    category: "Sunnah Products",
    price: "৳৩২০",
    originalPrice: "৳৪০০",
    weight: "১০০ মি.লি.",
    rating: 4.9,
    emoji: "🫗",
    image: "https://images.unsplash.com/photo-1596470663178-dc2df28026f7?q=80&w=500",
    desc: "কোল্ড প্রেসড পদ্ধতিতে নিষ্কাশিত ১০০% বিশুদ্ধ কালোজিরার তেল যা সব রোগের মহৌষধ।",
    benefits: "চুল পড়া রোধ করে, বাতের ব্যথা উপশম করে, রোগ প্রতিরোধ ক্ষমতা বহুগুণ বৃদ্ধি করে।",
    usage: "রং চায়ের সাথে ১/২ চামচ মিশিয়ে অথবা চুলে ও ব্যথার স্থানে ম্যাসাজ করুন।",
    origin: "নাটোর, বাংলাদেশ"
  },
  {
    id: "prod-black-seed-oil",
    name: "ব্ল্যাক সিড অয়েল (Black Seed Oil)",
    category: "Sunnah Products",
    price: "৳৬০০",
    originalPrice: "৳৭৫০",
    weight: "২৫০ মি.লি.",
    rating: 5.0,
    emoji: "🪔",
    image: "https://images.unsplash.com/photo-1596470663178-dc2df28026f7?q=80&w=500",
    desc: "Sunnah Product - প্রিমিয়াম কোয়ালিটির ব্ল্যাক সিড বা কালোজিরা বীজ থেকে কোল্ড প্রেসড উপায়ে প্রস্তুত তেল।",
    benefits: "হৃদরোগের ঝুঁকি কমায়, অ্যাজমা নিয়ন্ত্রণ করে, স্মৃতিশক্তি উন্নত করে।",
    usage: "খাবারের সাথে অথবা সরাসরি সেবনযোগ্য।",
    origin: "আমদানিকৃত বীজ (মিশর)"
  },
  {
    id: "prod-olive-oil",
    name: "এক্সট্রা ভার্জিন অলিভ অয়েল (Olive Oil)",
    category: "Sunnah Products",
    price: "৳৭৫০",
    originalPrice: "৳৯৫০",
    weight: "৫০০ মি.লি.",
    rating: 4.8,
    emoji: "🫒",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=500",
    desc: "প্রথম কোল্ড প্রেসড পদ্ধতিতে সংগৃহীত শতভাগ খাঁটি স্প্যানিশ এক্সট্রা ভার্জিন অলিভ অয়েল।",
    benefits: "কোলেস্টেরল মুক্ত, হার্টের জন্য অত্যন্ত উপকারী, ত্বক ও চুলের জন্য অসাধারণ ময়েশ্চারাইজার।",
    usage: "রান্নায়, সালাদে অথবা চুল ও ত্বকে ব্যবহারের জন্য উপযোগী।",
    origin: "আমদানিকৃত (স্পেন)"
  },
  {
    id: "prod-kosturi-ator",
    name: "কস্তুরী আতর (Kosturi Premium Attar)",
    category: "Sunnah Products",
    price: "৳৩৫০",
    originalPrice: "৳৪৫০",
    weight: "৩ মি.লি.",
    rating: 4.9,
    emoji: "🧪",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=500",
    desc: "মনোমুগ্ধকর সুগন্ধি কস্তুরী আতর যা দীর্ঘস্থায়ী এবং অ্যালকোহল মুক্ত।",
    benefits: "মনকে প্রফুল্ল রাখে, নামাজের জন্য অত্যন্ত উপযোগী ও সুন্নাহসম্মত।",
    usage: "শরীরে ও পোশাকে ব্যবহারের জন্য।",
    origin: "আমদানিকৃত (দুবাই)"
  },
  {
    id: "prod-sidr-leaves-sunnah",
    name: "সিডর পাতা গুঁড়ো (Sidr Leaves Powder)",
    category: "Sunnah Products", 
    price: "৳১৫০",
    originalPrice: "৳১৮০",
    weight: "১০০ গ্রাম",
    rating: 4.8, 
    emoji: "🍃",
    image: "https://images.unsplash.com/photo-1565802700474-1c8b57596859?q=80&w=500",
    desc: "বিশুদ্ধ কুল পাতা বা সিডর পাতা গুঁড়ো। এটি রুখইয়াহ এবং গোসলের জন্য অত্যন্ত গুরুত্বপূর্ণ।",
    benefits: "প্রাকৃতিক ক্লিনজার, ত্বকের চুলকানি দূর করে, রুখইয়াহর কাজে ব্যবহৃত হয়।",
    usage: "পানির সাথে পেস্ট তৈরি করে গোসল করুন বা ত্বকে ব্যবহার করুন।",
    origin: "নাটোর, বাংলাদেশ"
  },

  // --- Category: Detox Powders ---
  {
    id: "prod-pink-salt",
    name: "হিমালয়ান পিঙ্ক সল্ট (Pink Salt)",
    category: "Detox Powders",
    price: "৳১৮০",
    originalPrice: "৳২২০",
    weight: "৫০০ গ্রাম",
    rating: 4.8,
    emoji: "🧂",
    image: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=500",
    desc: "খনিজ উপাদানে সমৃদ্ধ হিমালয়ান পিঙ্ক সল্ট। সাধারণ লবণের চেয়ে অনেক বেশি স্বাস্থ্যকর।",
    benefits: "রক্তচাপ নিয়ন্ত্রণে সাহায্য করে, হজম শক্তি বাড়ায়, শরীরে ইলেক্ট্রোলাইট ব্যালেন্স করে।",
    usage: "খাবারের লবণের বিকল্প হিসেবে রান্না বা সালাদে সরাসরি ব্যবহার করুন।",
    origin: "আমদানিকৃত (পাকিস্তান)"
  },
  {
    id: "prod-methi-gura-detox",
    name: "মেথি গুঁড়ো (Methi Gura)",
    category: "Detox Powders",
    price: "৳১২০",
    originalPrice: "৳১৫০",
    weight: "১০০ গ্রাম",
    rating: 4.7,
    emoji: "🌰",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=500",
    desc: "রক্তে সুগার নিয়ন্ত্রণে এবং হজমে অত্যন্ত সাহায্যকারী বিশুদ্ধ মেথি গুঁড়ো।",
    benefits: "সুগার নিয়ন্ত্রণে রাখে, খুশকি ও চুল পড়া কমায়, হজমে সাহায্য করে।",
    usage: "রাতে পানিতে ভিজিয়ে রেখে সকালে খালি পেটে পানি পান করুন।",
    origin: "রাজশাহী, বাংলাদেশ"
  },
  {
    id: "prod-moringa-powder-detox",
    name: "মোরিঙ্গা পাউডার (Moringa Powder)",
    category: "Detox Powders",
    price: "৳১৮০",
    originalPrice: "৳২২৭",
    weight: "১০০ গ্রাম",
    rating: 4.9,
    emoji: "🥬",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=500",
    desc: "সুপারফুড সজনে পাতা গুঁড়ো যা শরীরে শক্তি যোগায় এবং ডিটক্সিফাই করে।",
    benefits: "রোগ প্রতিরোধ ক্ষমতা বাড়ায়, রক্তস্বল্পতা কমায়, এনার্জি বুস্ট করে।",
    usage: "১ চা চামচ পাউডার পানিতে গুলিয়ে সকালে খালি পেটে পান করুন।",
    origin: "কুষ্টিয়া, বাংলাদেশ"
  },
  {
    id: "prod-chia-seed",
    name: "প্রিমিয়াম চিয়া সিড (Chia Seed)",
    category: "Detox Powders",
    price: "৳৩৫০",
    originalPrice: "৳৪৫০",
    weight: "২৫০ গ্রাম",
    rating: 4.9,
    emoji: "🌾",
    image: "https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=500",
    desc: "ওমেগা-৩, ফাইবার ও এন্টি-অক্সিডেন্ট সমৃদ্ধ চিয়া সিড যা ওজন নিয়ন্ত্রণে অত্যন্ত কার্যকরী।",
    benefits: "ওজন কমাতে সাহায্য করে, কোষ্ঠকাঠিন্য দূর করে, এনার্জি দেয়।",
    usage: "পানিতে বা ডাবের পানিতে ভিজিয়ে লেবুর রস দিয়ে সকালে সেবন করুন।",
    origin: "আমদানিকৃত (প্যারাগুয়ে)"
  },
  {
    id: "prod-mehedi-powder-detox",
    name: "মেহেদি পাউডার (Mehedi Powder)",
    category: "Detox Powders",
    price: "৳১৩০",
    originalPrice: "৳১৬৪",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1755184108959-47223012b460?q=80&w=500",
    desc: "প্রাকৃতিক মেহেদি পাতা থেকে প্রস্তুত খাঁটি পাউডার। এটি স্ক্যাল্প ও চুলে পুষ্টি যোগায়।",
    benefits: "মাথার তালু ঠান্ডা রাখে, প্রাকৃতিকভাবে কন্ডিশনিং করে, খুশকি কমায়।",
    usage: "পানির সাথে পেস্ট করে চুলে ১-২ ঘণ্টা রেখে ধুয়ে ফেলুন।",
    origin: "রাজস্থান, ভারত"
  },
  {
    id: "prod-senna-powder",
    name: "সোনাপাতা গুঁড়ো (Senna Leaves Powder)",
    category: "Detox Powders",
    price: "৳১২০",
    originalPrice: "৳১৫০",
    weight: "১০০ গ্রাম",
    rating: 4.7,
    emoji: "🍂",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500",
    desc: "কোষ্ঠকাঠিন্য দূর করতে এবং পেটের ময়লা পরিষ্কার করতে প্রাকৃতিক ল্যাক্সেটিভ সোনাপাতা গুঁড়ো।",
    benefits: "কোষ্ঠকাঠিন্য দ্রুত দূর করে, পাকস্থলী ও অন্ত্র পরিষ্কার করে, ওজন হ্রাসে সহায়ক।",
    usage: "রাতে ১/২ চা চামচ গুঁড়ো কুসুম গরম পানিতে ভিজিয়ে রেখে সকালে পান করুন।",
    origin: "খুলনা, বাংলাদেশ"
  },
  {
    id: "prod-sidr-leaves-detox",
    name: "সিডর পাতা গুঁড়ো (Sidr Leaves Powder)",
    category: "Detox Powders",
    price: "৳১৫০",
    originalPrice: "৳১৮০",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🍃",
    image: "https://images.unsplash.com/photo-1565802700474-1c8b57596859?q=80&w=500",
    desc: "বিশুদ্ধ সিডর পাতা যা শরীর ও রক্তের টক্সিন দূর করতে এবং ডার্মাটোলজিক্যাল কেয়ারে সহায়ক।",
    benefits: "রক্ত পরিষ্কার করে, চর্মরোগ উপশম করে, প্রাকৃতিক অ্যান্টি-সেপ্টিক।",
    usage: "পানির সাথে পেস্ট করে ত্বকে লাগান অথবা ডাক্তারের পরামর্শে সেবন করুন।",
    origin: "নাটোর, বাংলাদেশ"
  },

  // --- Category: Personal Care ---
  {
    id: "prod-wooden-comb",
    name: "নিম কাঠের চিরুনি (Wooden Comb)",
    category: "Personal Care",
    price: "৳১৫০",
    originalPrice: "৳১৮০",
    weight: "১ টি",
    rating: 4.9,
    emoji: "🪮",
    image: "https://images.unsplash.com/photo-1634082983637-c1382c567945?q=80&w=500",
    desc: "নিম কাঠ দিয়ে তৈরি ওষধি গুণসম্পন্ন চিরুনি যা চুলে রক্ত সঞ্চালন বাড়ায়।",
    benefits: "খুশকি ও চুল পড়া কমায়, স্ক্যাল্পের স্বাস্থ্য ভালো রাখে, স্থির তড়িৎ সৃষ্টি করে না।",
    usage: "প্রতিদিন চুল আঁচড়ানোর জন্য ব্যবহার করুন।",
    origin: "কুষ্টিয়া, বাংলাদেশ"
  },
  {
    id: "prod-miswak",
    name: "পিলু গাছের মেসওয়াক (Miswak)",
    category: "Personal Care",
    price: "৳৩০",
    originalPrice: "৳৪০",
    weight: "১ টি",
    rating: 4.8,
    emoji: "🪵",
    image: "https://images.unsplash.com/photo-1599556147887-808ef92c12d4?q=80&w=500",
    desc: "সুন্নাহসম্মত প্রাকৃতিক দাঁত পরিষ্কারক পিলু মেসওয়াক।",
    benefits: "দাঁতের মাড়ি শক্ত করে, মুখের দুর্গন্ধ দূর করে, মুখের ক্ষতিকর ব্যাকটেরিয়া ধ্বংস করে।",
    usage: "আঁশ তৈরি করে দাঁত পরিষ্কার করতে ব্যবহার করুন।",
    origin: "আমদানিকৃত (پاکستان)"
  },
  {
    id: "prod-organic-facepack",
    name: "অর্গানিক ফেসপ্যাক (Organic Facepack)",
    category: "Personal Care",
    price: "৳২৫০",
    originalPrice: "৳৩০০",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🥣",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500",
    desc: "মুলতানি মাটি, নিম, চন্দন ও বন হলুদের নিখুঁত মিশ্রণে তৈরি অর্গানিক ফেসপ্যাক।",
    benefits: "ত্বকের তৈলাক্ততা দূর করে, উজ্জ্বলতা বাড়ায়, ব্রন ও দাগ কমায়।",
    usage: "গোলাপ জল বা কাঁচা দুধের সাথে মিশিয়ে মুখে ১০-১৫ মিনিট লাগিয়ে ধুয়ে ফেলুন।",
    origin: "ইকো সুন্নাহ ল্যাব"
  },
  {
    id: "prod-organic-hair-oil",
    name: "অর্গানিক হেয়ার অয়েল (Organic Hair Oil)",
    category: "Personal Care",
    price: "৳৪৫০",
    originalPrice: "৳৫৫০",
    weight: "২০০ মি.লি.",
    rating: 4.9,
    emoji: "🧴",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500",
    desc: "২১টি ওষধি গাছের নির্যাস এবং বিশুদ্ধ তেলের মিশ্রণে তৈরি চুলের গোড়ার খাবার।",
    benefits: "নতুন চুল গজাতে সাহায্য করে, চুল পড়া রোধ করে, চুল কালো ও ঘন করে।",
    usage: "সপ্তাহে ৩ দিন রাতে ঘুমানোর আগে স্ক্যাল্পে আলতো করে মাসাজ করুন এবং সকালে ধুয়ে ফেলুন।",
    origin: "ইকো সুন্নাহ ল্যাব"
  },

  // --- Category: Hijama and Therapy instruments ---
  {
    id: "prod-hijama-loose-cups",
    name: "হিজামা লুজ কাপ (Hijama Loose Cups)",
    category: "Hijama and Therapy instruments",
    price: "৳২০",
    originalPrice: "৳২৫",
    weight: "১ টি",
    rating: 4.7,
    emoji: "🥤",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=500",
    desc: "উচ্চ মানের পলিকার্বোনেট লুজ হিজামা কাপ যা ভ্যাকুয়াম চিকিৎসায় ব্যবহৃত হয়।",
    benefits: "টেকসই, ব্যবহারে নিরাপদ এবং অত্যন্ত শক্তিশালী ভ্যাকুয়াম বজায় রাখে।",
    usage: "হিজামা থেরাপির কাপ হিসেবে ব্যবহারযোগ্য।",
    origin: "আমদানিকৃত"
  },
  {
    id: "prod-suction-with-pipe",
    name: "পাইপসহ সাকশন মেশিন (Suction Machine with pipe)",
    category: "Hijama and Therapy instruments",
    price: "৳৮০০",
    originalPrice: "৳১০০০",
    weight: "১ টি",
    rating: 4.8,
    emoji: "🔌",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=500",
    desc: "হিজামা কাপে ভ্যাকুয়াম তৈরির জন্য পাইপযুক্ত শক্তিশালী সাকশন গান/মেশিন।",
    benefits: "ব্যবহার করা সহজ, পিঠ ও অন্যান্য দুর্গম জায়গায় সহজেই হিজামা করা যায়।",
    usage: "পাইপের মাধ্যমে কাপের সাথে যুক্ত করে সাকশন করুন।",
    origin: "আমদানিকৃত"
  },
  {
    id: "prod-suction-without-pipe",
    name: "পাইপ ছাড়া সাকশন মেশিন (Suction Machine without pipe)",
    category: "Hijama and Therapy instruments",
    price: "৳৫০০",
    originalPrice: "৳৬৫০",
    weight: "১ টি",
    rating: 4.7,
    emoji: "🔫",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=500",
    desc: "সরাসরি কাপে লাগিয়ে ব্যবহারের জন্য হ্যান্ড সাকশন গান বা পাম্প।",
    benefits: "হালকা, পোর্টেবল এবং অত্যন্ত টেকসই।",
    usage: "সরাসরি হিজামা কাপের মাথায় লক করে ভ্যাকুয়াম তৈরি করুন।",
    origin: "আমদানিকৃত"
  },
  {
    id: "prod-massage-gel",
    name: "ম্যাসাজ জেল (Massage Gel)",
    category: "Hijama and Therapy instruments",
    price: "৳২৫০",
    originalPrice: "৳৩০০",
    weight: "২৫০ মি.লি.",
    rating: 4.8,
    emoji: "🧴",
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=500",
    desc: "হিজামার আগে বা পরে বডি ম্যাসাজের জন্য প্রশান্তিদায়ক ম্যাসাজ জেল।",
    benefits: "ত্বকে পিচ্ছিলতা বাড়ায়, পেশির ক্লান্তি দূর করে, ত্বককে হাইড্রেটেড রাখে।",
    usage: "পরিমাণমতো নিয়ে শরীরে মালিশ করুন।",
    origin: "ইকো সুন্নাহ ল্যাব"
  },
  {
    id: "prod-massage-roller",
    name: "বডি ম্যাসাজ রোলার (Body massage roller)",
    category: "Hijama and Therapy instruments",
    price: "৳৩৫০",
    originalPrice: "৳৪৫০",
    weight: "১ টি",
    rating: 4.6,
    emoji: "🌀",
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=500",
    desc: "পেশির শক্তভাব ও ব্যথা কমাতে বডি ম্যাসাজ রোলার।",
    benefits: "রক্ত সঞ্চালন বাড়ায়, স্ট্রেস কমায়, পেশিকে শিথিল করে।",
    usage: "শরীরের পিঠ, ঘাড় ও পায়ে রোল করে মাসাজ করুন।",
    origin: "আমদানিকৃত"
  },
  {
    id: "prod-guasha-scrapper",
    name: "গুয়াশা ম্যাসাজ স্ক্র্যাপার (Guasha Massage Scrapper)",
    category: "Hijama and Therapy instruments",
    price: "৳৪০০",
    originalPrice: "৳৫৫০",
    weight: "১ টি",
    rating: 4.8,
    emoji: "💎",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=500",
    desc: "প্রাচীন থেরাপিউটিক গুয়াশা স্ক্র্যাপার যা ফেসিয়াল ও বডি টক্সিন দূর করতে সহায়ক।",
    benefits: "ত্বকের সজীবতা বাড়ায়, রক্ত সঞ্চালন বৃদ্ধি করে, ফোলাভাব কমায়।",
    usage: "ম্যাসাজ তেল মেখে গুয়াশা স্ক্র্যাপার দিয়ে ত্বক স্ক্র্যাপ করুন।",
    origin: "আমদানিকৃত"
  },
  {
    id: "prod-hijama-set-12",
    name: "ফুল হিজামা সেট - ১২ কাপ (Full Hijama Set - 12 Cup)",
    category: "Hijama and Therapy instruments",
    price: "৳৭৫০",
    originalPrice: "৳৯৫০",
    weight: "১ সেট",
    rating: 4.9,
    emoji: "📦",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=500",
    desc: "১২টি বিভিন্ন সাইজের প্রিমিয়াম কোয়ালিটির কাপ ও সাকশন গানসহ ফুল হিজামা কিট।",
    benefits: "বাসায় নিজেই হিজামা করার সম্পূর্ণ প্যাকেজ।",
    usage: "বক্সের নির্দেশনা অনুযায়ী হিজামা করুন।",
    origin: "আমদানিকৃত"
  },
  {
    id: "prod-hijama-set-24",
    name: "ফুল হিজামা সেট - ২৪ কাপ (Full Hijama Set - 24 Cup)",
    category: "Hijama and Therapy instruments",
    price: "৳১২০০",
    originalPrice: "৳১৫০০",
    weight: "১ সেট",
    rating: 5.0,
    emoji: "🎒",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=500",
    desc: "২৪টি কাপ, সাকশন গান, পাইপ ও ইউজার ম্যানুয়ালসহ প্রফেশনাল ব্যবহারের হিজামা সেট।",
    benefits: "দীর্ঘস্থায়ী ও ক্লিনিক্যাল কোয়ালিটি।",
    usage: "প্রফেশনাল থেরাপির জন্য পারফেক্ট সেট।",
    origin: "আমদানিকৃত"
  },
  {
    id: "prod-silicon-cup",
    name: "সিলিকন কাপ (Silicon Cup)",
    category: "Hijama and Therapy instruments",
    price: "৳১৫০",
    originalPrice: "৳২০০",
    weight: "১ টি",
    rating: 4.8,
    emoji: "🥣",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=500",
    desc: "মেশিন ছাড়াই ব্যবহারের জন্য সেলফ-ভ্যাকুয়াম সিলিকন হিজামা ও ফেসিয়াল কাপ।",
    benefits: "নরম সিলিকন বডি, ফেসিয়াল ও স্কিন স্যাগিং চিকিৎসায় দারুণ কার্যকর।",
    usage: "হালকা চেপে ত্বক লাগালে স্বয়ংক্রিয় ভ্যাকুয়াম তৈরি হবে।",
    origin: "আমদানিকৃত"
  },
  {
    id: "prod-fire-cup-set",
    name: "ফুল ফায়ার কাপ সেট (Full Fire Cup Set)",
    category: "Hijama and Therapy instruments",
    price: "৳১৮০০",
    originalPrice: "৳২২০০",
    weight: "১ সেট",
    rating: 4.9,
    emoji: "🔥",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=500",
    desc: "ফায়ার থেরাপি বা কাপিং থেরাপির জন্য পুরু কাচের তৈরি প্রফেশনাল ফায়ার কাপ সেট।",
    benefits: "ডি-টক্সিকেশন, গভীরভাবে পেশির ব্যথা নিরাময়, মেদ ও চর্বি কমাতে সাহায্য করে।",
    usage: "অ্যালকোহল ও ফায়ার টর্চ ব্যবহার করে ভ্যাকুয়াম তৈরি করুন (শুধুমাত্র ট্রেইন্ড প্রফেশনালদের জন্য)।",
    origin: "আমদানিকৃত"
  },

  // --- Category: Herbal Wellness ---
  {
    id: "prod-amla",
    name: "আমলকি পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳৯০",
    originalPrice: "৳১১৩",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🥝",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=500",
    desc: "ভিটামিন সি সমৃদ্ধ আমলকি ত্বক ও চুলের উজ্জ্বলতা বৃদ্ধি করে এবং হজম শক্তি বাড়ায়।",
    benefits: "চুল পড়া রোধ করে, রোগ প্রতিরোধ ক্ষমতা বাড়ায়, হজমে সাহায্য করে।",
    usage: "কুসুম গরম পানিতে মিশিয়ে অথবা ফেসপ্যাক ও হেয়ারপ্যাক হিসেবে সরাসরি ব্যবহার করা যায়।",
    origin: "বান্দরবান পার্বত্য অঞ্চল"
  },
  {
    id: "prod-reetha",
    name: "রিঠা পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳১০০",
    originalPrice: "৳১২৬",
    weight: "১০০ গ্রাম",
    rating: 4.7,
    emoji: "🫧",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=500",
    desc: "চুলের প্রাকৃতিক ক্লিনজার হিসেবে রিঠা অত্যন্ত কার্যকরী। এটি খুশকি দূর করে ও চুলকে রেশমি করে।",
    benefits: "খুшকি দূর করে, চুলের উজ্জ্বলতা বাড়ায়, কেমিক্যাল-মুক্ত ক্লিনজার।",
    usage: "পানিতে ভিজিয়ে রেখে সেই পানি দিয়ে চুল ধুয়ে ফেলুন অথবা শ্যাম্পু হিসেবে ব্যবহার করুন।",
    origin: "চট্টগ্রাম ও হিল ট্র্যাক্টস"
  },
  {
    id: "prod-shikakai",
    name: "শিকাকাই পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳১১০",
    originalPrice: "৳১৩৯",
    weight: "১০০ গ্রাম",
    rating: 4.7,
    emoji: "🌾",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=500",
    desc: "প্রাচীনকাল থেকে চুলের যত্নে শিকাকাই ব্যবহৃত হয়ে আসছে। এটি চুলের গোড়া মজবুত ও নরম করে।",
    benefits: "চুলের গোড়া মজবুত করে, অকালপক্বতা রোধ করে, প্রাকৃতিক কন্ডিশনার।",
    usage: "গুঁড়ো করে পানির সাথে মিশিয়ে পেস্ট তৈরি করে স্ক্যাল্পে ২০ মিনিট লাগিয়ে ধুয়ে ফেলুন।",
    origin: "সিলেট পাহাড়ি অঞ্চল"
  },
  {
    id: "prod-bahera",
    name: "বহেরা পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳৬০",
    originalPrice: "৳৭৬",
    weight: "১০০ গ্রাম",
    rating: 4.6,
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500",
    desc: "বহেরা চুলের অকালপক্বতা রোধ করে এবং চুলের গোড়া শক্ত করে। এটি কোষ্ঠকাঠিন্য দূর করতেও সাহায্য করে।",
    benefits: "চুল পড়া কমায়, কোষ্ঠকাঠিন্য দূর করে, স্ক্যাল্পের চুলকানি কমায়।",
    usage: "রাতে পানিতে ভিজিয়ে রেখে সকালে ছেঁকে পানি পান করুন অথবা চুলে ব্যবহার করুন।",
    origin: "টাঙ্গাইল শালবন"
  },
  {
    id: "prod-methi",
    name: "মেথি পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳৬০",
    originalPrice: "৳৭৬",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🌰",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=500",
    desc: "চুল পড়া রোধ এবং খুশকি দূর করতে মেথি অসাধারণ কাজ করে। এটি ত্বকের অতিরিক্ত তেল নিয়ন্ত্রণ করে।",
    benefits: "চুল পড়া রাতারাতি কমায়, নতুন চুল গজাতে সাহায্য করে, খুশকি দূর করে।",
    usage: "টক দই বা পানির সাথে মিশিয়ে হেয়ার প্যাক বানিয়ে মাথায় ব্যবহার করুন।",
    origin: "রাজশাহী, বাংলাদেশ"
  },
  {
    id: "prod-flaxseed-raw",
    name: "তিসি (ফ্ল্যাক্সসিড) (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳৭০",
    originalPrice: "৳৮৮",
    weight: "১০০ গ্রাম",
    rating: 4.9,
    emoji: "🌱",
    image: "https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=500",
    desc: "তিসি বীজ ওমেগা-৩ ফ্যাটি এসিডে সমৃদ্ধ। এটি চুলের স্বাস্থ্য পুনরুদ্ধার করতে জেল হিসেবে ব্যবহৃত হয়।",
    benefits: "চুল পড়া রোধ করে, ত্বক নরম ও মসৃণ করে, কোলেস্টেরল নিয়ন্ত্রণে সাহায্য করে।",
    usage: "পানিতে ফুটিয়ে জেল তৈরি করে চুলে লাগান অথবা সেবন করতে পারেন।",
    origin: "যশোর, বাংলাদেশ"
  },
  {
    id: "prod-curry-leaf-dry",
    name: "শুকনো কারি পাতা (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳২৫০",
    originalPrice: "৳৩১৫",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🍃",
    image: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?q=80&w=500",
    desc: "চুলের প্রাকৃতিক কালো রঙ বজায় রাখতে এবং অকালপক্বতা রোধে শুকনো কারি পাতা দারুণ কাজ করে।",
    benefits: "চুলের মেলানিন বজায় রাখে, অকালপক্বতা রোধ করে, চুলের গোড়া মজবুত করে।",
    usage: "তেলের সাথে জ্বাল দিয়ে চুলে ব্যবহার করতে পারেন অথবা রান্নায় সুগন্ধির জন্য ব্যবহার করতে পারেন।",
    origin: "শ্রীমঙ্গল, বাংলাদেশ"
  },
  {
    id: "prod-curry-leaf-powder",
    name: "কারি পাতার পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳২০০",
    originalPrice: "৳২৫২",
    weight: "১০০ গ্রাম",
    rating: 4.7,
    emoji: "🍃",
    image: "https://images.unsplash.com/photo-1623048839784-a5608f7a7097?q=80&w=500",
    desc: "প্রিমিয়াম কারি পাতা থেকে তৈরি সূক্ষ্ম পাউডার। চুলে পুষ্টি যোগায় ও চুল পড়া কমায়।",
    benefits: "চুল লম্বা হতে সাহায্য করে, চুলের রুক্ষতা কমায়, পুষ্টি যোগায়।",
    usage: "নারকেল তেলের সাথে মিশিয়ে মাথায় মালিশ করুন অথবা হেয়ার মাস্ক হিসেবে ব্যবহার করুন।",
    origin: "শ্রীমঙ্গল, বাংলাদেশ"
  },
  {
    id: "prod-henna",
    name: "হেনা পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳১৩০",
    originalPrice: "৳১৬৪",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1704079698754-5e621edb610b?q=80&w=500",
    desc: "১০০% খাঁটি মেহেদি পাতা থেকে প্রস্তুত। এটি চুলে চমৎকার প্রাকৃতিক রঙ ও কন্ডিশনিং প্রদান করে।",
    benefits: "চুলে প্রাকৃতিক তামাটে রঙ দেয়, কন্ডিশনার হিসেবে কাজ করে, মাথার তালু ঠান্ডা রাখে।",
    usage: "চায়ের লিকার বা পানির সাথে মিশিয়ে পেস্ট করে চুলে ১-২ ঘণ্টা রেখে ধুয়ে ফেলুন।",
    origin: "রাজস্থান, ভারত"
  },
  {
    id: "prod-hibiscus-powder",
    name: "জবা পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳২২০",
    originalPrice: "৳২৭৭",
    weight: "১০০ গ্রাম",
    rating: 4.9,
    emoji: "🌺",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=500",
    desc: "জবা ফুলে রয়েছে প্রাকৃতিক অ্যামিনো এসিড ও ভিটামিন সি, যা চুলের অকালপক্বতা রোধে দারুণ সাহায্য করে।",
    benefits: "চুল পড়া রোধ করে, খুশকি দূর করে, চুল মসৃণ ও রেশমি করে।",
    usage: "টক দই বা মধুর সাথে মিশিয়ে হেয়ার মাস্ক তৈরি করে সপ্তাহে ১ দিন ব্যবহার করুন।",
    origin: "ঝিনাইদহ, বাংলাদেশ"
  },
  {
    id: "prod-hibiscus-dry",
    name: "শুকনো জবা ফুল (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳২০০",
    originalPrice: "৳২৫২",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🌸",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=500",
    desc: "হাতে বাছাইকৃত শুকনো জবা ফুল। এটি চুলে সরাসরি বা তেলের সাথে জ্বাল দিয়ে ব্যবহার করা যায়।",
    benefits: "নতুন চুল গজাতে ও খুশকি মুক্ত রাখতে অত্যন্ত সাহায্য করে।",
    usage: "নারকেল তেলের সাথে ফুটিয়ে লালচে তেল তৈরি করে মাথায় মালিশ করুন।",
    origin: "ঝিনাইদহ, বাংলাদেশ"
  },
  {
    id: "prod-rose-dry",
    name: "শুকনো গোলাপ (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳১২০",
    originalPrice: "৳১৫১",
    weight: "১০০ গ্রাম",
    rating: 4.7,
    emoji: "🌹",
    image: "https://images.unsplash.com/photo-1578439231583-9eca0a363860?q=80&w=500",
    desc: "সুগন্ধযুক্ত শুকনো গোলাপের পাপড়ি। এটি ত্বককে সতেজ করতে এবং স্কিন টোনার তৈরিতে ব্যবহৃত হয়।",
    benefits: "ত্বক নরম ও সতেজ করে, এন্টি-অক্সিডেন্ট সমৃদ্ধ, মানসিক প্রশান্তি দেয়।",
    usage: "পানিতে ফুটিয়ে গোলাপ জল তৈরি করুন অথবা গোসলের পানিতে দিয়ে ফ্রেশ ফিল পান।",
    origin: "সাভার, বাংলাদেশ"
  },
  {
    id: "prod-rose-powder",
    name: "গোলাপ পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳২০০",
    originalPrice: "৳২৫২",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🌷",
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?q=80&w=500",
    desc: "গোলাপের পাপড়ি থেকে তৈরি অর্গানিক পাউডার। এটি ত্বককে ভেতর থেকে পরিষ্কার ও নরম রাখে।",
    benefits: "ত্বকে উজ্জ্বল গোলাপি আভা আনে, ডার্ক সার্কেল কমায়, পিএইচ ব্যালেন্স ঠিক রাখে।",
    usage: "দুধ বা গোলাপ জলের সাথে মিশিয়ে ফেসপ্যাক হিসেবে মুখে ১০-১৫ মিনিট লাগিয়ে রাখুন।",
    origin: "সাভার, বাংলাদেশ"
  },
  {
    id: "prod-multani",
    name: "মুলতানি মাটি (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳১০০",
    originalPrice: "৳১২৬",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🪨",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500",
    desc: "তৈলাক্ত ও ব্রন প্রবণ ত্বকের জন্য অত্যন্ত উপকারী। এটি ত্বক গভীর থেকে ডিটক্স ও পরিষ্কার করে।",
    benefits: "অতিরিক্ত তেল নিয়ন্ত্রণ করে, ব্রন দূর করে, ত্বকের কালো দাগ কমায়।",
    usage: "গোলাপ জলের সাথে মিশিয়ে পেস্ট করে মুখে ১০-১৫ মিনিট রাখুন, শুকিয়ে গেলে ধুয়ে ফেলুন।",
    origin: "আমদানিকৃত (پاکستان)"
  },
  {
    id: "prod-bhringraj",
    name: "ভৃঙ্গরাজ পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳১০০",
    originalPrice: "৳১২৬",
    weight: "১০০ গ্রাম",
    rating: 4.9,
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500",
    desc: "ভৃঙ্গরাজ বা কেশরাজ চুলের জন্য সঞ্জীবনী বুটি। এটি চুলের অকালপক্বতা রোধে সবচেয়ে সেরা উপাদান।",
    benefits: "চুলের অকালপক্বতা দূর করে, দ্রুত চুল লম্বা করে, চুলের উজ্জ্বলতা ফেরায়।",
    usage: "নারকেল তেল বা আমলকির রসের সাথে মিশিয়ে মাথায় ব্যবহার করুন।",
    origin: "খাগড়াছড়ি পার্বত্য অঞ্চল"
  },
  {
    id: "prod-neem",
    name: "নিম পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳১০০",
    originalPrice: "৳১২৬",
    weight: "১০০ গ্রাম",
    rating: 4.7,
    emoji: "🍃",
    image: "https://images.unsplash.com/photo-1633509817627-5a29634475af?q=80&w=500",
    desc: "নিম পাতার অ্যান্টি-ব্যাকটেরিয়াল ও অ্যান্টি-ফাঙ্গাল উপাদান খুশকি ও মাথার ত্বকের চুলকানি দূর করতে সাহায্য করে।",
    benefits: "খুশকি ও চুলকানি দূর করে, ত্বকের এলার্জি কমায়, ব্রন নিরাময় করে।",
    usage: "পানির সাথে পেস্ট বানিয়ে মাথায় বা ত্বকের আক্রান্ত স্থানে ১০ মিনিট রেখে ধুয়ে নিন।",
    origin: "নাটোর, বাংলাদেশ"
  },
  {
    id: "prod-moringa-powder-wellness",
    name: "মোরিঙ্গা পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳১৮০",
    originalPrice: "৳২২৭",
    weight: "১০০ গ্রাম",
    rating: 4.9,
    emoji: "🥬",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=500",
    desc: "সুপারফুড সজনে পাতা বা মোরিঙ্গা ভিটামিন, ক্যালসিয়াম ও আয়রনের পাওয়ার হাউস।",
    benefits: "রোগ প্রতিরোধ ক্ষমতা বাড়ায়, রক্তস্বল্পতা কমায়, এনার্জি বুস্ট করে।",
    usage: "১ চা চামচ পাউডার পানিতে গুলিয়ে সকালে খালি পেটে পান করুন।",
    origin: "কুষ্টিয়া, বাংলাদেশ"
  },
  {
    id: "prod-indigo",
    name: "ইন্ডিগো পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳৩০০",
    originalPrice: "৳৩৭৮",
    weight: "১০০ গ্রাম",
    rating: 4.7,
    emoji: "🔵",
    image: "https://images.unsplash.com/photo-1558703374-f9a51255e1cc?q=80&w=500",
    desc: "চুল প্রাকৃতিক উপায়ে কালো করার সেরা উপায় ইন্ডিগো বা নীল পাতা পাউডার। এটি কেমিক্যাল ডাই-এর উত্তম বিকল্প।",
    benefits: "মিক্যাল ছাড়াই চুল কালো করে, মেহেন্দি ব্যবহারের পর লাগালে সুন্দর কালো রঙ আসে।",
    usage: "মেহেদি লাগানোর পর, ইন্ডিগো পাউডার হালকা গরম পানিতে গুলিয়ে চুলে ১ ঘণ্টা লাগিয়ে ধুয়ে ফেলুন।",
    origin: "কুষ্টিয়া, বাংলাদেশ"
  },
  {
    id: "prod-wild-turmeric",
    name: "বন হলুদ পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳২৩০",
    originalPrice: "৳২৯০",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🌼",
    image: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?q=80&w=500",
    desc: "ত্বকের উজ্জ্বলতা ফিরিয়ে আনতে কস্তুরী হলুদ বা বন হলুদ অতুলনীয়।",
    benefits: "ত্বক উজ্জ্বল করে, ব্রনের জীবাণু মারে, ত্বকের কালো ছোপ ছোপ দাগ দূর করে।",
    usage: "দুধ বা মধুর সাথে মিশিয়ে মুখে লাগিয়ে ১৫ মিনিট পর কুসুম গরম পানি দিয়ে ধুয়ে ফেলুন।",
    origin: "বান্দরবান, বাংলাদেশ"
  },
  {
    id: "prod-beetroot",
    name: "বিটরুট পাউডার (১০০ গ্রাম)",
    category: "Herbal Wellness",
    price: "৳৩০০",
    originalPrice: "৳৩৭৮",
    weight: "১০০ গ্রাম",
    rating: 4.9,
    emoji: "🍠",
    image: "https://images.unsplash.com/photo-1744028982670-67ca067bedfa?q=80&w=500",
    desc: "ত্বক ও ঠোঁটে প্রাকৃতিক লালচে ভাব আনতে বিটরুট পাউডার ব্যবহার করা হয়। এটি আয়রনে ভরপুর।",
    benefits: "ঠোঁটের কালো ভাব দূর করে গোলাপি আভা আনে, রক্তে হিমোগ্লোবিন বাড়ায়।",
    usage: "ঠোঁটের জন্য ভেসলিনের সাথে মিশিয়ে স্ক্রাব করুন অথবা ফেসপ্যাকে ব্যবহার করুন।",
    origin: "আমদানিকৃত (ভারত)"
  },
  {
    id: "prod-rosemary-dry-25",
    name: "শুকনো রোজমেরি (Dry Rosemary - 25g)",
    category: "Herbal Wellness",
    price: "৳৯০",
    originalPrice: "৳১১৩",
    weight: "২৫ গ্রাম",
    rating: 4.9,
    emoji: "🪴",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500",
    desc: "চুল লম্বা ও ঘন করার জন্য বিশ্বজুড়ে সমাদৃত শুকনো রোজমেরি পাতা।",
    benefits: "নতুন চুল গজাতে অত্যন্ত সাহায্য করে, স্ক্যাল্পের রক্তসঞ্চালন বাড়ায়, খুশকি কমায়।",
    usage: "১০-১৫ মিনিট পানিতে ফুটিয়ে ছেঁকে নিয়ে হেয়ার স্প্রে বা টোনার হিসেবে ব্যবহার করুন।",
    origin: "আমদানিকৃত (ইতালি)",
    isHot: true
  },
  {
    id: "prod-rosemary-dry-50",
    name: "শুকনো রোজমেরি (Dry Rosemary - 50g)",
    category: "Herbal Wellness",
    price: "৳১৬০",
    originalPrice: "৳২০২",
    weight: "৫০ গ্রাম",
    rating: 4.9,
    emoji: "🪴",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500",
    desc: "প্রিমিয়াম শুকনো রোজমেরি পাতা। এটি চুলে প্রাকৃতিক জেল্লা এনে দেয় এবং চুল পড়া দ্রুত কমায়।",
    benefits: "চুলের গোড়া শক্ত করে, নতুন চুল গজাতে অত্যন্ত সাহায্য করে, খুশকি কমায়।",
    usage: "১০-১৫ মিনিট পানিতে ফুটিয়ে ছেঁকে নিয়ে হেয়ার স্প্রে বা টোনার হিসেবে ব্যবহার করুন।",
    origin: "আমদানিকৃত (ইতালি)",
    isHot: true
  },
  {
    id: "prod-rosemary-dry-100",
    name: "শুকনো রোজমেরি (Dry Rosemary - 100g)",
    category: "Herbal Wellness",
    price: "৳২৫০",
    originalPrice: "৳৩১৫",
    weight: "১০০ গ্রাম",
    rating: 5.0,
    emoji: "🪴",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=500",
    desc: "আমাদের বেস্ট সেলিং শুকনো রোজমেরি পাতা। চুলের দ্রুত বৃদ্ধিতে এটি একটি শক্তিশালী প্রাকৃতিক উপাদান।",
    benefits: "চুল পড়া দ্রুত কমায়, চুলের গোড়া মজবুত করে, নতুন চুল গজায়।",
    usage: "১০-১৫ মিনিট পানিতে ফুটিয়ে ছেঁকে নিয়ে হেয়ার স্প্রে বা টোনার হিসেবে ব্যবহার করুন।",
    origin: "আমদানিকৃত (ইতালি)",
    isHot: true
  },

  // --- Category: Organic and Hand Made Products ---
  {
    id: "prod-facial-cleanser",
    name: "ফেসিয়াল ক্লিনজার (১০০ গ্রাম)",
    category: "Organic and Hand Made Products",
    price: "৳১৮০",
    originalPrice: "৳২২৭",
    weight: "১০০ গ্রাম",
    rating: 4.8,
    emoji: "🧼",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=500",
    desc: "সম্পূর্ণ ঘরোয়া ও প্রাকৃতিক উপাদানে তৈরি ফেস ক্লিনজার। এটি ত্বকের প্রাকৃতিক পিএইচ ঠিক রেখে গভীর থেকে ত্বক পরিষ্কার করে।",
    benefits: "ত্বকের ময়লা ও টক্সিন দূর করে, ত্বক শুষ্ক করে না, সম্পূর্ণ কেমিক্যাল-মুক্ত।",
    usage: "সামান্য পানি দিয়ে মুখে ম্যাসাজ করে ফেনা তৈরি করুন এবং ভালো করে ধুয়ে ফেলুন।",
    origin: "ইকো সুন্নাহ ল্যাব"
  },
  {
    id: "prod-herbal-shampoo",
    name: "হারবাল শ্যাম্পু (১০০ মি.লি.)",
    category: "Organic and Hand Made Products",
    price: "৳৩০০",
    originalPrice: "৳৩৭৮",
    weight: "১০০ মি.লি.",
    rating: 4.9,
    emoji: "🧴",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=500",
    desc: "রিঠা, শিকাকাই ও আমলকির নির্যাস সমৃদ্ধ ঘরোয়া হারবাল শ্যাম্পু। এটি চুলের গোড়া শক্ত করতে এবং চুল সতেজ রাখতে দারুণ সাহায্য করে।",
    benefits: "চুল পড়া কমায়, খুশকি মুক্ত রাখে, প্রাকৃতিকভাবে কন্ডিশনিং করে।",
    usage: "ভেজা চুলে পরিমাণমতো নিয়ে ম্যাসাজ করুন এবং ১-২ মিনিট পর পানি দিয়ে ধুয়ে ফেলুন।",
    origin: "ইকো সুন্নাহ ল্যাব"
  },
  {
    id: "prod-flaxseed-toner",
    name: "তিসি হেয়ার টোনার (১০০ মি.লি.)",
    category: "Organic and Hand Made Products",
    price: "৳১৫০",
    originalPrice: "৳১৮৯",
    weight: "১০০ মি.লি.",
    rating: 4.8,
    emoji: "💧",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=500",
    desc: "তিসি থেকে তৈরি পানি সমৃদ্ধ লাইটওয়েট হেয়ার টোনার। এটি চুলকে ঘন ও নরম করতে এবং রুক্ষতা দূর করতে অত্যন্ত উপযোগী।",
    benefits: "চুল সিল্কি ও মসৃণ করে, চুলের রুক্ষতা দূর করে, গোড়া মজবুত করে।",
    usage: "গোসলের পর বা রাতে ঘুমানোর আগে শুকনো স্ক্যাল্প ও চুলে স্প্রে করে হালকা ম্যাসাজ করুন।",
    origin: "ইকো সুন্নাহ ল্যাব"
  },
  {
    id: "prod-rosemary-toner",
    name: "রোজমেরি হেয়ার টোনার (১০০ মি.লি.)",
    category: "Organic and Hand Made Products",
    price: "৳২০০",
    originalPrice: "৳২৫২",
    weight: "১০০ মি.লি.",
    rating: 4.9,
    emoji: "💧",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=500",
    desc: "বিশুদ্ধ রোজমেরি পাতার নির্যাস থেকে প্রস্তুত আমাদের জনপ্রিয় হেয়ার টোনার। এটি নতুন চুল গজাতে বিশ্বব্যাপী সর্বাধিক প্রশংসিত।",
    benefits: "নতুন চুল দ্রুত গজাতে সাহায্য করে, চুল পড়া অবিলম্বে বন্ধ করে, স্ক্যাল্প রিফ্রেশ করে।",
    usage: "প্রতিদিন স্ক্যাল্পে স্প্রে করুন (ধোয়ার প্রয়োজন নেই) এবং আঙুল দিয়ে হালকা ম্যাসাজ করুন।",
    origin: "ইকো সুন্নাহ ল্যাব",
    isHot: true
  },
  {
    id: "prod-rosemary-oil",
    name: "রোজমেরি অয়েল (১০০ মি.লি.)",
    category: "Organic and Hand Made Products",
    price: "৳৩০০",
    originalPrice: "৳৩৭৮",
    weight: "১০০ মি.লি.",
    rating: 5.0,
    emoji: "🪔",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=500",
    desc: "অত্যন্ত শক্তিশালী এবং বিশুদ্ধ রোজমেরি অয়েল যা নারকেল বা অলিভ অয়েলের সাথে ক্যারিয়ার অয়েল হিসেবে চুলে পুষ্টি যোগায়।",
    benefits: "চুলের বৃদ্ধি দ্রুত ত্বরান্বিত করে, গোড়াকে অতিশক্তিশালী করে, খুশকি ও চুলকানি নিরাময় করে।",
    usage: "যেকোনো ক্যারিয়ার অয়েলের সাথে মিশিয়ে সপ্তাহে ২-৩ বার চুলে ও স্ক্যাল্পে আলতো করে মালিশ করুন।",
    origin: "ইকো সুন্নাহ ল্যাব",
    isHot: true
  }
];

export default function ShopPage() {
  const { cart, addToCart, updateCartQty, createOrder, orders, confirmOrderReceived } = useApp();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [activeOrderTab, setActiveOrderTab] = useState("All");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [activeView, setActiveView] = useState("products"); // "products", "cart", "orders"
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const view = params.get("view");
      if (view === "cart") {
        setActiveView("cart");
      }
    }
  }, []);

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
    const numericPrice = parsePrice(item.price);
    return acc + (numericPrice * item.qty);
  }, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setToastMessage("Online order confirmation is coming soon! (অনলাইন অর্ডার নিশ্চিতকরণ সিস্টেম খুব শীঘ্রই আসছে!)");
    setTimeout(() => setToastMessage(null), 4000);
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
                className={`flex items-center gap-2 pb-2 pt-1 border-b-2 text-xs font-black transition-all ${activeView === "products"
                  ? "border-emerald-600 text-emerald-800"
                  : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
              >
                <span>🛍️ Products</span>
              </button>

              <button
                onClick={() => setActiveView("cart")}
                className={`flex items-center gap-2 pb-2 pt-1 border-b-2 text-xs font-black transition-all relative ${activeView === "cart"
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
                className={`flex items-center gap-2 pb-2 pt-1 border-b-2 text-xs font-black transition-all ${activeView === "orders"
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
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search prophetic medicines & wellness items..."
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl pl-10 pr-10 py-2.5 text-slate-800 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all shadow-inner font-semibold"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => { setSearchQuery(""); setCurrentPage(1); }}
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
                      onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all shrink-0 snap-align-start border ${activeCategory === cat
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
                      onBuyNow={(prod) => {
                        addToCart({ id: prod.id, name: prod.name, price: prod.price, unit: prod.weight });
                        setActiveView("cart");
                      }}
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
                      className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === pageNumber
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
                            <span>৳{parsePrice(item.price) * item.qty}</span>
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
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeOrderTab === tab
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
                        className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${isSelected
                          ? "border-emerald-500 shadow-[0_10px_25px_-5px_rgba(4,120,87,0.08)] bg-emerald-50/5"
                          : "border-slate-200/60 hover:border-slate-350 hover:shadow-sm"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs font-black text-slate-800">{order.id}</span>
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${order.status === "Received"
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
                              <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold ${stepIndex >= 1 ? "bg-emerald-600 shadow-sm" : "bg-slate-200"
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
                              <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold ${stepIndex >= 2 ? "bg-emerald-600 shadow-sm" : "bg-slate-200 text-slate-400"
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
                              <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold ${stepIndex >= 3 ? "bg-emerald-600 shadow-sm" : "bg-slate-200 text-slate-400"
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
                              <div className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 text-white z-10 text-[10px] font-bold ${stepIndex >= 4 ? "bg-emerald-600 shadow-sm" : "bg-slate-200 text-slate-400"
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
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-3xl w-full p-6 md:p-8 relative text-slate-800 overflow-hidden">

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
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                    priority
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
                          &ldquo;{selectedProduct.sunnahRef}&rdquo;
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
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-black text-emerald-800 tracking-tight">
                        {selectedProduct.price}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-sm text-slate-400 line-through font-medium">
                          {selectedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, unit: selectedProduct.weight });
                        setSelectedProduct(null);
                      }}
                      className="border border-emerald-700 text-emerald-800 hover:bg-emerald-50 text-xs sm:text-sm font-black px-4 sm:px-6 py-3 rounded-xl transition-all active:scale-[0.97]"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => {
                        addToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, unit: selectedProduct.weight });
                        setSelectedProduct(null);
                        setActiveView("cart");
                      }}
                      className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white text-xs sm:text-sm font-black px-4 sm:px-6 py-3 rounded-xl transition-all shadow-[0_4px_14px_rgba(4,120,87,0.15)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.25)] active:scale-[0.97]"
                    >
                      Buy Now (কিনুন)
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

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
