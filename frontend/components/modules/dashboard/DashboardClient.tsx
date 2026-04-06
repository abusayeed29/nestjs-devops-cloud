"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useOrder } from "@/hooks/useOrder";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function DashboardClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { orders, getUserOrders, isLoading } = useOrder();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push("/auth/login?redirect=/user");
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) getUserOrders(1, 10);
  }, [isAuthenticated]);

  if (authLoading || !isAuthenticated) return null;

  const totalOrders = orders.length;
  const processingOrders = orders.filter((o) => o.status === "PROCESSING").length;
  const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;

  const statCards = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
      href: "/user/orders",
    },
    {
      label: "Processing",
      value: processingOrders,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      label: "Completed",
      value: completedOrders,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
    },
  ];

  const menuItems = [
    { label: "My Orders", href: "/user/orders", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
    { label: "Change Password", href: "/user/change-password", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  ];

  return (
    <div style={{ background: "#f9fafb", minHeight: "calc(100vh - 100px)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Welcome */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>
            Welcome back{user?.name ? `, ${user.name}` : ""}!
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7280" }}>Here's a summary of your account activity.</p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {statCards.map((card) => (
            <div
              key={card.label}
              style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px", display: "flex", alignItems: "center", gap: "16px", cursor: card.href ? "pointer" : "default", transition: "box-shadow 0.2s" }}
              onClick={() => card.href && router.push(card.href)}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(60,80,224,0.08)", color: "#3c50e0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {card.icon}
              </div>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#6b7280", marginBottom: "2px" }}>{card.label}</p>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#111827" }}>{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", padding: "16px 0" }}>Loading orders...</p>
        )}

        {/* Account links */}
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "12px" }}>Account</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "320px" }}>
            {menuItems.map(({ label, href, icon }) => (
              <Link
                key={label}
                href={href}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", fontWeight: 500, color: "#374151", transition: "border-color 0.15s" }}
              >
                <span style={{ color: "#3c50e0" }}>{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
