"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCategory } from "@/hooks/useCategory";
import { AdminAddCategoryClient } from "./AdminAddCategoryClient";

export function AdminAddCategoryClientWithId({ id }: { id: string }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { getCategoryById, category, isLoading } = useCategory();

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login"); return; }
    if (user?.role !== "ADMIN") { router.push("/user"); return; }
    getCategoryById(id);
  }, [isAuthenticated, user, id]);

  if (!isAuthenticated || user?.role !== "ADMIN") return null;

  if (isLoading) {
    return (
      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "16px", color: "#64748b" }}>Loading category...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "16px", color: "#b91c1c" }}>Category not found</div>
      </div>
    );
  }

  return <AdminAddCategoryClient editCategory={category} />;
}