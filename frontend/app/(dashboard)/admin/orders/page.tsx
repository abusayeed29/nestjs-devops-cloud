import { AdminOrdersClient } from "@/components/modules/dashboard/admin/AdminOrdersClient";
import { Header } from "@/components/modules/landing/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Orders",
  description: "View and manage all customer orders",
};

export default function AdminOrdersPage() {
  return (
    <>
      <Header />
      <AdminOrdersClient />;
    </>
  );
}
