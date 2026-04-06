"use client";

import Link from "next/link";
import { useState } from "react";

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
function UserIcon()   { return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <GridIcon />, chevron: false, children: [] },
  { label: "Orders", href: "/admin/orders", icon: <OrderIcon />, chevron: false, children: [] },
  { label: "Customers", href: "#", icon: <UsersIcon />, chevron: false, children: [] },
  {
    label: "Products", href: "/admin/products", icon: <BoxIcon />, chevron: true,
    children: [
      { label: "All Products", href: "/admin/products" },
      { label: "Add Product", href: "/admin/products/add" },
    ],
  },
  {
    label: "Categories", href: "/admin/categories", icon: <TagIcon />, chevron: true,
    children: [
      { label: "All Categories", href: "/admin/categories" },
      { label: "Add Category", href: "/admin/categories/add" },
    ],
  },
  { label: "Coupons", href: "#", icon: <CouponIcon />, chevron: false, children: [] },
  { label: "Reviews", href: "#", icon: <StarIcon />, chevron: false, children: [] },
  { label: "Settings", href: "#", icon: <GearIcon />, chevron: true, children: [] },
  { label: "Customization", href: "#", icon: <BrushIcon />, chevron: true, children: [] },
  { label: "Blog", href: "#", icon: <BlogIcon />, chevron: true, children: [] },
];

export function AdminSidebar({ activePage }: { activePage: string }) {
  const [openMenu, setOpenMenu] = useState<string | null>(
    activePage === "dashboard" ? null : activePage,
  );

  function toggle(label: string) {
    setOpenMenu((prev) => (prev === label ? null : label));
  }

  return (
    <aside style={{ width: "210px", minWidth: "210px", background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "20px 0" }}>
      <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", padding: "0 20px 12px", textTransform: "uppercase" }}>MENU</p>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {navItems.map((item) => {
          const active = item.label.toLowerCase() === activePage.toLowerCase();
          const hasKids = item.children.length > 0;
          const isOpen = openMenu === item.label;

          return (
            <div key={item.label}>
              <Link
                href={hasKids ? "#" : item.href}
                onClick={hasKids ? (e) => { e.preventDefault(); toggle(item.label); } : undefined}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "9px 20px", fontSize: "13px", fontWeight: active ? 600 : 500,
                  color: active ? "#3b5bdb" : "#475569", background: active ? "#eff6ff" : "transparent",
                  borderRight: active ? "3px solid #3b5bdb" : "3px solid transparent",
                  textDecoration: "none", transition: "background 0.12s, color 0.12s",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f8fafc"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: active ? "#3b5bdb" : "#94a3b8", display: "flex" }}>{item.icon}</span>
                  {item.label}
                </span>
                {item.chevron && (
                  <span style={{ color: "#cbd5e1", display: "flex", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <ChevronDown />
                  </span>
                )}
              </Link>

              {hasKids && isOpen && (
                <div style={{ background: "#f8fafc", borderRight: "3px solid transparent" }}>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      style={{ display: "block", padding: "7px 20px 7px 46px", fontSize: "12px", fontWeight: 500, color: "#64748b", textDecoration: "none", transition: "color 0.12s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#3b5bdb"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export function AdminTopBar({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a" }}>{title}</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", textDecoration: "none" }}>
          <HomeIcon /> Back to home
        </Link>
        <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", fontWeight: 500, color: "#374151", cursor: "pointer" }}>
          <UserIcon /> Account <ChevronDown />
        </button>
      </div>
    </div>
  );
}
