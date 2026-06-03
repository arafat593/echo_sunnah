import HomeClient from "./HomeClient";

export const metadata = {
  title: "Home | Echo Sunnah - Islamic Wellness & Theology Portal",
  description: "Reviving the Sunnah, Nurturing Wellness. Explore clinical Hijama wet cupping, authentic Quranic Ruqyah healing, and organic prophetical supplements.",
  alternates: {
    canonical: '/home',
  },
  openGraph: {
    title: "Home | Echo Sunnah - Islamic Wellness & Theology Portal",
    description: "Reviving the Sunnah, Nurturing Wellness. Explore clinical Hijama wet cupping, authentic Quranic Ruqyah healing, and organic prophetical supplements.",
    url: 'https://echosunnah.com/home',
    type: 'website',
  },
  twitter: {
    title: "Home | Echo Sunnah - Islamic Wellness & Theology Portal",
    description: "Reviving the Sunnah, Nurturing Wellness. Explore clinical Hijama wet cupping, authentic Quranic Ruqyah healing, and organic prophetical supplements.",
  }
};

export default function Page() {
  return <HomeClient />;
}
