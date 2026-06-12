import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "Profile | Echo Sunnah",
  description: "Manage your personal profile, contact information, and shipping address details.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function Page() {
  return <ProfileClient />;
}
