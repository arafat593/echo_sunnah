import ShopClient from "./ShopClient";

export const metadata = {
  title: "Prophetic Foods & Herbs Shop (শপ) | Echo Sunnah",
  description: "Shop premium cold-pressed Black Seed Oil, raw Sidr Honey, organic Extra Virgin Olive Oil, Ajwa Dates, and natural Islamic remedies.",
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: "Prophetic Foods & Herbs Shop (শপ) | Echo Sunnah",
    description: "Shop premium cold-pressed Black Seed Oil, raw Sidr Honey, organic Extra Virgin Olive Oil, Ajwa Dates, and natural Islamic remedies.",
    url: 'https://echosunnah.com/shop',
    type: 'website',
  },
  twitter: {
    title: "Prophetic Foods & Herbs Shop (শপ) | Echo Sunnah",
    description: "Shop premium cold-pressed Black Seed Oil, raw Sidr Honey, organic Extra Virgin Olive Oil, Ajwa Dates, and natural Islamic remedies.",
  }
};

export default function Page() {
  return <ShopClient />;
}
