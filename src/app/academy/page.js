import AcademyClient from "./AcademyClient";

export const metadata = {
  title: "Islamic Wellness Training Academy (একাডেমি) | Echo Sunnah",
  description: "Certified online and physical courses in Quran Tajweed masterclasses, Tibb An-Nabawi (Prophetic Medicine basics), and Fiqh Essentials.",
  alternates: {
    canonical: '/academy',
  },
  openGraph: {
    title: "Islamic Wellness Training Academy (একাডেমি) | Echo Sunnah",
    description: "Certified online and physical courses in Quran Tajweed masterclasses, Tibb An-Nabawi (Prophetic Medicine basics), and Fiqh Essentials.",
    url: 'https://echosunnah.com/academy',
    type: 'website',
  },
  twitter: {
    title: "Islamic Wellness Training Academy (একাডেমি) | Echo Sunnah",
    description: "Certified online and physical courses in Quran Tajweed masterclasses, Tibb An-Nabawi (Prophetic Medicine basics), and Fiqh Essentials.",
  }
};

export default function Page() {
  return <AcademyClient />;
}
