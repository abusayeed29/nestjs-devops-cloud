import Link from "next/link";

export function Hero() {
  return (
    <div>
      {/* Hero banner */}
      <div style={{ background: "#1c2434" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px" }}>
          <div style={{ maxWidth: "560px" }}>
            <span style={{ display: "inline-block", background: "#3c50e0", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "99px", marginBottom: "20px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              New Arrivals
            </span>
            <h1 className="hero-title" style={{ fontSize: "42px", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "16px" }}>
              Shop the Latest<br />
              <span style={{ color: "#3c50e0" }}>Trending Products</span>
            </h1>
            <p style={{ fontSize: "15px", color: "#9ca3af", lineHeight: 1.6, marginBottom: "32px", maxWidth: "420px" }}>
              Free delivery on orders over $80. Quality products, unbeatable prices.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                href="/"
                style={{ padding: "12px 28px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontWeight: 600, fontSize: "14px", display: "inline-block" }}
              >
                Shop Now
              </Link>
              <Link
                href="/"
                style={{ padding: "12px 28px", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "8px", fontWeight: 600, fontSize: "14px", display: "inline-block" }}
              >
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px" }}>
          <div className="feature-strip" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { emoji: "🚚", title: "Free Shipping", desc: "Orders over $80" },
              { emoji: "🔄", title: "Free Returns", desc: "30-day policy" },
              { emoji: "🔒", title: "Secure Payment", desc: "100% protected" },
              { emoji: "💬", title: "24/7 Support", desc: "Always here" },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>{f.emoji}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#111827" }}>{f.title}</div>
                  <div style={{ fontSize: "12px", color: "#9ca3af" }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
