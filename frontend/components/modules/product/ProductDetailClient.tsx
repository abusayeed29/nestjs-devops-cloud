"use client";

import { useProducts } from "@/hooks/useProducts";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProductDetail } from "./ProductDetail";
import { SimilarProducts } from "./SimilarProducts";
import { useEffect } from "react";

interface ProductDetailClientProps {
  productId: string;
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { product, getProduct, isLoading, error } = useProducts();

  useEffect(() => {
    if (productId) getProduct(productId);
  }, [productId, getProduct]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "60vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <svg style={{ animation: "spin 1s linear infinite" }} width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="#3c50e0" strokeWidth="4"/>
            <path style={{ opacity: 0.75 }} fill="#3c50e0" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>Loading product...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ minHeight: "60vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Product Not Found</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
            The product you are looking for does not exist or has been removed.
          </p>
          <a href="/" style={{ padding: "10px 24px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            Back to Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs productName={product.name} />
      <ProductDetail product={product} />
      <SimilarProducts category={product.categoryId} currentProductId={product.id} />
    </>
  );
}
