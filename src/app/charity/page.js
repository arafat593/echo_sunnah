import CharityClient from "./CharityClient";

export const metadata = {
  title: "Sadaqah Jariyah & Zakat Calculator (যাকাত ও সাদাকাহ) | Echo Sunnah",
  description: "Deploy Zakat and Sadaqah to clean water hand-pump installs, orphan child sponsorship, and emergency food packs. Calculate exact Zakat obligations at 2.5%.",
  alternates: {
    canonical: '/charity',
  },
  openGraph: {
    title: "Sadaqah Jariyah & Zakat Calculator (যাকাত ও সাদাকাহ) | Echo Sunnah",
    description: "Deploy Zakat and Sadaqah to clean water hand-pump installs, orphan child sponsorship, and emergency food packs. Calculate exact Zakat obligations at 2.5%.",
    url: 'https://echosunnah.com/charity',
    type: 'website',
  },
  twitter: {
    title: "Sadaqah Jariyah & Zakat Calculator (যাকাত ও সাদাকাহ) | Echo Sunnah",
    description: "Deploy Zakat and Sadaqah to clean water hand-pump installs, orphan child sponsorship, and emergency food packs. Calculate exact Zakat obligations at 2.5%.",
  }
};

export default function Page() {
  return <CharityClient />;
}
