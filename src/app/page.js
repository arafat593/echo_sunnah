import RootClient from "./RootClient";

export const metadata = {
  title: "Home | Echo Sunnah - Ruqyah & Hijama Center",
  description: "Reviving the Sunnah, Nurturing Wellness. Explore clinical Hijama wet cupping, authentic Quranic Ruqyah healing, and organic prophetical supplements.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Home | Echo Sunnah - Ruqyah & Hijama Center",
    description: "Reviving the Sunnah, Nurturing Wellness. Explore clinical Hijama wet cupping, authentic Quranic Ruqyah healing, and organic prophetical supplements.",
    url: 'https://echosunnah.com/',
    type: 'website',
  },
  twitter: {
    title: "Home | Echo Sunnah - Ruqyah & Hijama Center",
    description: "Reviving the Sunnah, Nurturing Wellness. Explore clinical Hijama wet cupping, authentic Quranic Ruqyah healing, and organic prophetical supplements.",
  }
};

export default function RootPage() {
  return <RootClient />;
}
