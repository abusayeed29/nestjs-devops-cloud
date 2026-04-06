"use client";

import { useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import type { AdminOrderDetail } from "@/types/order.types";

interface OrderDetailModalProps {
  order: AdminOrderDetail;
  onClose: () => void;
  onStatusUpdate: () => void;
}

const STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrderDetailModal({ order, onClose, onStatusUpdate }: OrderDetailModalProps) {
  const orderHook = useOrder();
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async () => {
    if (selectedStatus === order.status) return;
    setIsUpdating(true);
    const success = await orderHook.updateOrderStatus(order.id, selectedStatus);
    setIsUpdating(false);
    if (success) { onStatusUpdate(); onClose(); }
  };

  const section = (title: string, children: React.ReactNode) => (
    <div style={{ marginBottom: "24px" }}>
      <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>{title}</h3>
      {children}
    </div>
  );

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", borderRadius: "14px", width: "100%", maxWidth: "560px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Order Details</h2>
          <button onClick={onClose} style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", cursor: "pointer", fontSize: "18px", color: "#6b7280", fontFamily: "inherit" }}>×</button>
        </div>

        {/* Modal body */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>

          {section("Order Info",
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "Order ID", value: order.id.slice(0, 8).toUpperCase() },
                { label: "Date", value: new Date(order.createdAt).toLocaleString() },
                { label: "Total", value: `$${order.total.toFixed(2)}` },
                { label: "Status", value: order.status },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "#f9fafb", borderRadius: "8px", padding: "10px 14px" }}>
                  <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500, marginBottom: "2px" }}>{label}</p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{value}</p>
                </div>
              ))}
            </div>
          )}

          {section("Customer",
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "Name", value: order.userName },
                { label: "Email", value: order.userEmail },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "#f9fafb", borderRadius: "8px", padding: "10px 14px" }}>
                  <p style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 500, marginBottom: "2px" }}>{label}</p>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{value}</p>
                </div>
              ))}
            </div>
          )}

          {section("Shipping Address",
            <p style={{ fontSize: "13px", color: "#374151", background: "#f9fafb", padding: "12px 14px", borderRadius: "8px", lineHeight: 1.5 }}>
              {order.shippingAddress}
            </p>
          )}

          {section("Items",
            <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
              {order.items.map((item, i) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: i < order.items.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>{item.productName}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>Qty: {item.quantity} · ${item.price.toFixed(2)} each</p>
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>${item.subtotal.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}

          {section("Update Status",
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ flex: 1, padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", color: "#111827", outline: "none", fontFamily: "inherit", background: "#fff" }}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button
                onClick={handleStatusChange}
                disabled={isUpdating || selectedStatus === order.status}
                style={{ padding: "10px 20px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "13px", fontWeight: 600, border: "none", cursor: (isUpdating || selectedStatus === order.status) ? "not-allowed" : "pointer", opacity: (isUpdating || selectedStatus === order.status) ? 0.5 : 1, fontFamily: "inherit", whiteSpace: "nowrap" }}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
