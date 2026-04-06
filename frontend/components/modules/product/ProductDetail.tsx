"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product.types";
import { useCart } from "@/hooks/useCart";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addProductToCart } = useCart();
  const isInStock = product.stock > 0;

  const handleAddToCart = () => {
    if (!isInStock) return;
    addProductToCart({ ...product, quantity });
    setQuantity(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const qtyBtn = (action: "dec" | "inc") => ({
    width: "36px",
    height: "36px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "#fff",
    fontSize: "18px",
    fontWeight: 600,
    color: "#374151",
    cursor: (action === "dec" ? quantity <= 1 : quantity >= product.stock) ? "not-allowed" : "pointer",
    opacity: (action === "dec" ? quantity <= 1 : quantity >= product.stock) ? 0.4 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
  } as React.CSSProperties);

  return (
    <section style={{ background: "#f9fafb" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

          {/* Left — Image */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", overflow: "hidden", aspectRatio: "1" }}>
            <Image
              src={product.imageUrl?.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"}
              alt={product.name}
              width={600}
              height={600}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Right — Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Category */}
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#3c50e0", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Product
            </span>

            {/* Name */}
            <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111827", lineHeight: 1.3, margin: 0 }}>
              {product.name}
            </h1>

            {/* Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= 4 ? "#f59e0b" : "#e5e7eb"} stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
              <span style={{ fontSize: "13px", color: "#6b7280", marginLeft: "6px" }}>(4.0) · 128 reviews</span>
            </div>

            {/* Price */}
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#111827" }}>
              ${product.price.toFixed(2)}
            </div>

            {/* Stock */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 500, color: isInStock ? "#16a34a" : "#dc2626" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: isInStock ? "#16a34a" : "#dc2626" }} />
              {isInStock ? `${product.stock} items in stock` : "Out of stock"}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e5e7eb" }} />

            {/* Description */}
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
              {product.description}
            </p>

            <hr style={{ border: "none", borderTop: "1px solid #e5e7eb" }} />

            {/* Quantity */}
            {isInStock && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Quantity</label>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button onClick={() => quantity > 1 && setQuantity(q => q - 1)} style={qtyBtn("dec")}>−</button>
                  <span style={{ minWidth: "32px", textAlign: "center", fontSize: "16px", fontWeight: 600, color: "#111827" }}>
                    {quantity}
                  </span>
                  <button onClick={() => quantity < product.stock && setQuantity(q => q + 1)} style={qtyBtn("inc")}>+</button>
                </div>
              </div>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              style={{
                width: "100%",
                padding: "14px",
                background: added ? "#16a34a" : "#3c50e0",
                color: "#fff",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: 600,
                border: "none",
                cursor: isInStock ? "pointer" : "not-allowed",
                opacity: isInStock ? 1 : 0.5,
                transition: "background 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: "inherit",
              }}
            >
              {added ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  {isInStock ? "Add to Cart" : "Out of Stock"}
                </>
              )}
            </button>

            {/* Meta */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>SKU: {product.sku}</p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["Free Shipping over $80", "30-Day Returns", "Secure Checkout"].map((tag) => (
                  <span key={tag} style={{ fontSize: "11px", padding: "3px 10px", background: "#f3f4f6", color: "#6b7280", borderRadius: "99px", border: "1px solid #e5e7eb" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
