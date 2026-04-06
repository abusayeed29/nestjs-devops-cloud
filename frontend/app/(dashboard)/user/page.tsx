import { DashboardClient } from "@/components/modules/dashboard/DashboardClient";
import { Header } from "@/components/modules/landing/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "Manage your orders and account",
};

export default function DashboardPage() {
  return (
    <>
      <Header /> <DashboardClient />
    </>
  );
}
