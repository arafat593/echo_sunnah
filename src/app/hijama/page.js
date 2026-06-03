import HijamaClient from "./HijamaClient";

export const metadata = {
  title: "Clinical Hijama Cupping (হিজামা) | Echo Sunnah",
  description: "Experience clean, sterile clinical wet cupping (Hijama) therapies. Relieve chronic back pain, release metabolic waste, and optimize health according to prophetic dates.",
  alternates: {
    canonical: '/hijama',
  },
  openGraph: {
    title: "Clinical Hijama Cupping (হিজামা) | Echo Sunnah",
    description: "Experience clean, sterile clinical wet cupping (Hijama) therapies. Relieve chronic back pain, release metabolic waste, and optimize health according to prophetic dates.",
    url: 'https://echosunnah.com/hijama',
    type: 'website',
  },
  twitter: {
    title: "Clinical Hijama Cupping (হিজামা) | Echo Sunnah",
    description: "Experience clean, sterile clinical wet cupping (Hijama) therapies. Relieve chronic back pain, release metabolic waste, and optimize health according to prophetic dates.",
  }
};

export default function Page() {
  return <HijamaClient />;
}
