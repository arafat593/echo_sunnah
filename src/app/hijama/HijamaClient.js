"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";
import BannerCarousel from "@/components/BannerCarousel";
import HijamaCard from "@/components/HijamaCard";

const hijamaSlides = [
  {
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600",
    badge: "ECHO SUNNAH HIJAMA (হিজামা থেরাপী)",
    title: "Revive The Blessed Sunnah of Cupping",
    desc: "Clinical grade wet cupping (Hijama) carried out under surgical hygiene levels to eliminate somatic pains, metabolic wastes, and systemic stress."
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
    badge: "Uncompromising Hygiene",
    title: "Clinical Sterile Environments",
    desc: "We strictly enforce clinical cleanliness with 100% single-use disposable cupping tools and medical gloves, protecting you from cross-contamination."
  },
  {
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600",
    badge: "Sunnah Calendar",
    title: "Upcoming Prophetic Hijama Dates",
    desc: "Maximize therapeutic benefits by booking your cupping sessions on the 17th, 19th, or 21st days of the Hijri month, recommended by the Prophet (ﷺ)."
  },
  {
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600",
    badge: "Scientific Reflex Points",
    title: "Anatomical Target Placements",
    desc: "Our certified therapists position cups on specialized biological reflex zones, target muscle triggers, and prophetic Al-Kahil zones."
  },
  {
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600",
    badge: "Post-Therapy Care",
    title: "Organic Olive & Black Seed Nourishment",
    desc: "Every wet cupping session is completed with a soothing massage using cold-pressed black seed or olive oil to accelerate skin recovery."
  }
];

