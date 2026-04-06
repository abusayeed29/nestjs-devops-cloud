"use client";

import type React from "react";
import { useState, useCallback, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  categoryId?: string | null;
}

export function ProductList({ categoryId }: ProductListProps = {}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 12;

  const { products, meta, isLoading, getProducts, error } = useProducts();

  // Reset to page 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [categoryId]);

  useEffect(() => {
    getProducts({ page, limit, search: debouncedSearch, category: categoryId ?? undefined });
  }, [page, limit, debouncedSearch, categoryId, getProducts]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
    setTimeout(() => setDebouncedSearch(value), 500);
  }, []);

  if (error) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ textAlign: "center", padding: "48px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", color: "#dc2626", fontSize: "14px" }}>
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f9fafb", minHeight: "60vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginBottom: "4px" }}>
              {categoryId ? "Category Products" : "New Arrivals"}
            </h2>
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>
              {categoryId ? `Showing ${meta.total} product${meta.total !== 1 ? "s" : ""}` : "Discover our latest products"}
            </p>
          </div>

          {/* Search */}
          <div style={{ position: "relative", width: "280px" }}>
            <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              style={{ width: "100%", paddingLeft: "36px", paddingRight: "16px", paddingTop: "10px", paddingBottom: "10px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", color: "#111827", outline: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "#3c50e0")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
          </div>
        </div>

        {/* Product grid */}
        {isLoading ? (
          <div className="product-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ aspectRatio: "1", background: "#f3f4f6" }} />
                <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ height: "10px", background: "#f3f4f6", borderRadius: "4px", width: "40%" }} />
                  <div style={{ height: "14px", background: "#f3f4f6", borderRadius: "4px", width: "80%" }} />
                  <div style={{ height: "10px", background: "#f3f4f6", borderRadius: "4px", width: "50%" }} />
                  <div style={{ height: "28px", background: "#f3f4f6", borderRadius: "6px", marginTop: "8px" }} />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", color: "#9ca3af", fontSize: "14px" }}>
            {debouncedSearch ? `No products found for "${debouncedSearch}"` : "No products available"}
          </div>
        ) : (
          <>
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "40px" }}>
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  style={{ padding: "8px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1 }}
                >
                  ← Previous
                </button>
                <span style={{ padding: "8px 16px", fontSize: "13px", color: "#6b7280" }}>
                  {page} / {meta.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, meta.totalPages))}
                  disabled={page >= meta.totalPages}
                  style={{ padding: "8px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: page >= meta.totalPages ? "not-allowed" : "pointer", opacity: page >= meta.totalPages ? 0.4 : 1 }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Newsletter */}
      <div style={{ background: "#3c50e0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Subscribe to our Newsletter</h3>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>Get the latest deals delivered to your inbox.</p>
          </div>
          <form style={{ display: "flex", gap: "8px" }} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ width: "240px", padding: "10px 16px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px", color: "#fff", fontSize: "13px", outline: "none" }}
            />
            <button
              type="submit"
              style={{ padding: "10px 20px", background: "#fff", color: "#3c50e0", borderRadius: "8px", fontSize: "13px", fontWeight: 700, border: "none", cursor: "pointer" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
