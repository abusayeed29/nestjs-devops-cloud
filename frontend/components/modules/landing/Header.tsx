"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { isAuthenticated, logout, isLoading, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDashboardClick = () => {
    router.push(user?.role === "ADMIN" ? "/admin" : "/user");
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, width: "100%" }}>
      {/* Announcement bar */}
      <div style={{ background: "#1c2434", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: "13px", fontWeight: 500 }}>
        Get free delivery on orders over <strong>$80</strong>
        <span style={{ marginLeft: "auto", position: "absolute", right: "24px", top: "8px", display: "flex", gap: "16px", fontSize: "13px" }}>
          <Link href="/auth/register" style={{ color: "#fff", opacity: 0.8 }}>Create an account</Link>
          <Link href="/auth/login" style={{ color: "#fff", fontWeight: 600 }}>Sign In</Link>
        </span>
      </div>

      {/* Main nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", gap: "32px" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <div style={{ width: "36px", height: "36px", background: "#3c50e0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#1c2434", letterSpacing: "-0.5px" }}>StoreFront</span>
          </Link>

          {/* Nav links — desktop */}
          <nav style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
            {["Popular", "Shop", "Blog", "Contact"].map((item) => (
              <Link
                key={item}
                href="/"
                style={{ padding: "8px 14px", fontSize: "15px", fontWeight: 500, color: "#374151", borderRadius: "8px", transition: "all 0.15s" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#3c50e0"; (e.target as HTMLElement).style.background = "#f0f3ff"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#374151"; (e.target as HTMLElement).style.background = "transparent"; }}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
            {/* Search */}
            <button style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "#4b5563" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Wishlist */}
            <button style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "#4b5563" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" style={{ position: "relative", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", color: "#4b5563" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span style={{ position: "absolute", top: "2px", right: "2px", background: "#3c50e0", color: "#fff", fontSize: "10px", fontWeight: 700, minWidth: "16px", height: "16px", borderRadius: "99px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User section */}
            {isAuthenticated ? (
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <button
                  onClick={handleDashboardClick}
                  style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", color: "#4b5563" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
                <button
                  onClick={logout}
                  disabled={isLoading}
                  style={{ padding: "6px 14px", fontSize: "13px", fontWeight: 500, color: "#6b7280", border: "1px solid #e5e7eb", borderRadius: "8px", background: "transparent", cursor: "pointer" }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                style={{ marginLeft: "4px", padding: "8px 18px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "14px", fontWeight: 600 }}
              >
                Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: "none", width: "38px", height: "38px", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", flexDirection: "column", gap: "5px" }}
              className="mobile-menu-btn"
            >
              <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px" }} />
              <span style={{ display: "block", width: "20px", height: "2px", background: "#374151", borderRadius: "2px" }} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div style={{ borderTop: "1px solid #f3f4f6", padding: "8px 24px 12px" }}>
            {["Popular", "Shop", "Blog", "Contact"].map((item) => (
              <Link
                key={item}
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "10px 12px", fontSize: "14px", fontWeight: 500, color: "#374151", borderRadius: "8px" }}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
