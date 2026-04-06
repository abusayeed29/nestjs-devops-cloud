import { Header } from "@/components/modules/landing/Header";
import { AdminAddProductClientWithId } from "@/components/modules/dashboard/admin/AdminAddProductClientWithId";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Product" };

export default async function AdminEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <Header />
      <AdminAddProductClientWithId id={id} />
    </>
  );
}