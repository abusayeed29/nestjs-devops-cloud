"use client";

import Link from "next/link";

const paymentIcons = [
  {
    name: "Visa",
    node: (
      <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.86 12.56h-2.06l1.29-6.72h2.06l-1.29 6.72Z" fill="#1A1F71" />
        <path d="M25.33 6c-.41-.15-1.04-.32-1.84-.32-2.03 0-3.46 1.02-3.48 2.5-.01 1.08 1.02 1.69 1.81 2.05.8.37 1.07.6 1.06.93 0 .5-.63.73-1.23.73-.82 0-1.26-.11-1.94-.4l-.27-.11-.29 1.71c.48.21 1.36.39 2.28.4 2.16 0 3.56-1.01 3.58-2.56.01-.87-.55-1.52-1.75-2.05-.73-.35-1.17-.58-1.16-.94 0-.32.38-.65 1.21-.65.69-.01 1.19.14 1.58.3l.2.09.29-1.66Z" fill="#1A1F71" />
        <path d="M28.05 10.14c.17-.42.83-2.12.83-2.12-.01.02.17-.43.26-.71l.14.64s.4 1.9.48 2.19h-1.71Zm2.54-4.3H29c-.49 0-.88.14-1.1.65l-3.04 6.07h2.15s.35-.98.43-1.19h2.64c.06.27.25 1.19.25 1.19h1.9l-1.63-6.72Z" fill="#1A1F71" />
        <path d="M14.22 5.84 12.2 10.44l-.21-1c-.37-1.19-1.55-2.48-2.86-3.11l1.85 6.23h2.17l3.24-6.72h-2.17Z" fill="#1A1F71" />
        <path d="M10.34 5.84H7.05l-.03.16c2.57.61 4.27 2.1 4.98 3.87l-.72-3.38c-.13-.49-.5-.64-.94-.65Z" fill="#F7B600" />
      </svg>
    ),
  },
  {
    name: "Mastercard",
    node: (
      <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19" cy="9" r="4.4" fill="#EB001B" />
        <circle cx="27" cy="9" r="4.4" fill="#F79E1B" />
        <path d="M23 5.7c.94.8 1.54 2 1.54 3.3 0 1.3-.6 2.5-1.54 3.3-.94-.8-1.54-2-1.54-3.3 0-1.3.6-2.5 1.54-3.3Z" fill="#FF5F00" />
      </svg>
    ),
  },
  {
    name: "PayPal",
    node: (
      <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4 5.6h3.62c1.37 0 2.34.91 2.12 2.18-.24 1.37-1.31 2.13-2.69 2.13h-1.12l-.27 1.65h-1.67l.91-5.96Zm2.14 2.96h1c.68 0 1.04-.29 1.14-.84.09-.5-.2-.79-.87-.79h-1l-.27 1.63Z" fill="#003087" />
        <path d="M23.03 7.08h1.53l-.1.59c.29-.44.77-.71 1.39-.71 1.06 0 1.73.83 1.52 2.05l-.4 2.55h-1.59l.34-2.2c.1-.62-.13-1-.63-1-.54 0-.88.36-.99 1.02l-.34 2.18h-1.59l.87-4.48Z" fill="#009CDE" />
      </svg>
    ),
  },
  {
    name: "Apple Pay",
    node: (
      <svg width="48" height="18" viewBox="0 0 48 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.13 7.46c0-1.18.97-1.8 1.02-1.82-.56-.8-1.42-.91-1.73-.92-.73-.07-1.43.43-1.81.43-.38 0-.96-.42-1.57-.4-.81.01-1.56.47-1.96 1.19-.84 1.45-.21 3.6.6 4.74.4.56.87 1.18 1.47 1.16.59-.03.81-.37 1.53-.37.71 0 .91.37 1.53.35.63-.01 1.04-.57 1.43-1.14.46-.66.65-1.31.66-1.34-.02-.01-1.26-.48-1.27-1.88Z" fill="#111827" />
        <path d="M15.68 4.16c.32-.4.55-.94.48-1.5-.47.02-1.03.31-1.37.71-.3.35-.56.9-.49 1.44.52.04 1.05-.25 1.38-.65Z" fill="#111827" />
        <path d="M20.26 5.7h2.2c1.54 0 2.6.85 2.6 2.24 0 1.36-1.08 2.28-2.65 2.28h-1.13v1.76h-1.02V5.7Zm1.02 3.66h.91c1.08 0 1.7-.49 1.7-1.41 0-.91-.62-1.39-1.69-1.39h-.92v2.8Z" fill="#111827" />
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "#f3f4f6", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 0" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", paddingBottom: "40px", borderBottom: "1px solid #e5e7eb" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <div style={{ width: "32px", height: "32px", background: "#3c50e0", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>StoreFront</span>
            </div>
            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, marginBottom: "16px", maxWidth: "260px" }}>
              Your premier destination for quality products at great prices.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c50e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                685 Market Street, Las Vegas, LA 95820, United States
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c50e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.46 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                (+099) 532-786-9843
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c50e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                support@example.com
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Help &amp; Support</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Help Center", "Privacy Policy", "Refund Policy", "Terms of Use", "FAQs"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    style={{ fontSize: "13px", color: "#6b7280", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#3c50e0")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b7280")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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
                  <Link
                    href={href}
                    style={{ fontSize: "13px", color: "#6b7280", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#3c50e0")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b7280")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Quick Link</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Privacy Policy", "Refund Policy", "Terms of Use", "FAQs"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    style={{ fontSize: "13px", color: "#6b7280", transition: "color 0.15s" }}
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "#9ca3af" }}>
            © {currentYear} StoreFront. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {paymentIcons.map((method) => (
              <span
                key={method.name}
                title={method.name}
                aria-label={method.name}
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: "64px", height: "30px", padding: "4px 8px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }}
              >
                {method.node}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
