"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product.types";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock > 0;
  const { addProductToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addProductToCart(product);
  };

  return (
    <Link href={`/${product.id}`} style={{ display: "flex", flexDirection: "column", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s", textDecoration: "none" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "1", background: "#f9fafb", overflow: "hidden" }}>
        <Image
          src={product.imageUrl?.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"}
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {!isInStock && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280", background: "#fff", padding: "4px 10px", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        <div style={{ fontSize: "11px", fontWeight: 600, color: "#3c50e0", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Product
        </div>
        <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#111827", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.name}
        </h3>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= 4 ? "#f59e0b" : "#e5e7eb"} stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          ))}
        </div>

        {/* Price + button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "10px", borderTop: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
            ${product.price.toFixed(2)}
          </span>
          {isInStock && (
            <button
              onClick={handleAddToCart}
              style={{ padding: "6px 14px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#2f40c8")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#3c50e0")}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
