"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import Link from "next/link";
import type { AdminOrderDetail } from "@/types/order.types";

interface Stats { total: number; pending: number; processing: number; shipped: number; delivered: number; }
type Tab = "Sales" | "Orders" | "Revenue";

function fmtCurrency(n: number) { return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function fmtDate(iso: string) { return new Date(iso).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }); }

const statusConfig: Record<string, { bg: string; color: string }> = {
  PENDING:    { bg: "#fff7ed", color: "#c2410c" },
  PROCESSING: { bg: "#eff6ff", color: "#1d4ed8" },
  SHIPPED:    { bg: "#f5f3ff", color: "#6d28d9" },
  DELIVERED:  { bg: "#f0fdf4", color: "#15803d" },
  COMPLETED:  { bg: "#f0fdf4", color: "#15803d" },
  CANCELLED:  { bg: "#fef2f2", color: "#b91c1c" },
};

function StatusBadge({ status }: { status: string }) {
  const s = statusConfig[status] ?? { bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{ padding: "3px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, background: s.bg, color: s.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {status}
    </span>
  );
}

const donutColors = ["#3b5bdb", "#748ffc", "#a5b4fc", "#c7d2fe", "#e0e7ff", "#818cf8"];
const donutLabels = ["Televisions", "Mobile & Tablets", "Health & Sports", "Games & Videos", "Laptop & PC", "Home Appliances"];
const donutData   = [38, 22, 15, 12, 8, 5];

function DonutChart() {
  const size = 140, cx = 70, cy = 70, r = 52, strokeW = 22;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const segments = donutData.map((pct, i) => {
    const dash = (pct / 100) * circumference;
    const gap  = circumference - dash;
    const seg = (
      <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={donutColors[i]} strokeWidth={strokeW}
        strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset}
        style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }} />
    );
    offset += dash;
    return seg;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeW} />
      {segments}
    </svg>
  );
}

const chartMonths  = ["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr"];
const chartDataMap = {
  Sales:   [14000, 4500, 800, 13500, 2000, 1800, 1900, 900],
  Orders:  [120,   45,   12,  130,   22,   20,   21,   10],
  Revenue: [9800,  3200, 600, 9100,  1400, 1300, 1350, 700],
};

function LineChart({ tab }: { tab: Tab }) {
  const raw = chartDataMap[tab];
  const W = 580, H = 200, padL = 48, padB = 30, padT = 12, padR = 12;
  const chartW = W - padL - padR, chartH = H - padB - padT;
  const maxV = Math.max(...raw);
  const xs = raw.map((_, i) => padL + (i / (raw.length - 1)) * chartW);
  const ys = raw.map((v) => padT + chartH - (v / maxV) * chartH);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const areaPath = path + ` L${xs[xs.length - 1]},${padT + chartH} L${xs[0]},${padT + chartH} Z`;
  const yTicks = Array.from({ length: 6 }, (_, i) => ({
    v: (maxV / 5) * (5 - i),
    y: padT + (i / 5) * chartH,
  }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b5bdb" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b5bdb" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map(({ v, y }, i) => (
        <g key={i}>
          <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e2e8f0" strokeWidth="1" />
          <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
            {v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v.toFixed(0)}
          </text>
        </g>
      ))}
      {chartMonths.map((m, i) => (
        <text key={m} x={xs[i]} y={H - 4} textAnchor="middle" fontSize="10" fill="#94a3b8">{m}</text>
      ))}
      <path d={areaPath} fill="url(#ag)" />
      <path d={path} fill="none" stroke="#3b5bdb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="4" fill="#fff" stroke="#3b5bdb" strokeWidth="2" />
      ))}
    </svg>
  );
}

