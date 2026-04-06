"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import type { Product } from "@/types/product.types";
import { AdminSidebar as SharedAdminSidebar, AdminTopBar as SharedAdminTopBar } from "./AdminChrome";

// ── Icons ────────────────────────────────────────────────────────────────────
function PlusIcon()   { return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function EditIcon()   { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function TrashIcon()  { return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>; }
function SearchIcon() { return <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>; }
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

// ── Shared Sidebar ───────────────────────────────────────────────────────────
const navItems = [
  { label: "Dashboard",     href: "/admin",                 icon: <GridIcon />,   hasChevron: false },
  { label: "Orders",        href: "/admin/orders",          icon: <OrderIcon />,  hasChevron: false },
  { label: "Customers",     href: "#",                      icon: <UsersIcon />,  hasChevron: false },
  { label: "Products",      href: "/admin/products",        icon: <BoxIcon />,    hasChevron: true,
    children: [
      { label: "All Products", href: "/admin/products" },
      { label: "Add Product",  href: "/admin/products/add" },
    ]
  },
  { label: "Categories",    href: "#",                      icon: <TagIcon />,    hasChevron: true  },
  { label: "Coupons",       href: "#",                      icon: <CouponIcon />, hasChevron: false },
  { label: "Reviews",       href: "#",                      icon: <StarIcon />,   hasChevron: false },
  { label: "Settings",      href: "#",                      icon: <GearIcon />,   hasChevron: true  },
  { label: "Customization", href: "#",                      icon: <BrushIcon />,  hasChevron: true  },
  { label: "Blog",          href: "#",                      icon: <BlogIcon />,   hasChevron: true  },
];

export function AdminSidebar({ activePage }: { activePage: string }) {
  const [productsOpen, setProductsOpen] = useState(activePage === "products");

  return (
    <aside style={{ width: "210px", minWidth: "210px", background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "20px 0" }}>
      <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", padding: "0 20px 12px", textTransform: "uppercase" }}>MENU</p>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {navItems.map((item) => {
          const active = item.label.toLowerCase() === activePage;
          const isProducts = item.label === "Products";
          return (
            <div key={item.label}>
              <Link href={isProducts ? "#" : item.href}
                onClick={isProducts ? (e) => { e.preventDefault(); setProductsOpen(o => !o); } : undefined}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "9px 20px", fontSize: "13px", fontWeight: active ? 600 : 500,
                  color: active ? "#3b5bdb" : "#475569",
                  background: active ? "#eff6ff" : "transparent",
                  borderRight: active ? "3px solid #3b5bdb" : "3px solid transparent",
                  textDecoration: "none", transition: "all 0.12s",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "#f8fafc"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = active ? "#eff6ff" : "transparent"; }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: active ? "#3b5bdb" : "#94a3b8", display: "flex" }}>{item.icon}</span>
                  {item.label}
                </span>
                {item.hasChevron && (
                  <span style={{ color: "#cbd5e1", display: "flex", transform: isProducts && productsOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <ChevronDown />
                  </span>
                )}
              </Link>
              {/* Sub-items for Products */}
              {isProducts && productsOpen && item.children && (
                <div style={{ background: "#f8fafc", borderRight: "3px solid transparent" }}>
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} style={{
                      display: "block", padding: "7px 20px 7px 44px", fontSize: "12px", fontWeight: 500,
                      color: "#475569", textDecoration: "none", transition: "all 0.12s",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#3b5bdb"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; }}
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

// ── Top Bar ──────────────────────────────────────────────────────────────────
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

// ── All Products List ────────────────────────────────────────────────────────
export function AdminProductsClient() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { getProducts, deleteProduct, products, meta, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login"); return; }
    if (user?.role !== "ADMIN") { router.push("/user"); return; }
    getProducts({ page, limit: 10, search: search || undefined });
  }, [isAuthenticated, user, page, search]);

  if (!isAuthenticated || user?.role !== "ADMIN") return null;

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    await deleteProduct(id);
    setDeletingId(null);
    getProducts({ page, limit: 10, search: search || undefined });
  }

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", background: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <SharedAdminSidebar activePage="products" />
      <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
        <SharedAdminTopBar title="Products" />

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "24px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>All Products</h2>
            <Link href="/admin/products/add" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "#3b5bdb", color: "#fff", borderRadius: "8px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
              <PlusIcon /> Add Product
            </Link>
          </div>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: "20px", maxWidth: "320px" }}>
            <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex" }}><SearchIcon /></span>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search products…"
              style={{ width: "100%", padding: "8px 12px 8px 34px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", outline: "none", color: "#1e293b", boxSizing: "border-box" }}
            />
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["Product", "SKU", "Price", "Stock", "Status", "Actions"].map((col) => (
                  <th key={col} style={{ padding: "8px 12px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}><td colSpan={6} style={{ padding: "14px 12px" }}><div style={{ height: "16px", background: "#f1f5f9", borderRadius: "4px" }} /></td></tr>
                  ))
                : products.length === 0
                  ? <tr><td colSpan={6} style={{ padding: "40px 12px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>No products found</td></tr>
                  : products.map((p) => (
                      <tr key={p.id}
                        style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.1s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "12px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {p.imageUrl
                              ? <img src={p.imageUrl} alt={p.name} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover", border: "1px solid #e2e8f0" }} />
                              : <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>📦</div>
                            }
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "12px 12px", fontSize: "12px", color: "#64748b" }}>{p.sku || "—"}</td>
                        <td style={{ padding: "12px 12px", fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>${p.price.toFixed(2)}</td>
                        <td style={{ padding: "12px 12px", fontSize: "13px", color: p.stock <= 5 ? "#ef4444" : "#1e293b" }}>{p.stock ?? p.quantity}</td>
                        <td style={{ padding: "12px 12px" }}>
                          <span style={{ padding: "3px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700, background: p.isActive ? "#f0fdf4" : "#fef2f2", color: p.isActive ? "#15803d" : "#b91c1c", textTransform: "uppercase" }}>
                            {p.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 12px" }}>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <Link href={`/admin/products/${p.id}/edit`} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "5px 10px", background: "#eff6ff", color: "#3b5bdb", borderRadius: "6px", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                              <EditIcon /> Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(p.id)}
                              disabled={deletingId === p.id}
                              style={{ display: "flex", alignItems: "center", gap: "4px", padding: "5px 10px", background: "#fef2f2", color: "#b91c1c", borderRadius: "6px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer" }}
                            >
                              <TrashIcon /> {deletingId === p.id ? "…" : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
              }
            </tbody>
          </table>

          {/* Pagination */}
          {meta.totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px" }}>
              <p style={{ fontSize: "12px", color: "#64748b" }}>
                Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, meta.total)} of {meta.total}
              </p>
              <div style={{ display: "flex", gap: "4px" }}>
                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} style={{
                    width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #e2e8f0",
                    background: page === p ? "#3b5bdb" : "#fff", color: page === p ? "#fff" : "#374151",
                    fontSize: "13px", fontWeight: 600, cursor: "pointer",
                  }}>{p}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
