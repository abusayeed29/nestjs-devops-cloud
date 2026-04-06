"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#f3f4f6", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 0" }}>

        {/* Grid */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", paddingBottom: "40px", borderBottom: "1px solid #e5e7eb" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <div style={{ width: "32px", height: "32px", background: "#3c50e0", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>StoreFront</span>
            </div>
            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, marginBottom: "16px", maxWidth: "260px" }}>
              Your premier destination for quality products at great prices.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c50e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                685 Market Street, Las Vegas, LA 95820, United States
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c50e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.46 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                (+099) 532-786-9843
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c50e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                support@example.com
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Help &amp; Support</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Help Center", "Privacy Policy", "Refund Policy", "Terms of Use", "FAQs"].map((item) => (
                <li key={item}>
                  <Link href="/" style={{ fontSize: "13px", color: "#6b7280", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#3c50e0")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b7280")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Account</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Login / Register", href: "/auth/login" },
                { label: "Cart", href: "/cart" },
                { label: "Wishlist", href: "/" },
                { label: "Shop", href: "/" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{ fontSize: "13px", color: "#6b7280", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#3c50e0")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b7280")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Quick Link</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Privacy Policy", "Refund Policy", "Terms of Use", "FAQs"].map((item) => (
                <li key={item}>
                  <Link href="/" style={{ fontSize: "13px", color: "#6b7280", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#3c50e0")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b7280")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            © {currentYear} StoreFront. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {["VISA", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
              <span key={method} style={{ padding: "4px 10px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "11px", fontWeight: 600, color: "#6b7280" }}>
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
