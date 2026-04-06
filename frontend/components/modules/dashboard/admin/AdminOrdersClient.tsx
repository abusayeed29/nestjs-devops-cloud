"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { OrderDetailModal } from "./OrderDetailModal";
import type { AdminOrderDetail } from "@/types/order.types";
import Link from "next/link";

const statusStyle: Record<string, { bg: string; color: string }> = {
  COMPLETED:  { bg: "#dcfce7", color: "#166534" },
  PROCESSING: { bg: "#dbeafe", color: "#1d4ed8" },
  PENDING:    { bg: "#fef9c3", color: "#854d0e" },
  CANCELLED:  { bg: "#fee2e2", color: "#991b1b" },
  SHIPPED:    { bg: "#ede9fe", color: "#6d28d9" },
  DELIVERED:  { bg: "#ccfbf1", color: "#0f766e" },
};

function StatusBadge({ status }: { status: string }) {
  const s = statusStyle[status] ?? { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{ padding: "3px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, background: s.bg, color: s.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>
      {status}
    </span>
  );
}

export function AdminOrdersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { getAllOrders, adminOrders, pagination, isLoading } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderDetail | null>(null);

  const loadOrders = useCallback(async (page: number) => { await getAllOrders(page, 10); }, [getAllOrders]);

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login"); return; }
    if (user?.role !== "ADMIN") { router.push("/user"); return; }
    loadOrders(currentPage);
  }, [isAuthenticated, user, currentPage, router, loadOrders]);

  if (!isAuthenticated || user?.role !== "ADMIN") return null;

  const statusFilter = searchParams.get("status");
  const filtered = statusFilter ? adminOrders.filter((o) => o.status === statusFilter) : adminOrders;
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div style={{ background: "#f9fafb", minHeight: "calc(100vh - 100px)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Manage Orders</h1>
            {statusFilter && (
              <p style={{ fontSize: "13px", color: "#9ca3af" }}>Filtered by: <strong style={{ color: "#3c50e0" }}>{statusFilter}</strong></p>
            )}
          </div>
          <Link href="/admin" style={{ padding: "9px 18px", background: "#fff", border: "1px solid #e5e7eb", color: "#374151", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
            ← Dashboard
          </Link>
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontSize: "14px" }}>Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "48px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>No orders found</p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.5fr 0.8fr 1fr 0.8fr 0.8fr", gap: "0", padding: "12px 20px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                {["Order ID", "Customer", "Items", "Total", "Status", "Date", "Action"].map((h) => (
                  <span key={h} style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                ))}
              </div>

              {filtered.map((order, idx) => (
                <div key={order.id}
                  style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 0.5fr 0.8fr 1fr 0.8fr 0.8fr", gap: "0", padding: "14px 20px", borderBottom: idx < filtered.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#3c50e0" }}>#{order.id.slice(0, 8)}</span>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>{order.userName}</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af" }}>{order.userEmail}</p>
                  </div>
                  <span style={{ fontSize: "13px", color: "#374151" }}>{order.items.length}</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>${order.total.toFixed(2)}</span>
                  <StatusBadge status={order.status} />
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    style={{ padding: "6px 14px", background: "#3c50e0", color: "#fff", borderRadius: "6px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                    Details
                  </button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "24px" }}>
                <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}
                  style={{ padding: "8px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.4 : 1, fontFamily: "inherit" }}>
                  ← Previous
                </button>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>{currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage >= totalPages}
                  style={{ padding: "8px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: currentPage >= totalPages ? "not-allowed" : "pointer", opacity: currentPage >= totalPages ? 0.4 : 1, fontFamily: "inherit" }}>
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={() => loadOrders(currentPage)}
        />
      )}
    </div>
  );
}
