"use client";

import Link from "next/link";

interface BreadcrumbsProps {
  productName: string;
}

export function Breadcrumbs({ productName }: BreadcrumbsProps) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px" }}>
        <nav style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#6b7280" }}>
          <Link href="/" style={{ color: "#6b7280" }}>Home</Link>
          <span style={{ color: "#d1d5db" }}>›</span>
          <Link href="/" style={{ color: "#6b7280" }}>Shop</Link>
          <span style={{ color: "#d1d5db" }}>›</span>
          <span style={{ color: "#111827", fontWeight: 500, maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {productName}
          </span>
        </nav>
      </div>
    </div>
  );
}
