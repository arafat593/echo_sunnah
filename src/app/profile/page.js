"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/context/AppContext";

import { allCountries } from "country-telephone-data";

const getEmojiFlag = (iso2) => {
  if (!iso2) return "";
  const codePoints = iso2
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const parsePhone = (fullPhone) => {
  if (!fullPhone) return { code: "+880", iso2: "bd", number: "" };
  
  const cleaned = fullPhone.trim().replace(/\s+/g, ' ');
  
  // Sort by dialCode length descending to match longer dial codes first (e.g. +1 242 before +1)
  const sortedCountries = [...allCountries].sort((a, b) => b.dialCode.length - a.dialCode.length);
  const matched = sortedCountries.find((c) => cleaned.startsWith(`+${c.dialCode}`));
  
  if (matched) {
    const number = cleaned.slice(matched.dialCode.length + 1).trim();
    return { code: `+${matched.dialCode}`, iso2: matched.iso2, number };
  }
  
  if (cleaned.startsWith("+")) {
    const match = cleaned.match(/^(\+\d+)/);
    if (match) {
      const code = match[1];
      const number = cleaned.slice(code.length).trim();
      return { code, iso2: "", number };
    }
  }
  
  if (cleaned.startsWith("01")) {
    return { code: "+880", iso2: "bd", number: cleaned.slice(1) };
  }
  
  return { code: "+880", iso2: "bd", number: cleaned };
};

function PhoneCodeSelect({ value, iso2, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) setSearch("");
      return next;
    });
  };

  const selectedCountry = allCountries.find(
    (c) => c.iso2 === iso2 || `+${c.dialCode}` === value
  ) || allCountries.find((c) => c.iso2 === "bd");

  const flag = getEmojiFlag(selectedCountry?.iso2);
  const displayCode = selectedCountry ? `+${selectedCountry.dialCode}` : value;

  const filteredCountries = allCountries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search)
  );

  return (
    <div className="relative shrink-0" ref={containerRef}>
      <div
        onClick={handleToggle}
        className={`bg-slate-50 border rounded-xl px-3 py-3 text-xs sm:text-sm text-slate-800 flex items-center gap-1.5 cursor-pointer select-none transition-all hover:border-emerald-300 min-w-[105px] justify-between h-[46px] ${
          isOpen ? "border-emerald-500 ring-1 ring-emerald-500/20 font-semibold" : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-1">
          <span className="text-base leading-none">{flag}</span>
          <span className="font-semibold">{displayCode}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
        >
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-1.5 animate-fadeIn w-[260px] max-h-[300px] flex flex-col">
          <div className="px-2.5 pb-2 border-b border-slate-50">
            <input
              type="text"
              placeholder="Search country or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="overflow-y-auto flex-grow max-h-[220px]">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.iso2 === iso2;
                return (
                  <div
                    key={`${c.iso2}-${c.dialCode}`}
                    onClick={() => {
                      onChange(`+${c.dialCode}`, c.iso2);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`px-3 py-2 text-xs sm:text-sm cursor-pointer hover:bg-emerald-50/70 hover:text-emerald-800 transition-colors flex items-center gap-2 ${
                      isSelected ? "bg-emerald-50 text-emerald-800 font-bold" : "text-slate-700"
                    }`}
                  >
                    <span className="text-base">{getEmojiFlag(c.iso2)}</span>
                    <span className="flex-grow truncate text-slate-800">{c.name}</span>
                    <span className="text-slate-400 text-[10px] font-mono">+{c.dialCode}</span>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-4 text-xs text-slate-400 text-center">
                No country found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({ field, form, user, editing, handleChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={field.type === "textarea" || field.name === "address" ? "sm:col-span-2" : ""} ref={containerRef}>
      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
        <span className="mr-1">{field.icon}</span>
        {field.label}
        {field.required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>

      {editing ? (
        field.type === "select" ? (
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 flex justify-between items-center cursor-pointer transition-all hover:border-emerald-300 ${isOpen ? "border-emerald-500 ring-1 ring-emerald-500/20 font-semibold" : ""} ${error ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 font-semibold" : "border-slate-200"}`}
            >
              <span className={form[field.name] ? "text-slate-800 font-semibold" : "text-slate-400 font-semibold"}>
                {form[field.name] || "— Select —"}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
            {isOpen && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-1 animate-fadeIn min-w-[160px]">
                {field.options.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      handleChange({ target: { name: field.name, value: opt } });
                      setIsOpen(false);
                    }}
                    className={`px-4 py-2.5 text-xs sm:text-sm cursor-pointer hover:bg-emerald-50/70 hover:text-emerald-800 transition-colors ${form[field.name] === opt ? "bg-emerald-50 text-emerald-800 font-bold" : "text-slate-700"}`}
                  >
                    {opt || "— Select —"}
                  </div>
                ))}
              </div>
            )}
            {error && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {error}
              </p>
            )}
          </div>
        ) : field.type === "textarea" ? (
          <div>
            <textarea
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              rows={2}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none transition-all resize-none ${error ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"}`}
            />
            {error && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {error}
              </p>
            )}
          </div>
        ) : field.name === "phone" ? (
          <div>
            <div className="flex gap-2">
              <PhoneCodeSelect
                value={form.phoneCode}
                iso2={form.phoneCountry}
                onChange={(code, iso) => {
                  handleChange({ target: { name: "phoneCode", value: code } });
                  handleChange({ target: { name: "phoneCountry", value: iso } });
                }}
              />
              <div className="flex-grow">
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  placeholder="1711223344"
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none transition-all ${error ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"}`}
                />
              </div>
            </div>
            {error && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {error}
              </p>
            )}
          </div>
        ) : (
          <div>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none transition-all ${error ? "border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20" : "border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"}`}
            />
            {error && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {error}
              </p>
            )}
          </div>
        )
      ) : (
        <p className={`text-sm font-semibold px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 ${!user[field.name] ? "text-slate-300 italic" : "text-slate-700"}`}>
          {user[field.name] || "—"}
        </p>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { user, updateUser, addNotification } = useApp();

  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(() => user.avatar || "");
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(() => {
    const { code, iso2, number } = parsePhone(user.phone);
    return {
      name: user.name || "",
      phone: number,
      phoneCode: code,
      phoneCountry: iso2,
      email: user.email || "",
      birthDate: user.birthDate || "",
      gender: user.gender || "",
      address: user.address || "",
      area: user.area || "",
      district: user.district || "",
      division: user.division || "",
      country: user.country || "Bangladesh",
    };
  });

  const [prevUser, setPrevUser] = useState(user);
  if (user !== prevUser) {
    setPrevUser(user);
    const { code, iso2, number } = parsePhone(user.phone);
    setForm({
      name: user.name || "",
      phone: number,
      phoneCode: code,
      phoneCountry: iso2,
      email: user.email || "",
      birthDate: user.birthDate || "",
      gender: user.gender || "",
      address: user.address || "",
      area: user.area || "",
      district: user.district || "",
      division: user.division || "",
      country: user.country || "Bangladesh",
    });
    setAvatarPreview(user.avatar || "");
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Name Validation
    if (!form.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    // Email Validation
    if (!form.email) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address (e.g., example@mail.com)";
    }

    // Phone Validation
    const cleanPhone = form.phone.replace(/[\s-]/g, '');
    if (!form.phone) {
      newErrors.phone = "Phone Number is required";
    } else {
      if (form.phoneCode === "+880") {
        const bdNumber = cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone;
        if (!/^1[3-9]\d{8}$/.test(bdNumber)) {
          newErrors.phone = "Please enter a valid BD phone number";
        }
      } else {
        if (!/^\d{6,14}$/.test(cleanPhone)) {
          newErrors.phone = "Please enter a valid phone number";
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addNotification("Please fix the validation errors.");
      return;
    }

    setErrors({});
    const finalPhone = `${form.phoneCode} ${form.phone.trim()}`;
    updateUser({ ...form, phone: finalPhone, avatar: avatarPreview });
    addNotification("Profile updated successfully!");
    setEditing(false);
  };

  const handleCancel = () => {
    const { code, iso2, number } = parsePhone(user.phone);
    setForm({
      name: user.name || "",
      phone: number,
      phoneCode: code,
      phoneCountry: iso2,
      email: user.email || "",
      birthDate: user.birthDate || "",
      gender: user.gender || "",
      address: user.address || "",
      area: user.area || "",
      district: user.district || "",
      division: user.division || "",
      country: user.country || "Bangladesh",
    });
    setAvatarPreview(user.avatar || "");
    setErrors({});
    setEditing(false);
  };

  const initials = (user.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const fields = [
    { label: "Full Name", name: "name", type: "text", icon: "👤", required: true },
    { label: "Phone Number", name: "phone", type: "tel", icon: "📞", required: true },
    { label: "Email Address", name: "email", type: "email", icon: "✉️", required: true },
    { label: "Date of Birth", name: "birthDate", type: "date", icon: "🎂" },
    { label: "Gender", name: "gender", type: "select", icon: "⚧️", options: ["", "Male", "Female", "Prefer not to say"] },
    { label: "Address", name: "address", type: "textarea", icon: "🏠" },
    { label: "Area", name: "area", type: "text", icon: "🏛️" },
    { label: "District", name: "district", type: "text", icon: "🗺️" },
    { label: "Division", name: "division", type: "text", icon: "📍" },
    { label: "Country", name: "country", type: "text", icon: "🌍" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Page Header Strip */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-black text-white">My Profile</h1>
            <p className="text-emerald-300 text-xs mt-1">Manage your personal information and account details</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <form
            onSubmit={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.tagName === "INPUT") {
                e.preventDefault();
              }
            }}
          >
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">

              {/* Avatar + Name section */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
                    {avatarPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-3xl font-black">{initials}</span>
                    )}
                  </div>
                  {editing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center shadow-md transition-colors border-2 border-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                      </svg>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                {/* Name + meta */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{user.name}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{user.email}</p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                      <span>📅</span> Member since {user.joinedDate}
                    </span>
                    {(user.area || user.district) && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        <span>📍</span> {[user.area, user.district].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Edit button */}
                <div className="shrink-0 flex gap-2">
                  {!editing && (
                    <button
                      type="button"
                      onClick={() => {
                        setErrors({});
                        setEditing(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                      </svg>
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Fields Grid */}
              <div className="px-6 sm:px-8 py-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {fields.map((field) => (
                    <FormField
                      key={field.name}
                      field={field}
                      form={form}
                      user={user}
                      editing={editing}
                      handleChange={handleChange}
                      error={errors[field.name]}
                    />
                  ))}
                </div>

                {editing && (
                  <div className="mt-6 flex gap-3 justify-end pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-5 py-2.5 text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-md transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}















