import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Dashboard | Echo Sunnah",
  description: "User dashboard to manage appointments, shop orders, enrollments, and donations.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function Page() {
  return <DashboardClient />;
}
