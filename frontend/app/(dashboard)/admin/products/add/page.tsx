import { AdminAddProductClient } from "@/components/modules/dashboard/admin/AdminAddProductClient";
import { Header } from "@/components/modules/landing/Header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Product", description: "Add a new product" };

export default function AdminAddProductPage() {
  return (
    <>
      <Header />
      <AdminAddProductClient />
    </>
  );
}