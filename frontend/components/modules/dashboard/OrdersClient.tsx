"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { OrderItemDetail } from "@/types/order.types";

const statusColors: Record<string, { bg: string; color: string }> = {
  COMPLETED:  { bg: "#dcfce7", color: "#166534" },
  PROCESSING: { bg: "#dbeafe", color: "#1d4ed8" },
  PENDING:    { bg: "#fef9c3", color: "#854d0e" },
  CANCELLED:  { bg: "#fee2e2", color: "#991b1b" },
  SHIPPED:    { bg: "#ede9fe", color: "#6d28d9" },
  DELIVERED:  { bg: "#ccfbf1", color: "#0f766e" },
};

function StatusBadge({ status }: { status: string }) {
  const c = statusColors[status.toUpperCase()] ?? { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, background: c.bg, color: c.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>
      {status}
    </span>
  );
}

export function OrdersClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { orders, pagination, getUserOrders, isLoading } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/auth/login?redirect=/user/orders");
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) getUserOrders(currentPage, 10);
  }, [isAuthenticated, currentPage]);

  if (authLoading || !isAuthenticated) return null;

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div style={{ background: "#f9fafb", minHeight: "calc(100vh - 100px)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>My Orders</h1>
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>Track and manage your orders</p>
          </div>
          <Link href="/user" style={{ padding: "9px 18px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
            ← Dashboard
          </Link>
        </div>

        {isLoading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px", height: "100px" }} className="animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "64px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📦</div>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#111827", marginBottom: "6px" }}>No orders yet</p>
            <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "20px" }}>Start shopping to see your orders here</p>
            <Link href="/" style={{ padding: "10px 24px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {orders.map((order) => (
                <div key={order.id} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  {/* Order header */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", marginBottom: "2px" }}>
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p style={{ fontSize: "12px", color: "#9ca3af" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  {/* Items */}
                  <div style={{ padding: "0 20px" }}>
                    {order.items.map((item: OrderItemDetail) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f9fafb" }}>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", marginBottom: "2px" }}>{item.productName}</p>
                          <p style={{ fontSize: "12px", color: "#9ca3af" }}>Qty: {item.quantity}</p>
                        </div>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>${item.subtotal.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "#fafafa", borderTop: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#6b7280" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {order.shippingAddress}
                    </div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>Total: ${order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "32px" }}>
                <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}
                  style={{ padding: "8px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.4 : 1, fontFamily: "inherit" }}>
                  ← Previous
                </button>
                <span style={{ fontSize: "13px", color: "#6b7280", padding: "0 8px" }}>{currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage >= totalPages}
                  style={{ padding: "8px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: currentPage >= totalPages ? "not-allowed" : "pointer", opacity: currentPage >= totalPages ? 0.4 : 1, fontFamily: "inherit" }}>
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
