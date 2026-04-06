"use client";

import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CartItem } from "./CartItem";
import Link from "next/link";

export function CartClient() {
  const { items, totalPrice, clearAllCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!isAuthenticated) router.push("/auth/login?redirect=/cart");
    else router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "60vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ textAlign: "center" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "20px" }}>
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Your cart is empty</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>Add some products to get started</p>
          <Link href="/" style={{ padding: "12px 28px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f9fafb", minHeight: "60vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>Shopping Cart</h1>
          <button
            onClick={() => window.confirm("Clear entire cart?") && clearAllCart()}
            style={{ padding: "8px 16px", background: "transparent", color: "#dc2626", border: "1px solid #fecaca", borderRadius: "8px", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "start" }}>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px", position: "sticky", top: "90px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "20px" }}>Order Summary</h2>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280", marginBottom: "10px" }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: "#111827" }}>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 500, color: "#111827" }}>Calculated at checkout</span>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "16px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "20px" }}>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              style={{ width: "100%", padding: "13px", background: "#1c2434", color: "#fff", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", marginBottom: "12px", fontFamily: "inherit" }}
            >
              Proceed to Checkout
            </button>

            <Link href="/" style={{ display: "block", textAlign: "center", fontSize: "13px", color: "#6b7280", textDecoration: "underline" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
