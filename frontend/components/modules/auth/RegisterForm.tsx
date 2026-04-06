"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setConfirmError(null);
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }
    const success = await register({ email, password, firstName, lastName });
    if (success) router.push("/");
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "#fff",
    fontSize: "14px",
    color: "#111827",
    outline: "none",
    fontFamily: "inherit",
  };

  const logoBlock = (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ width: "36px", height: "36px", background: "#3c50e0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </div>
      <span style={{ fontSize: "20px", fontWeight: 800, color: "#1c2434", letterSpacing: "-0.5px" }}>StoreFront</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>

      {/* Announcement */}
      <div style={{ background: "#1c2434", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: "13px", fontWeight: 500 }}>
        Get free delivery on orders over <strong>$80</strong>
      </div>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", gap: "32px" }}>
          <Link href="/">{logoBlock}</Link>
          <nav style={{ display: "flex", gap: "4px", flex: 1 }}>
            {["Popular", "Shop", "Blog", "Contact"].map((item) => (
              <Link key={item} href="/" style={{ padding: "8px 14px", fontSize: "15px", fontWeight: 500, color: "#374151", borderRadius: "8px" }}>
                {item}
              </Link>
            ))}
          </nav>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Link href="/auth/register" style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>Create an account</Link>
            <span style={{ color: "#e5e7eb" }}>|</span>
            <Link href="/auth/login" style={{ fontSize: "14px", color: "#3c50e0", fontWeight: 600 }}>Sign In</Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", width: "100%" }}>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          <Link href="/" style={{ color: "#6b7280" }}>Home</Link>
          {" › "}
          <span style={{ color: "#111827" }}>Register</span>
        </span>
      </div>

      {/* Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "16px 24px 64px" }}>
        <div style={{ width: "100%", maxWidth: "520px", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", padding: "40px" }}>

          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1c2434", marginBottom: "6px" }}>
              Create Your Account
            </h1>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>Fill in the details below to get started</p>
          </div>

          {(error || confirmError) && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "13px", marginBottom: "20px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {confirmError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Name row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }} htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#3c50e0")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }} htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#3c50e0")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }} htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#3c50e0")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#3c50e0")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }} htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#3c50e0")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{ width: "100%", padding: "13px", background: "#1c2434", color: "#fff", borderRadius: "8px", fontWeight: 600, fontSize: "15px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit", marginTop: "4px" }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Creating account...
                </>
              ) : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", marginTop: "20px" }}>
            Already have an account?{" "}
            <Link href="/auth/login" style={{ color: "#3c50e0", fontWeight: 600 }}>Sign In Now!</Link>
          </p>
        </div>
      </div>

      {/* Mini footer */}
      <div style={{ background: "#f3f4f6", borderTop: "1px solid #e5e7eb", padding: "20px 24px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>© {new Date().getFullYear()} StoreFront. All rights reserved.</p>
      </div>
    </div>
  );
}