function GridIcon()   { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function OrderIcon()  { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>; }
function UsersIcon()  { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>; }
function BoxIcon()    { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>; }
function TagIcon()    { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>; }
function CouponIcon() { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 12V8a2 2 0 00-2-2H6a2 2 0 00-2 2v4"/><path d="M4 12v4a2 2 0 002 2h12a2 2 0 002-2v-4"/><line x1="12" y1="6" x2="12" y2="18"/></svg>; }
function StarIcon()   { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }
function GearIcon()   { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>; }
function BrushIcon()  { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L3 14.67V21h6.33l10.06-10.06a5.5 5.5 0 000-7.77v-.56z"/></svg>; }
function BlogIcon()   { return <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>; }
function ChevronDown(){ return <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>; }
function HomeIcon()   { return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function UserIcon()   { return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }

const navItems = [
  { label: "Dashboard",     href: "/admin",        icon: <GridIcon />,   hasChevron: false },
  { label: "Orders",        href: "/admin/orders", icon: <OrderIcon />,  hasChevron: false },
  { label: "Customers",     href: "#",             icon: <UsersIcon />,  hasChevron: false },
  { label: "Products",      href: "#",             icon: <BoxIcon />,    hasChevron: true  },
  { label: "Categories",    href: "#",             icon: <TagIcon />,    hasChevron: true  },
  { label: "Coupons",       href: "#",             icon: <CouponIcon />, hasChevron: false },
  { label: "Reviews",       href: "#",             icon: <StarIcon />,   hasChevron: false },
  { label: "Settings",      href: "#",             icon: <GearIcon />,   hasChevron: true  },
  { label: "Customization", href: "#",             icon: <BrushIcon />,  hasChevron: true  },
  { label: "Blog",          href: "#",             icon: <BlogIcon />,   hasChevron: true  },
];

export function AdminDashboardClient() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { getAllOrders, isLoading } = useOrder();
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, processing: 0, shipped: 0, delivered: 0 });
  const [recentOrders, setRecentOrders] = useState<AdminOrderDetail[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Sales");

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login"); return; }
    if (user?.role !== "ADMIN") { router.push("/user"); return; }
    getAllOrders(1, 100).then((res) => {
      if (!res) return;
      setStats({
        total:      res.total,
        pending:    res.data.filter((o) => o.status === "PENDING").length,
        processing: res.data.filter((o) => o.status === "PROCESSING").length,
        shipped:    res.data.filter((o) => o.status === "SHIPPED").length,
        delivered:  res.data.filter((o) => o.status === "DELIVERED").length,
      });
      setRecentOrders(
        [...res.data]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
      );
    });
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== "ADMIN") return null;

  const statCards = [
    { label: "Total order",       value: stats.total,      bg: "#f0fdf4", icon: "📦" },
    { label: "Pending Orders",    value: stats.pending,    bg: "#fff7ed", icon: "⏳" },
    { label: "Processing Orders", value: stats.processing, bg: "#faf5ff", icon: "⚙️" },
    { label: "Delivered Orders",  value: stats.delivered,  bg: "#eff6ff", icon: "✅" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: "210px", minWidth: "210px", background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "20px 0" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", padding: "0 20px 12px", textTransform: "uppercase" }}>MENU</p>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {navItems.map((item) => {
            const active = item.label === "Dashboard";
            return (
              <Link key={item.label} href={item.href} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "9px 20px", fontSize: "13px", fontWeight: active ? 600 : 500,
                color: active ? "#3b5bdb" : "#475569",
                background: active ? "#eff6ff" : "transparent",
                borderRight: active ? "3px solid #3b5bdb" : "3px solid transparent",
                textDecoration: "none", transition: "all 0.12s",
              }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f8fafc"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: active ? "#3b5bdb" : "#94a3b8", display: "flex" }}>{item.icon}</span>
                  {item.label}
                </span>
                {item.hasChevron && <span style={{ color: "#cbd5e1", display: "flex" }}><ChevronDown /></span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>Dashboard</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", textDecoration: "none" }}>
              <HomeIcon /> Back to home
            </Link>
            <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: "pointer" }}>
              <UserIcon /> Account <ChevronDown />
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", height: "96px" }} />
              ))
            : statCards.map((card) => (
                <div key={card.label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px 22px", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                    {card.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500, marginBottom: "4px" }}>{card.label}</p>
                    <p style={{ fontSize: "26px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{card.value}</p>
                  </div>
                </div>
              ))
          }
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "16px", marginBottom: "24px" }}>

          {/* Line chart */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>Monthly Analytics</h2>
              <div style={{ display: "flex", gap: "4px", background: "#f8fafc", borderRadius: "8px", padding: "3px" }}>
                {(["Sales", "Orders", "Revenue"] as Tab[]).map((t) => (
                  <button key={t} onClick={() => setActiveTab(t)} style={{
                    padding: "4px 12px", fontSize: "12px", fontWeight: 600, borderRadius: "6px",
                    border: "none", cursor: "pointer",
                    background: activeTab === t ? "#3b5bdb" : "transparent",
                    color: activeTab === t ? "#fff" : "#64748b",
                    transition: "all 0.15s",
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <LineChart tab={activeTab} />
          </div>

          {/* Donut chart */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "22px 24px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "18px" }}>Best Selling Products</h2>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}><DonutChart /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 8px" }}>
              {donutLabels.map((label, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#475569" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: donutColors[i], flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent orders */}
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "22px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>Recent Orders</h2>
            <Link href="/admin/orders" style={{ fontSize: "13px", fontWeight: 600, color: "#3b5bdb", textDecoration: "none" }}>View All</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["Order", "Date", "Status", "Total"].map((col) => (
                  <th key={col} style={{ padding: "8px 12px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}><td colSpan={4} style={{ padding: "14px 12px" }}><div style={{ height: "16px", background: "#f1f5f9", borderRadius: "4px" }} /></td></tr>
                  ))
                : recentOrders.length === 0
                  ? <tr><td colSpan={4} style={{ padding: "32px 12px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>No orders yet</td></tr>
                  : recentOrders.map((order) => (
                      <tr key={order.id}
                        style={{ borderBottom: "1px solid #f8fafc", cursor: "pointer", transition: "background 0.1s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        onClick={() => router.push("/admin/orders")}
                      >
                        <td style={{ padding: "13px 12px", fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>#{order.id.slice(0, 8)}</td>
                        <td style={{ padding: "13px 12px", fontSize: "13px", color: "#64748b" }}>{fmtDate(order.createdAt)}</td>
                        <td style={{ padding: "13px 12px" }}><StatusBadge status={order.status} /></td>
                        <td style={{ padding: "13px 12px", fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>{fmtCurrency(order.total)}</td>
                      </tr>
                    ))
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}