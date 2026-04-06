"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { AdminAddProductClient } from "./AdminAddProductClient";

export function AdminAddProductClientWithId({ id }: { id: string }) {
  const { getProduct, product, isLoading } = useProducts();

  useEffect(() => { getProduct(id); }, [id]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px", color: "#94a3b8", fontSize: "14px" }}>
        Loading product…
      </div>
    );
  }

  return <AdminAddProductClient editProduct={product ?? undefined} />;
}