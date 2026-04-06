import { AdminAddCategoryClient } from "@/components/modules/dashboard/admin/AdminAddCategoryClient";
import { Header } from "@/components/modules/landing/Header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Category", description: "Add a new category" };

export default function AdminAddCategoryPage() {
  return (
    <>
      <Header />
      <AdminAddCategoryClient />
    </>
  );
}