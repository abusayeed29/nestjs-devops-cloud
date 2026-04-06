import { Header } from "@/components/modules/landing/Header";
import { AdminAddCategoryClientWithId } from "@/components/modules/dashboard/admin/AdminAddCategoryClientWithId";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Category" };

export default async function AdminEditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <Header />
      <AdminAddCategoryClientWithId id={id} />
    </>
  );
}