export default function HijamaPage() {
  const { createBooking, bookings } = useApp();

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Detail Modal state
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  // Points Guide State
  const [activePoint, setActivePoint] = useState("kahil");

  // Therapist Filter State
  const [genderFilter, setGenderFilter] = useState("all");

  // Booking status search state
  const [searchBookingId, setSearchBookingId] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState(null);

  // Selected Hijama Category State
  const [selectedCategory, setSelectedCategory] = useState("wet");

  const hijamaCategories = {
    dry: {
      name: "Dry Cupping",
      desc: "রক্ত বের করা হয় না। শুধু কাপ দিয়ে ভ্যাকুয়াম তৈরি করা হয়। ব্যথা, টান, এবং ব্লাড সার্কুলেশন উন্নত করতে এটি ব্যবহার করা হয়।",
      icon: "⭕",
      packages: [
        {
          id: "hj-dry-1",
          title: "Basic Relief Pack",
          bengaliTitle: "বেসিক রিলিফ প্যাক",
          price: "৳৬০০",
          originalPrice: "৳৮০০",
          desc: "5 cups, 10 min session focusing on pain and muscle tension relief.",
          badge: "Budget Tier",
          image: "https://images.unsplash.com/photo-1519823551278-64ac928349d2?q=80&w=600",
          features: ["5 Dry Cups", "10 Minutes Session", "1–2 Target Points", "Pain/Tension Focus", "Surgical Grade Sterilization"],
          cups: 5,
          whyTake: "Ideal for quick relief from localized muscle stiffness and mild backaches.",
          benefits: "Fast localized pain relief, improved regional blood circulation."
        },
        {
          id: "hj-dry-2",
          title: "Standard Therapy Pack",
          bengaliTitle: "স্ট্যান্ডার্ড থেরাপি প্যাক",
          price: "৳১,০০০",
          originalPrice: "৳১,২০৯",
          desc: "8 cups, 15 min session focusing on Neck and Shoulder pain relief.",
          badge: "Mid Low Tier",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
          features: ["8 Dry Cups", "15 Minutes Session", "Neck + Shoulder Focus", "Basic Pain Relief Massage", "Muscle Tone Reset"],
          cups: 8,
          whyTake: "Designed specifically for desk workers dealing with chronic neck stiffness and shoulder fatigue.",
          benefits: "Relieves upper body stress, improves posture stiffness."
        },
        {
          id: "hj-dry-3",
          title: "Advanced Muscle Care Pack",
          bengaliTitle: "এডভান্সড মাসল কেয়ার প্যাক",
          price: "৳১,৫০০",
          originalPrice: "৳১,৮০০",
          desc: "12 cups, 20 min session for Back, Shoulder, and Legs. Deep tissue pressure relief.",
          badge: "Mid Tier",
          image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600",
          features: ["12 Dry Cups", "20 Minutes Session", "Back + Shoulder + Leg Zones", "Deep Tissue Pressure Relief", "Myofascial Release"],
          cups: 12,
          whyTake: "Perfect for active individuals and regular workouts to release lactic acid buildup.",
          benefits: "Prevents sports injuries, accelerates full-body muscular recovery."
        },
        {
          id: "hj-dry-4",
          title: "Premium Recovery Pack",
          bengaliTitle: "প্রিমিয়াম রিকভারি প্যাক",
          price: "৳২,০০০",
          originalPrice: "৳২,৫০০",
          desc: "15 cups, 25 min session covering full back, neck, and legs. Includes hot oil preparation.",
          badge: "High Tier",
          image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600",
          features: ["15 Dry Cups", "25 Minutes Session", "Full Back + Neck + Legs", "Hot Oil Preparation", "Post-Cupping Light Massage"],
          cups: 15,
          whyTake: "A therapeutic session combining the heat of organic oil with vacuum stimulation for total spine care.",
          benefits: "Soothing nervous system relaxation, profound muscle knot release."
        },
        {
          id: "hj-dry-5",
          title: "Elite Wellness Pack",
          bengaliTitle: "এলিট ওয়েলনেস প্যাক",
          price: "৳২,৮০০",
          originalPrice: "৳৩,৫০০",
          desc: "20 cups, 30 min full body session. Advanced physiotherapy style cupping.",
          badge: "Premium Tier",
          image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600",
          features: ["20 Dry Cups", "30 Minutes Session", "Full Body Coverage", "Physiotherapy Style Techniques", "Comprehensive Orthopedic Consultation"],
          cups: 20,
          whyTake: "Our most premium non-invasive session combining deep vacuum therapy with kinetic assessment.",
          benefits: "Maximizes full-body mobility, resets muscle firing sequences, improves vitality."
        }
      ]
    },
    wet: {
      name: "Wet Cupping",
      desc: "সামান্য স্ক্র্যাচ করে চামড়ার উপরিভাগ থেকে দূষিত বা নিষ্ক্রিয় রক্ত (toxin/“bad blood”) বের করা হয়। ইসলামিক এবং সুন্নাহ সম্মত হিজামা বলতে মূলত এটিকেই বোঝায়।",
      icon: "🩸",
      packages: [
        {
          id: "hj-wet-1",
          title: "Basic Sunnah Pack",
          bengaliTitle: "বেসিক সুন্নাহ প্যাক",
          price: "৳১,২০০",
          originalPrice: "৳১,৫০০",
          desc: "3–5 Sunnah points, minimal blood letting with 100% sterile disposable blades. 15 mins.",
          badge: "Entry Level",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
          features: ["3–5 Sunnah Points", "Minimal Blood Letting", "100% Sterile Disposable Blades", "15 Minutes Session", "Al-Kahil Point Coverage"],
          cups: 5,
          whyTake: "Perfect for beginners who want to fulfill the blessed prophetic Sunnah with minimal discomfort.",
          benefits: "Fulfills Islamic Sunnah, initiates blood purification process."
        },
        {
          id: "hj-wet-2",
          title: "Health Detox Pack",
          bengaliTitle: "হেলথ ডিটক্স প্যাক",
          price: "৳১,৮০০",
          originalPrice: "৳২,২০০",
          desc: "6–8 points on back and shoulder. Controlled blood removal for systemic detoxification.",
          badge: "Standard",
          image: "https://images.unsplash.com/photo-1519823551278-64ac928349d2?q=80&w=600",
          features: ["6–8 Detox Points", "Back + Shoulder Focus", "Controlled Sterile Blood Removal", "20 Minutes Session", "Prophetic Herb Sanitization"],
          cups: 8,
          whyTake: "Highly recommended for relieving chronic upper back spasms, high blood pressure symptoms, and brain fog.",
          benefits: "Flushes heavy metals, stimulates fresh red blood cell production."
        },
        {
          id: "hj-wet-3",
          title: "Therapeutic Cleanse Pack",
          bengaliTitle: "থেরাপিউটিক ক্লিন্স প্যাক",
          price: "৳২,৫০০",
          originalPrice: "৳৩,০০০",
          desc: "9–12 points covering liver, head, and back zones. Deep organ detox focus. 25 mins.",
          badge: "Mid High",
          image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600",
          features: ["9–12 Therapeutic Points", "Liver + Head + Back Zones", "Deep Systemic Detox Focus", "25 Minutes Session", "Black Seed Oil Treatment"],
          cups: 12,
          whyTake: "A powerful metabolic reset targetting major lymphatic filtration zones and detox organs.",
          benefits: "Improves liver & kidney micro-circulation, relieves migraine and chronic fatigue."
        },
        {
          id: "hj-wet-4",
          title: "Advanced Healing Pack",
          bengaliTitle: "এডভান্সড হিলিং প্যাক",
          price: "৳৩,২০০",
          originalPrice: "৳৪,০০০",
          desc: "12–15 points with full therapeutic mapping. Structured to support chronic pain recovery.",
          badge: "High",
          image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=600",
          features: ["12–15 Mapping Points", "Full Therapeutic Body Mapping", "Chronic Pain Target Support", "30 Minutes Session", "Energizer Refreshment"],
          cups: 15,
          whyTake: "Best suited for individuals suffering from long-term lower back issues, sciatica, and sleep disorders.",
          benefits: "Reduces inflammatory markers, balances hormones, decreases localized pressure."
        },
        {
          id: "hj-wet-5",
          title: "Royal Sunnah Detox Pack",
          bengaliTitle: "রয়্যাল সুন্নাহ ডিটক্স প্যাক",
          price: "৳৪,৫০০",
          originalPrice: "৳৫,৫০০",
          desc: "15–20 points full body protocol. Includes detailed consultation and recovery advice. 40 mins.",
          badge: "Premium",
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
          features: ["15–20 Comprehensive Points", "Full Body Structured Protocol", "Senior Raqi/Scholar Consultation", "40 Minutes Intensive Session", "Complete Home Recovery Kit"],
          cups: 20,
          whyTake: "Our most complete clinical wet cupping regimen for maximum detox, cellular regeneration, and spiritual barakah.",
          benefits: "Total blood revitalization, complete physical detoxification, metabolic reset."
        }
      ]
    },
    moving: {
      name: "Moving Cupping",
      desc: "কাপটি ভ্যাকুয়াম অবস্থায় ত্বকের উপরে তেল দিয়ে স্লাইড করানো হয়। এটি মাংসপেশির টান কমাতে এবং মানসিক স্ট্রেস দূর করতে চমৎকার কাজ করে।",
      icon: "💆‍♂️",
      packages: [
        {
          id: "hj-mov-1",
          title: "Relax Pack",
          bengaliTitle: "রিল্যাক্স প্যাক",
          price: "৳৮০০",
          originalPrice: "৳১,০০০",
          desc: "15 min back-only session. Light organic oil massage and smooth cup sliding.",
          badge: "Budget",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
          features: ["15 Minutes Session", "Back Only Coverage", "Light Organic Olive Oil Massage", "Smooth Cup Sliding Motion", "Stress Buster Focus"],
          cups: 2,
          whyTake: "A quick, soothing session to relieve immediate stiffness in the lower and upper back after long sits.",
          benefits: "Promotes parasympathetic relaxation, releases immediate fascia tightness."
        },
        {
          id: "hj-mov-2",
          title: "Stress Relief Pack",
          bengaliTitle: "স্ট্রেস রিলিফ প্যাক",
          price: "৳১,২০০",
          originalPrice: "৳১,৫০০",
          desc: "20 min neck and shoulder session. Moderate pressure therapy for heavy stress relief.",
          badge: "Low Mid",
          image: "https://images.unsplash.com/photo-1519823551278-64ac928349d2?q=80&w=600",
          features: ["20 Minutes Session", "Neck + Shoulder Focus", "Moderate Pressure Moving Cups", "Organic Black Seed Oil Blend", "Tension Node Targeting"],
          cups: 3,
          whyTake: "Ideal for people experiencing severe shoulder knots, desk fatigue, and stress-related tension headaches.",
          benefits: "Releases trapezoid tension, increases neck mobility, promotes deep sleep."
        },
        {
          id: "hj-mov-3",
          title: "Muscle Release Pack",
          bengaliTitle: "মাসল রিলিজ প্যাক",
          price: "৳১,৮০০",
          originalPrice: "৳২,২০০",
          desc: "30 min back and arms session. Deep muscle relaxation with advanced sliding techniques.",
          badge: "Mid",
          image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600",
          features: ["30 Minutes Session", "Back + Arms Coverage", "Deep Muscle Sliding Techniques", "Warm Oil Application", "Trigger Point Therapy"],
          cups: 4,
          whyTake: "Designed to targets muscle fibers and deep fascia layers to break down knots and scar tissue.",
          benefits: "Increases range of motion, alleviates deep muscular aches, resets posture."
        },
        {
          id: "hj-mov-4",
          title: "Sports Recovery Pack",
          bengaliTitle: "স্পোর্টস রিকভারি প্যাক",
          price: "৳২,৫০০",
          originalPrice: "৳৩,০০০",
          desc: "40 min back and legs session. Athlete-focused recovery utilizing vacuum dynamics.",
          badge: "High",
          image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600",
          features: ["40 Minutes Session", "Full Back + Legs Focus", "Athlete-Oriented Vacuum Sliding", "Magnesium Oil Infusion", "Post-Workout Lactic Acid Flush"],
          cups: 6,
          whyTake: "Designed for athletes, runners, and weightlifters to speed up recovery times and reduce post-training soreness.",
          benefits: "Flushes metabolic wastes, improves muscle tissue elasticity, reduces recovery downtime."
        },
        {
          id: "hj-mov-5",
          title: "Full Body Flow Pack",
          bengaliTitle: "ফুল বডি ফ্লো প্যাক",
          price: "৳৩,৫০০",
          originalPrice: "৳৪,৫০০",
          desc: "45–60 min full body moving cupping. Advanced relaxation and myofascial flow therapy.",
          badge: "Premium",
          image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600",
          features: ["45–60 Minutes Session", "Full Body Moving Cupping", "Advanced Myofascial Flow Therapy", "Aromatic Herbal Oils", "Total Nervous System Reset"],
          cups: 8,
          whyTake: "Our most luxurious non-invasive relaxation therapy combining full body sliding with botanical skin nutrition.",
          benefits: "Total systemic decompression, complete stress elimination, radiant skin circulation."
        }
      ]
    },
    fire: {
      name: "Fire Cupping",
      desc: "আগুন দিয়ে কাপের ভেতরের বাতাস পুড়িয়ে ভ্যাকুয়াম তৈরি করা হয়। এটি একটি ঐতিহ্যগত পদ্ধতি যা শরীরে গভীর উষ্ণতা যোগায় এবং রক্ত চলাচল বহুগুণ বাড়িয়ে দেয়।",
      icon: "🔥",
      packages: [
        {
          id: "hj-fir-1",
          title: "Traditional Starter Pack",
          bengaliTitle: "ট্রেডিশনাল স্টার্টার প্যাক",
          price: "৳৮০০",
          originalPrice: "৳১,০০০",
          desc: "5–6 traditional thick glass cups, 10–15 min session to experience the heat therapy.",
          badge: "Low",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
          features: ["5–6 Traditional Glass Cups", "10–15 Minutes Session", "Basic Thermal Vacuum Placement", "Mild Muscle Warm-up", "Certified Safety Standards"],
          cups: 6,
          whyTake: "A perfect introduction to traditional fire cupping therapy. Highly safe and relaxing.",
          benefits: "Gently warms the meridians, promotes deep cellular relaxation."
        },
        {
          id: "hj-fir-2",
          title: "Pain Relief Fire Pack",
          bengaliTitle: "পেইন রিলিফ ফায়ার প্যাক",
          price: "৳১,৪০০",
          originalPrice: "৳১,৮০০",
          desc: "8 cups focusing on shoulder and back. Combines heat with vacuum pressure to release pain.",
          badge: "Mid Low",
          image: "https://images.unsplash.com/photo-1519823551278-64ac928349d2?q=80&w=600",
          features: ["8 Heavy Duty Glass Cups", "Shoulder + Back Special Focus", "Thermal Pain Relief Placement", "15 Minutes Session", "Herbal Oil Base Application"],
          cups: 8,
          whyTake: "Specifically designed for acute shoulder and thoracic back pains, expelling cold from the body.",
          benefits: "Relieves muscle spasms, expands blood vessels, decreases localized aches."
        },
        {
          id: "hj-fir-3",
          title: "Deep Heat Therapy Pack",
          bengaliTitle: "ডিপ হিট থেরাপি প্যাক",
          price: "৳২,০০০",
          originalPrice: "৳২,৫০০",
          desc: "10–12 cups targeting muscle stiffness. Expels internal dampness and cold from tissues.",
          badge: "Mid",
          image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600",
          features: ["10–12 Fire Glass Cups", "Muscle Stiffness Targeting", "Internal Dampness Expulsion", "20 Minutes Session", "Therapeutic Warming Balm"],
          cups: 12,
          whyTake: "Recommended for chronic body fatigue, stiffness due to cold weather, and heavy muscle congestion.",
          benefits: "Enhances lymphatic drainage, warms up deep fascia layers, detoxifies muscles."
        },
        {
          id: "hj-fir-4",
          title: "Chronic Pain Pack",
          bengaliTitle: "ক্রনিক পেইন প্যাক",
          price: "৳২,৮০০",
          originalPrice: "৳৩,৫০০",
          desc: "12–15 cups focused on the spine and full back. Provides intense thermal suction for recovery.",
          badge: "High",
          image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=600",
          features: ["12–15 Fire Glass Cups", "Spine + Full Back Segmental Focus", "Intense Thermal Suction Therapy", "25 Minutes Session", "Post-Fire Soothing Gel"],
          cups: 15,
          whyTake: "Best for managing persistent sciatica, lumbar stiffness, and chronic spinal tension under safe clinical supervision.",
          benefits: "Improves spinal column circulation, relieves nerve pressure, eases deep chronic pain."
        },
        {
          id: "hj-fir-5",
          title: "Heritage Therapy Pack",
          bengaliTitle: "হেরিটেজ থেরাপি প্যাক",
          price: "৳৪,০০০",
          originalPrice: "৳৫,০০০",
          desc: "15+ cups full traditional fire cupping. A complete therapeutic heat mapping experience.",
          badge: "Premium",
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
          features: ["15+ Premium Fire Cups", "Full Traditional Heat Mapping", "Spiritual & Somatic Well-being", "30 Minutes Comprehensive Session", "Acupressure Trigger Release"],
          cups: 18,
          whyTake: "Our signature fire cupping ritual covering full meridian pathways to restore energy balance and vitality.",
          benefits: "Complete metabolic activation, deep energetic recharge, profound muscular relaxation."
        }
      ]
    },
    stationary: {
      name: "Stationary Cupping",
      desc: "কাপগুলো ভ্যাকুয়াম তৈরি করে নির্দিষ্ট ব্যথা বা রিফ্লেক্স পয়েন্টে ৫ থেকে ১৫ মিনিট স্থিরভাবে রেখে দেওয়া হয়। এটি সবচেয়ে প্রচলিত কাপিং পদ্ধতিগুলোর একটি।",
      icon: "🎯",
      packages: [
        {
          id: "hj-sta-1",
          title: "Basic Set Pack",
          bengaliTitle: "বেসিক সেট প্যাক",
          price: "৳৫০০",
          originalPrice: "৳৭০০",
          desc: "5 cups kept static for 10 minutes hold. Excellent for localized trigger points.",
          badge: "Budget",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
          features: ["5 Stationary Cups", "10 Minutes Static Hold", "Localized Trigger Point Target", "Clinical Grade Suction", "Disposable Sanitized Set"],
          cups: 5,
          whyTake: "An economical option to target a specific sore spot or localized muscle spasm.",
          benefits: "Releases static myofascial tension, increases local blood supply."
        },
        {
          id: "hj-sta-2",
          title: "Standard Hold Pack",
          bengaliTitle: "স্ট্যান্ডার্ড হোল্ড প্যাক",
          price: "৳৯০০",
          originalPrice: "৳১,২০০",
          desc: "8 cups kept static for 15 minutes hold. Addresses mid-back and shoulder tension.",
          badge: "Low Mid",
          image: "https://images.unsplash.com/photo-1519823551278-64ac928349d2?q=80&w=600",
          features: ["8 Stationary Cups", "15 Minutes Static Hold", "Mid-Back + Shoulder Target", "Systematic Suction Mapping", "Pre-Therapy Muscle Warm-up"],
          cups: 8,
          whyTake: "Ideal for relieving everyday fatigue, posture fatigue, and tension accumulated at the shoulder blades.",
          benefits: "Reduces shoulder stiffness, helps clear local metabolic wastes."
        },
        {
          id: "hj-sta-3",
          title: "Therapeutic Hold Pack",
          bengaliTitle: "থেরাপিউটিক হোল্ড প্যাক",
          price: "৳১,৫০০",
          originalPrice: "৳২,০০০",
          desc: "10–12 cups kept static for 20 minutes. Designed for deeper muscle layer stimulation.",
          badge: "Mid",
          image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=600",
          features: ["10–12 Stationary Cups", "20 Minutes Static Hold", "Deep Muscle Layer Stimulation", "Acupoint Suction Alignment", "Organic Oil Prep"],
          cups: 12,
          whyTake: "Recommended for individuals with moderate back pain or stiff joints seeking deep tissue decompression.",
          benefits: "Triggers tissue repair signals, reduces muscular knots, improves range of motion."
        },
        {
          id: "hj-sta-4",
          title: "Deep Tissue Hold Pack",
          bengaliTitle: "ডিপ টিস্যু হোল্ড প্যাক",
          price: "৳২,২০০",
          originalPrice: "৳৩,০০০",
          desc: "12–15 cups kept static for 25 minutes. Target-specific deep pressure relief.",
          badge: "High",
          image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=600",
          features: ["12–15 Stationary Cups", "25 Minutes Static Hold", "Target-Specific Deep Pressure Relief", "Sciatica & Lumbar Focus Zones", "Post-Suction Healing Balm"],
          cups: 15,
          whyTake: "Great for chronic spinal fatigue, heavy back pain, and releasing deep muscular adhesions.",
          benefits: "Decompresses tight nerve roots, increases circulation to deep spinal muscles."
        },
        {
          id: "hj-sta-5",
          title: "Full Therapy Hold Pack",
          bengaliTitle: "ফুল থেরাপি হোল্ড প্যাক",
          price: "৳৩,০০০",
          originalPrice: "৳৪,০০০",
          desc: "15–20 cups kept static for 30 minutes. Includes post-therapy soothing massage.",
          badge: "Premium",
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
          features: ["15–20 Stationary Cups", "30 Minutes Static Hold", "Full Back & Limb Suction Map", "Post-Therapy Soothing Massage", "Complete Vitality Consultation"],
          cups: 20,
          whyTake: "Our most comprehensive stationary cupping treatment for deep systemic decompression, stress relief, and muscular reset.",
          benefits: "Complete muscular reset, optimized systemic blood flow, profound full-body relaxation."
        }
      ]
    }
  };

  const sunnahDates = [
    { date: "June 3, 2026", hijri: "17 Dhul-Hijjah 1447", status: "Highly Recommended (Sunnah Date)" },
    { date: "June 5, 2026", hijri: "19 Dhul-Hijjah 1447", status: "Highly Recommended (Sunnah Date)" },
    { date: "June 7, 2026", hijri: "21 Dhul-Hijjah 1447", status: "Highly Recommended (Sunnah Date)" }
  ];

  const pointsGuide = {
    kahil: { name: "Al-Kahil (আল-কাহিল)", location: "Base of the neck, C7 vertebra", description: "The primary Sunnah point. Relieves toxic load, clears head heaviness, treats 72 illnesses as per Hadith." },
    akhday: { name: "Al-Akhdayain (আল-আখদাইন)", location: "Both sides of the neck behind ears", description: "Relieves headaches, toothaches, ear infections, throat blocks, and facial nerve numbness." },
    kativ: { name: "Al-Katifain (আল-কাতিফাইন)", location: "Shoulder blades", description: "Excellent for posture stress, neck spasms, shoulder stiffness, and respiratory congestion." }
  };

  const therapists = [
    { name: "Dr. Kamrul Hasan", gender: "Male", title: "Senior Therapist & Clinical Advisor", certs: "BPT, Certified Hijama Expert", avatar: "KH" },
    { name: "Therapist Abu Bakr", gender: "Male", title: "Sunnah Cupping Specialist", certs: "Diploma in Prophetic Medicine", avatar: "AB" },
    { name: "Aisha Siddiqa", gender: "Female", title: "Female Therapy Lead", certs: "B.Sc. Nursing, Certified Hijama Practitioner", avatar: "AS" },
    { name: "Fatima Al-Zahra", gender: "Female", title: "Female Wellness Consultant", certs: "Certified Cupping Practitioner", avatar: "FZ" }
  ];

  const filteredTherapists = genderFilter === "all"
    ? therapists
    : therapists.filter(t => t.gender.toLowerCase() === genderFilter);

  const faqs = [
    { q: "হিজামা করার সময় কি ব্যাথা লাগে?", a: "হিজামাতে খুবই হালকা স্ক্র্যাচ করা হয়, যা সুঁই ফোটার চেয়েও কম অনুভূতি দেয়। আমাদের থেরাপিস্টরা খুবই অভিজ্ঞ হওয়ায় রোগীরা কোনো বিশেষ ব্যথা অনুভব করেন না।" },
    { q: "হিজামার জন্য সবচেয়ে ভালো সময় কোনটি?", a: "হিজরি মাসের ১৭, ১৯ এবং ২১ তারিখ হিজামা করার জন্য সর্বোত্তম ও সুন্নাহসম্মত তারিখ। তবে যেকোনো রোগে যেকোনো দিন হিজামা করা জায়েজ।" },
    { q: "হিজামা করার আগে করণীয় কি?", a: "হিজামা করার কমপক্ষে ৩-৪ ঘণ্টা আগে ভারী খাবার গ্রহণ থেকে বিরত থাকতে হবে এবং শরীর হাইড্রেটেড রাখতে পর্যাপ্ত পানি পান করতে হবে।" }
  ];

  const handlePointClick = (pointKey) => {
    setActivePoint(pointKey);
  };

  const openBookingModal = (pkg) => {
    setSelectedPackage(pkg);
    setBookingModalOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const slot = e.target.slot.value;
    const name = e.target.name.value;
    const address = e.target.address.value;
    const landmark = e.target.landmark.value;
    const serviceOption = e.target.serviceOption.value;
    const paymentOption = e.target.paymentOption.value;

    const basePrice = selectedPackage?.price ? parseInt(selectedPackage.price.replace(/[^\d]/g, "")) : 0;
    const finalPrice = serviceOption === "Home" ? basePrice + 2000 : basePrice;

    if (selectedPackage) {
      createBooking({
        serviceName: selectedPackage?.title || "",
        serviceType: "hijama",
        date,
        timeSlot: slot,
        serviceOption: serviceOption === "Home" ? "Home Service" : "Center Service",
        totalPrice: finalPrice,
        paymentOption,
        landmark
      });
    }

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingModalOpen(false);
      setBookingSuccess(false);
    }, 2500);
  };

  const handleBookingSearch = (e) => {
    e.preventDefault();
    if (!searchBookingId) return;
    const found = bookings.find(b => b?.id?.toLowerCase() === searchBookingId.trim().toLowerCase());
    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult("No booking found with this ID.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        
        {/* Banner */}
        <BannerCarousel slides={hijamaSlides} />

        {/* Intro & Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-emerald-850">What is Hijama? (হিজামা কি?)</h2>
              <p className="mt-4 text-sm text-slate-650 leading-relaxed">
                Hijama, or wet cupping, is a healing therapy where vacuum pressure is created using sterile cups on specific biological reflex points on the skin. A tiny, painless superficial scratch is made to draw out stagnant, waste-filled capillary blood.
              </p>
              <p className="mt-3 text-sm text-slate-650 leading-relaxed">
                The Prophet Muhammad (ﷺ) said: <em>"Indeed the best of remedies you have is cupping (Hijama)..."</em> [Sahih al-Bukhari 5371]. It serves as a dual-mechanism healing for both metabolic body toxins and general biological wellness.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="font-bold text-emerald-850 text-sm">Biological & Physical Benefits</h3>
              <div className="grid grid-cols-2 gap-4 mt-4 text-xs text-slate-600">
                <p>✔ Boosts Immune Response</p>
                <p>✔ Clears Micro-circulatory Blocks</p>
                <p>✔ Alleviates Myofascial Spasms</p>
                <p>✔ Relieves Migraine Trigger Points</p>
                <p>✔ Decreases Inflammatory Cytokines</p>
                <p>✔ Triggers Natural Endorphins</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-emerald-850">Hijama Therapy Packages</h2>
          <p className="text-center text-xs sm:text-sm text-slate-500 mt-2 mb-8">Select a specialized cupping category and choose a package suited for your health profile</p>

          {/* Interactive Category Selector Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 justify-start lg:justify-center mb-8 scrollbar-none snap-x">
            {Object.keys(hijamaCategories).map((catKey) => {
              const cat = hijamaCategories[catKey];
              const isSelected = selectedCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 snap-align-start border ${
                    isSelected
                      ? "bg-emerald-800 border-emerald-800 text-white shadow-[0_10px_20px_-5px_rgba(6,95,70,0.3)] scale-[1.03]"
                      : "bg-white border-slate-200 hover:border-slate-350 text-slate-700 hover:bg-slate-50/50"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Category Overview Card */}
          <div className="bg-gradient-to-r from-emerald-50/60 via-teal-50/30 to-emerald-50/20 border border-emerald-500/10 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm flex flex-col md:flex-row gap-6 items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-md border border-emerald-500/10 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
              {hijamaCategories[selectedCategory].icon}
            </div>
            <div>
              <h3 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                {hijamaCategories[selectedCategory].name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-650 mt-1.5 leading-relaxed font-semibold">
                {hijamaCategories[selectedCategory].desc}
              </p>
            </div>
          </div>

          {/* Dynamic Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hijamaCategories[selectedCategory].packages.map((pkg) => (
              <HijamaCard
                key={pkg.id}
                pkg={pkg}
                onCardClick={() => {
                  setSelectedDetailItem({ ...pkg, type: 'package' });
                  setDetailModalOpen(true);
                }}
                onBookClick={openBookingModal}
              />
            ))}
          </div>
        </section>

        {/* Sunnah Dates Calendar */}
        <section className="bg-emerald-950 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-amber-400">Upcoming Sunnah Hijama Dates</h2>
            <p className="text-center text-xs text-emerald-200 mt-1 mb-8">
              Cupping during the 17th, 19th, and 21st Hijri dates contains maximum therapeutic barakah.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sunnahDates.map((d, idx) => (
                <div key={idx} className="bg-emerald-900/60 border border-emerald-850 rounded-xl p-5 text-center">
                  <span className="text-xs font-bold text-amber-400 block">{d.hijri}</span>
                  <span className="text-lg font-black block mt-1">{d.date}</span>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-3 py-1 rounded-full inline-block mt-3">
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hijama Points Guide */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Point Indicator Mock */}
            <div className="lg:col-span-5 bg-slate-100 rounded-2xl p-6 border border-slate-200 text-center relative">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Click Point to View Details</h3>
              <div className="w-56 h-72 mx-auto bg-slate-200 rounded-full relative flex items-center justify-center border border-slate-350">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Human Upper Back</span>
                
                {/* Kahil Point */}
                <button
                  onClick={() => handlePointClick("kahil")}
                  className={`absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 transition-all ${
                    activePoint === "kahil" ? "bg-amber-400 border-emerald-800 scale-110" : "bg-emerald-700 border-white text-white"
                  }`}
                >
                  P1
                </button>

                {/* Akhdayain Point */}
                <button
                  onClick={() => handlePointClick("akhday")}
                  className={`absolute top-16 left-1/4 w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 transition-all ${
                    activePoint === "akhday" ? "bg-amber-400 border-emerald-800 scale-110" : "bg-emerald-700 border-white text-white"
                  }`}
                >
                  P2
                </button>

                {/* Katifain Point */}
                <button
                  onClick={() => handlePointClick("kativ")}
                  className={`absolute top-28 left-2/3 w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 transition-all ${
                    activePoint === "kativ" ? "bg-amber-400 border-emerald-800 scale-110" : "bg-emerald-700 border-white text-white"
                  }`}
                >
                  P3
                </button>
              </div>
            </div>

            {/* Point Description */}
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-emerald-850">Hijama Reflex Points Guide</h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">Interactive guide on primary prophetic cupping points</p>

              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h4 className="font-extrabold text-emerald-850 text-base">{pointsGuide[activePoint].name}</h4>
                <p className="text-xs text-amber-600 font-bold mt-1">Location: {pointsGuide[activePoint].location}</p>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed mt-3">
                  {pointsGuide[activePoint].description}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Before / After Guidelines */}
        <section className="bg-slate-100 py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-150">
              <h3 className="text-lg font-bold text-emerald-850 border-b border-slate-100 pb-3">Before Hijama Guidelines (হিজামার পূর্ব প্রস্তুতি)</h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">✔ Fast 3-4 hours prior to the session. Water is allowed.</li>
                <li className="flex items-start gap-2">✔ Avoid heavy workouts or physical labor on treatment day.</li>
                <li className="flex items-start gap-2">✔ Maintain proper hydration—drink at least 2 liters of water.</li>
                <li className="flex items-start gap-2">✔ Take a clean shower before attending the appointment.</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-150">
              <h3 className="text-lg font-bold text-emerald-850 border-b border-slate-100 pb-3">After Hijama Guidelines (হিজামা পরবর্তী যত্ন)</h3>
              <ul className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">✔ Avoid dairy, red meat, and seafood for 24 hours.</li>
                <li className="flex items-start gap-2">✔ Rest for at least 12 hours after the session.</li>
                <li className="flex items-start gap-2">✔ Avoid bathing or rubbing the scratches for 24 hours.</li>
                <li className="flex items-start gap-2">✔ Apply cold-pressed black seed oil over cupping scratches.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practitioner Directory with Gender Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-emerald-850">Certified Practitioners (থেরাপিস্ট তালিকা)</h2>
              <p className="text-xs text-slate-500 mt-1">We maintain complete male-to-male and female-to-female therapist policies.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setGenderFilter("all")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  genderFilter === "all" ? "bg-emerald-700 text-white" : "bg-white border border-slate-200 text-slate-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setGenderFilter("male")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  genderFilter === "male" ? "bg-emerald-700 text-white" : "bg-white border border-slate-200 text-slate-700"
                }`}
              >
                Male Experts
              </button>
              <button
                onClick={() => setGenderFilter("female")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                  genderFilter === "female" ? "bg-emerald-700 text-white" : "bg-white border border-slate-200 text-slate-700"
                }`}
              >
                Female Experts
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTherapists.map((t, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-100 p-5 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-850 flex items-center justify-center font-bold mx-auto mb-3">
                  {t.avatar}
                </div>
                <h4 className="font-bold text-sm text-slate-800">{t.name}</h4>
                <p className="text-[11px] text-emerald-700 font-semibold">{t.title}</p>
                <p className="text-[10px] text-slate-400 mt-2">{t.certs}</p>
                <span className="text-[9px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-3 inline-block font-bold">
                  {t.gender} Patient Specialist
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Training Programs Banner & Search Booking */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Training Programs */}
          <div className="lg:col-span-7 bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200">
            <h3 className="text-lg font-bold text-emerald-850">Echo Sunnah Cupping Academy</h3>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed mt-2">
              Interested in becoming a certified Hijama therapist? Join our 3-month comprehensive diploma covering clinical hygiene, blood anatomy, negative pressure dynamics, and Sunnah points. Includes hands-on clinical internships.
            </p>
            <button className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-lg">
              Explore Training Programs
            </button>
          </div>

          {/* Search Booking Status */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-150 shadow-sm">
            <h3 className="text-base font-bold text-slate-800">Check Booking Status (বুকিং স্ট্যাটাস চেক)</h3>
            <form onSubmit={handleBookingSearch} className="flex gap-2 mt-4">
              <input
                type="text"
                required
                placeholder="e.g. BK-8739"
                value={searchBookingId}
                onChange={(e) => setSearchBookingId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              />
              <button type="submit" className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 rounded-lg shrink-0">
                Inquire
              </button>
            </form>

            {searchResult && (
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs animate-fadeIn">
                {typeof searchResult === "string" ? (
                  <p className="text-rose-600 font-bold">{searchResult}</p>
                ) : (
                  <div className="space-y-1">
                    <p><strong>Service:</strong> {searchResult.serviceName}</p>
                    <p><strong>Scheduled:</strong> {searchResult.date} ({searchResult.timeSlot})</p>
                    <p><strong>Option:</strong> {searchResult.serviceOption}</p>
                    <p><strong>Payable:</strong> ৳{searchResult.totalPrice}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`font-bold uppercase ${
                        searchResult.status === "Upcoming" ? "text-emerald-700 animate-pulse" : "text-slate-500"
                      }`}>
                        {searchResult.status}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </section>

        {/* FAQs */}
        <section className="bg-white py-16 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-emerald-850 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800"
                  >
                    <span>{faq.q}</span>
                    <span className="text-emerald-700 font-black">{activeFaq === idx ? "−" : "+"}</span>
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 border-t border-slate-50 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* APPOINTMENT BOOKING MODAL */}
      {bookingModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8 relative text-slate-800">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-650"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="bg-emerald-100 text-emerald-800 p-4 rounded-full w-fit mx-auto mb-4 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-850">Booking Requested!</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Alhamdulillah, we have registered your Hijama appointment. You can track this booking status inside your Dashboard.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-emerald-700 font-extrabold text-[10px] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                    Confirm Hijama Appointment
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">{selectedPackage.title}</h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-xs text-slate-500">Cups Quantity: {selectedPackage.cups} cups</p>
                    <span className="text-sm font-black text-emerald-850 bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 rounded-lg">{selectedPackage.price}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg mb-4 text-[11px] text-slate-600 space-y-1">
                  <p><strong>Benefits:</strong> {selectedPackage.benefits}</p>
                  <p><strong>Clinical Note:</strong> {selectedPackage.whyTake}</p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">DATE</label>
                      <input
                        type="date"
                        required
                        name="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">TIME SLOT</label>
                      <select required name="slot" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                        <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                        <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                        <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">PATIENT NAME</label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="e.g. Arafat Hossain"
                      defaultValue="Arafat Hossain"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">SERVICE OPTION</label>
                    <select required name="serviceOption" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                      <option value="Center">Center Service (Default)</option>
                      <option value="Home">Home Service (+৳২,০০০ BDT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">HOME ADDRESS (FOR VISIT)</label>
                    <textarea
                      required
                      name="address"
                      rows={2}
                      defaultValue="House 12, Road 7, Sector 3, Uttara, Dhaka"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">LANDMARK / NOTE</label>
                    <input
                      type="text"
                      name="landmark"
                      placeholder="e.g. Near Sector 3 Mosque"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">PAYMENT OPTION</label>
                      <select required name="paymentOption" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-850 text-xs focus:outline-none focus:border-emerald-600">
                        <option value="Pay Now (Online)">Pay Now (Online)</option>
                        <option value="Pay in Center">Pay in Center (Later)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-end pt-3">
                      <button
                        type="submit"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold w-full py-2.5 rounded-lg shadow-md"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ITEM DETAIL MODAL */}
      {detailModalOpen && selectedDetailItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden relative text-slate-850 max-h-[90vh] flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setDetailModalOpen(false)}
              className="absolute top-4 right-4 text-white bg-slate-900/50 hover:bg-slate-900/80 backdrop-blur-sm rounded-full p-2 z-10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Header */}
            <div className="h-56 sm:h-64 w-full relative shrink-0">
              <img
                src={selectedDetailItem.image}
                alt={selectedDetailItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-[10px] bg-amber-400 text-emerald-950 font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedDetailItem.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2">
                  {selectedDetailItem.title}
                </h3>
                {selectedDetailItem.bengaliTitle && (
                  <p className="text-xs text-emerald-300 font-extrabold mt-0.5">{selectedDetailItem.bengaliTitle}</p>
                )}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Description</span>
                <p className="text-sm text-slate-650 leading-relaxed font-semibold">
                  {selectedDetailItem.desc}
                </p>
              </div>

              {selectedDetailItem.whyTake && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Why Choose This</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {selectedDetailItem.whyTake}
                  </p>
                </div>
              )}

              {selectedDetailItem.benefits && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Key Benefits</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                    {selectedDetailItem.benefits}
                  </p>
                </div>
              )}

              {/* Hijama Specific Features */}
              {selectedDetailItem.features && (
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">What's Included</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDetailItem.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-slate-655 font-bold">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-emerald-600">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold leading-none">Price</span>
                <span className="text-2xl font-black text-emerald-800">{selectedDetailItem.price}</span>
              </div>

              <button
                onClick={() => {
                  setDetailModalOpen(false);
                  openBookingModal(selectedDetailItem);
                }}
                className="bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-650 hover:to-teal-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md active:scale-[0.97] uppercase tracking-wider"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
