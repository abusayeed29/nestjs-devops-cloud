import { AdminProductsClient } from "@/components/modules/dashboard/admin/AdminProductsClient";
import { Header } from "@/components/modules/landing/Header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "All Products", description: "Manage store products" };

export default function AdminProductsPage() {
  return (
    <>
      <Header />
      <AdminProductsClient />
    </>
  );
}