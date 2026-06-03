import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://echosunnah.com'),
  title: {
    default: "Echo Sunnah - Islamic Wellness & Theology Portal",
    template: "%s | Echo Sunnah"
  },
  description: "Reviving the Sunnah, Nurturing Wellness. Hijama cupping therapy, Ruqyah Shariah healing, organic prophetic supplements, and certified training courses.",
  keywords: [
    "Hijama", "Cupping Therapy", "Ruqyah Shariah", "Islamic Wellness", "Prophetic Medicine", 
    "Tibb An-Nabawi", "Sunnah", "Black Seed Oil", "Sidr Honey", "Quran Healing", "Dhaka Cupping"
  ],
  authors: [{ name: "Echo Sunnah Team", url: "https://echosunnah.com" }],
  creator: "Echo Sunnah",
  publisher: "Echo Sunnah",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Echo Sunnah - Islamic Wellness & Theology Portal",
    description: "Reviving the Sunnah, Nurturing Wellness. Hijama cupping therapy, Ruqyah Shariah healing, organic prophetic supplements, and certified training courses.",
    url: 'https://echosunnah.com',
    siteName: 'Echo Sunnah',
    images: [
      {
        url: '/echo_sunnah_logo.png',
        width: 1200,
        height: 630,
        alt: 'Echo Sunnah - Reviving Prophetic Wellness',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Echo Sunnah - Islamic Wellness & Theology Portal",
    description: "Reviving the Sunnah, Nurturing Wellness. Hijama cupping therapy, Ruqyah Shariah healing, organic prophetic supplements, and certified training courses.",
    images: ['/echo_sunnah_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
