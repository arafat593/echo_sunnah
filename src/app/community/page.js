import CommunityClient from "./CommunityClient";

export const metadata = {
  title: "Echo Sunnah Community Forum & Raqi Q&A (কমিউনিটি ফোরাম) | Echo Sunnah",
  description: "Discuss clinical Hijama cupping, ask verified Raqis questions regarding Quranic Ruqyah Shariah protection, and volunteer for local charity campaigns.",
  alternates: {
    canonical: '/community',
  },
  openGraph: {
    title: "Echo Sunnah Community Forum & Raqi Q&A (কমিউনিটি ফোরাম) | Echo Sunnah",
    description: "Discuss clinical Hijama cupping, ask verified Raqis questions regarding Quranic Ruqyah Shariah protection, and volunteer for local charity campaigns.",
    url: 'https://echosunnah.com/community',
    type: 'website',
  },
  twitter: {
    title: "Echo Sunnah Community Forum & Raqi Q&A (কমিউনিটি ফোরাম) | Echo Sunnah",
    description: "Discuss clinical Hijama cupping, ask verified Raqis questions regarding Quranic Ruqyah Shariah protection, and volunteer for local charity campaigns.",
  }
};

export default function Page() {
  return <CommunityClient />;
}
