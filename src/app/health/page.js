import HealthClient from "./HealthClient";

export const metadata = {
  title: "Prophetic Health Guidelines & Lifestyle Science (সুন্নাহ স্বাস্থ্য) | Echo Sunnah",
  description: "Discover prophetic lifestyle protocols, sleeping rules, portion metrics (1/3rd Capacity), voluntary fasting benefits, and interactive BMI/Water calculators.",
  alternates: {
    canonical: '/health',
  },
  openGraph: {
    title: "Prophetic Health Guidelines & Lifestyle Science (সুন্নাহ স্বাস্থ্য) | Echo Sunnah",
    description: "Discover prophetic lifestyle protocols, sleeping rules, portion metrics (1/3rd Capacity), voluntary fasting benefits, and interactive BMI/Water calculators.",
    url: 'https://echosunnah.com/health',
    type: 'website',
  },
  twitter: {
    title: "Prophetic Health Guidelines & Lifestyle Science (সুন্নাহ স্বাস্থ্য) | Echo Sunnah",
    description: "Discover prophetic lifestyle protocols, sleeping rules, portion metrics (1/3rd Capacity), voluntary fasting benefits, and interactive BMI/Water calculators.",
  }
};

export default function Page() {
  return <HealthClient />;
}
