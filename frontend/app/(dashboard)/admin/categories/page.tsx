import { AdminCategoriesClient } from "@/components/modules/dashboard/admin/AdminCategoriesClient";
import { Header } from "@/components/modules/landing/Header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Categories", description: "Manage store categories" };

export default function AdminCategoriesPage() {
  return (
    <>
      <Header />
      <AdminCategoriesClient />
    </>
  );
}