import JobsClient from "./JobsClient";

export const metadata = {
  title: "Careers in Prophetic Wellness & Hijama (ক্যারিয়ার) | Echo Sunnah",
  description: "Explore active job openings for Female Hijama Therapists, Senior Quranic Raqis, and Center Coordinators at our Dhaka centers.",
  alternates: {
    canonical: '/jobs',
  },
  openGraph: {
    title: "Careers in Prophetic Wellness & Hijama (ক্যারিয়ার) | Echo Sunnah",
    description: "Explore active job openings for Female Hijama Therapists, Senior Quranic Raqis, and Center Coordinators at our Dhaka centers.",
    url: 'https://echosunnah.com/jobs',
    type: 'website',
  },
  twitter: {
    title: "Careers in Prophetic Wellness & Hijama (ক্যারিয়ার) | Echo Sunnah",
    description: "Explore active job openings for Female Hijama Therapists, Senior Quranic Raqis, and Center Coordinators at our Dhaka centers.",
  }
};

export default function Page() {
  return <JobsClient />;
}
