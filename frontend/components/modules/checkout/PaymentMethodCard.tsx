"use client";

import type React from "react";

interface PaymentMethodCardProps {
  method: string;
  selectedMethod: string;
  onSelect: (method: string) => void;
  icon: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PaymentMethodCard({ method, selectedMethod, onSelect, icon, title, description, children }: PaymentMethodCardProps) {
  const isSelected = selectedMethod === method;

  return (
    <div
      onClick={() => onSelect(method)}
      style={{ border: `2px solid ${isSelected ? "#3c50e0" : "#e5e7eb"}`, borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "border-color 0.15s", background: "#fff" }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px" }}>
        {/* Radio */}
        <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${isSelected ? "#3c50e0" : "#d1d5db"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {isSelected && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3c50e0" }} />}
        </div>

        {/* Icon */}
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#374151", flexShrink: 0 }}>
          {icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "2px" }}>{title}</p>
          {description && <p style={{ fontSize: "12px", color: "#9ca3af" }}>{description}</p>}
        </div>

        {/* Card logos */}
        {method === "stripe" && (
          <div style={{ display: "flex", gap: "6px" }}>
            {["VISA", "MC", "AMEX"].map((c) => (
              <span key={c} style={{ padding: "2px 8px", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "4px", fontSize: "10px", fontWeight: 700, color: "#6b7280" }}>{c}</span>
            ))}
          </div>
        )}
      </div>

      {/* Expanded content */}
      {isSelected && children && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f3f4f6" }}>
          {children}
        </div>
      )}
    </div>
  );
}
