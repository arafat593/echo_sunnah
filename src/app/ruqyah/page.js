import RuqyahClient from "./RuqyahClient";

export const metadata = {
  title: "Ruqyah Shariah (রুকইয়াহ) | Echo Sunnah",
  description: "Authentic Quranic healing and spiritual protection from Sihr (black magic), Ayn (evil eye), Jinn afflictions, and psychological distress under verified Raqis.",
  alternates: {
    canonical: '/ruqyah',
  },
  openGraph: {
    title: "Ruqyah Shariah (রুকইয়াহ) | Echo Sunnah",
    description: "Authentic Quranic healing and spiritual protection from Sihr (black magic), Ayn (evil eye), Jinn afflictions, and psychological distress under verified Raqis.",
    url: 'https://echosunnah.com/ruqyah',
    type: 'website',
  },
  twitter: {
    title: "Ruqyah Shariah (রুকইয়াহ) | Echo Sunnah",
    description: "Authentic Quranic healing and spiritual protection from Sihr (black magic), Ayn (evil eye), Jinn afflictions, and psychological distress under verified Raqis.",
  }
};

export default function Page() {
  return <RuqyahClient />;
}
