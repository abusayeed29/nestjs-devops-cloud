"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import Link from "next/link";

export function AdminDashboardClient() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { getAllOrders, isLoading } = useOrder();
  const [stats, setStats] = useState({ total: 0, pending: 0, processing: 0, shipped: 0, delivered: 0 });

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login"); return; }
    if (user?.role !== "ADMIN") { router.push("/user"); return; }
    getAllOrders(1, 100).then((res) => {
      if (!res) return;
      setStats({
        total: res.total,
        pending:    res.data.filter((o) => o.status === "PENDING").length,
        processing: res.data.filter((o) => o.status === "PROCESSING").length,
        shipped:    res.data.filter((o) => o.status === "SHIPPED").length,
        delivered:  res.data.filter((o) => o.status === "DELIVERED").length,
      });
    });
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== "ADMIN") return null;

  const cards = [
    { label: "Total Orders",      value: stats.total,      href: "/admin/orders",                    color: "#3c50e0", icon: "📦" },
    { label: "Pending",           value: stats.pending,    href: "/admin/orders?status=PENDING",     color: "#f59e0b", icon: "⏳" },
    { label: "Processing",        value: stats.processing, href: "/admin/orders?status=PROCESSING",  color: "#6366f1", icon: "⚙️" },
    { label: "Shipped",           value: stats.shipped,    href: "/admin/orders?status=SHIPPED",     color: "#8b5cf6", icon: "🚚" },
    { label: "Delivered",         value: stats.delivered,  href: "/admin/orders?status=DELIVERED",   color: "#10b981", icon: "✅" },
  ];

  return (
    <div style={{ background: "#f9fafb", minHeight: "calc(100vh - 100px)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Admin Dashboard</h1>
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>Manage orders and monitor store activity</p>
          </div>
          <Link href="/admin/orders" style={{ padding: "9px 18px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
            View All Orders
          </Link>
        </div>

        {isLoading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", height: "100px" }} className="animate-pulse" />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
            {cards.map((card) => (
              <div
                key={card.label}
                onClick={() => router.push(card.href)}
                style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px", cursor: "pointer", transition: "box-shadow 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#6b7280", marginBottom: "4px" }}>{card.label}</p>
                <p style={{ fontSize: "30px", fontWeight: 800, color: card.color }}>{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Quick nav */}
        <div style={{ marginTop: "32px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "12px" }}>Quick Actions</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/admin/orders" style={{ padding: "10px 20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "13px", fontWeight: 600, color: "#374151" }}>
              📋 Manage Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
