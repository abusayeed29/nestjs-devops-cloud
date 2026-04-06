"use client";

import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "../landing/ProductCard";

interface SimilarProductsProps {
  category: string;
  currentProductId: string;
}

export function SimilarProducts({ category, currentProductId }: SimilarProductsProps) {
  const { products, isLoading, getProducts } = useProducts();

  useEffect(() => {
    if (category) getProducts({ category, limit: 8 });
  }, [category, getProducts]);

  const similar = products.filter((p) => p.id !== currentProductId).slice(0, 4);

  if (isLoading) {
    return (
      <div style={{ background: "#f3f4f6", padding: "48px 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ height: "24px", width: "160px", background: "#e5e7eb", borderRadius: "6px", marginBottom: "24px" }} />
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ aspectRatio: "1", background: "#f3f4f6" }} />
                <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ height: "10px", background: "#f3f4f6", borderRadius: "4px", width: "40%" }} />
                  <div style={{ height: "14px", background: "#f3f4f6", borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (similar.length === 0) return null;

  return (
    <div style={{ background: "#f3f4f6", padding: "48px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Similar Products</h2>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>You might also like these</p>
        </div>
        <div className="product-grid">
          {similar.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
