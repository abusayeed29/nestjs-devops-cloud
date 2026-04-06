"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import type { CartItem as CartItemType } from "@/types/cart.types";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;
  const { incrementProductQuantity, decrementProductQuantity, removeProductFromCart } = useCart();

  const handleIncrement = async () => {
    if (quantity < product.stock) await incrementProductQuantity(product.id);
  };

  const handleDecrement = async () => {
    await decrementProductQuantity(product.id);
  };

  const handleRemove = async () => {
    await removeProductFromCart(product.id);
  };

  return (
    <div style={{ display: "flex", gap: "16px", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px", alignItems: "center" }}>
      {/* Image */}
      <Link href={`/${product.id}`} style={{ flexShrink: 0 }}>
        <div style={{ width: "88px", height: "88px", borderRadius: "10px", overflow: "hidden", background: "#f9fafb", border: "1px solid #e5e7eb" }}>
          <Image
            src={product.imageUrl?.trim() || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"}
            alt={product.name}
            width={88}
            height={88}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Link>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link href={`/${product.id}`} style={{ fontSize: "14px", fontWeight: 600, color: "#111827", display: "block", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {product.name}
        </Link>
        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "10px" }}>Unit: ${product.price.toFixed(2)}</p>

        {/* Qty controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            style={{ width: "30px", height: "30px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", fontSize: "16px", fontWeight: 600, cursor: quantity <= 1 ? "not-allowed" : "pointer", opacity: quantity <= 1 ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}
          >−</button>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827", minWidth: "24px", textAlign: "center" }}>{quantity}</span>
          <button
            onClick={handleIncrement}
            disabled={quantity >= product.stock}
            style={{ width: "30px", height: "30px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#fff", fontSize: "16px", fontWeight: 600, cursor: quantity >= product.stock ? "not-allowed" : "pointer", opacity: quantity >= product.stock ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}
          >+</button>
        </div>
      </div>

      {/* Price + Remove */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", flexShrink: 0 }}>
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>
          ${(product.price * quantity).toFixed(2)}
        </span>
        <button
          onClick={handleRemove}
          style={{ width: "32px", height: "32px", border: "1px solid #fecaca", borderRadius: "8px", background: "#fef2f2", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          aria-label="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
