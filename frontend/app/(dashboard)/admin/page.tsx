import { AdminDashboardClient } from "@/components/modules/dashboard/admin/AdminDashboardClient";
import { Header } from "@/components/modules/landing/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage orders and users",
};

export default function AdminDashboardPage() {
  return (
    <>
      <Header />
      <AdminDashboardClient />
    </>
  );
}
