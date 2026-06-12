import BlogClient from "./BlogClient";

export const metadata = {
  title: "Islamic Health Articles & Prophetic Insights Blog | Echo Sunnah",
  description: "Read authentic research and theological articles on Hijama wet cupping, Quranic Ruqyah Shariah protection, Islamic medicine, and prophetic diets.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "Islamic Health Articles & Prophetic Insights Blog | Echo Sunnah",
    description: "Read authentic research and theological articles on Hijama wet cupping, Quranic Ruqyah Shariah protection, Islamic medicine, and prophetic diets.",
    url: 'https://echosunnah.com/blog',
    type: 'website',
  },
  twitter: {
    title: "Islamic Health Articles & Prophetic Insights Blog | Echo Sunnah",
    description: "Read authentic research and theological articles on Hijama wet cupping, Quranic Ruqyah Shariah protection, Islamic medicine, and prophetic diets.",
  }
};

export default function BlogPage() {
  return <BlogClient />;
}
