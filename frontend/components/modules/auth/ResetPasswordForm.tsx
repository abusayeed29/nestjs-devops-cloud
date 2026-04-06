"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthService } from "@/services/api/auth.service";

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

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) { setError("Passwords do not match"); return; }
    setIsLoading(true);
    try {
      const res = await AuthService.resetPassword(token, newPassword);
      setSuccess(res.message);
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string | string[] } } };
      const raw = axiosError?.response?.data?.message;
      setError(Array.isArray(raw) ? raw.join(", ") : raw ?? "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const pageShell = (children: React.ReactNode) => (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1c2434", color: "#fff", textAlign: "center", padding: "8px 16px", fontSize: "13px", fontWeight: 500 }}>
        Get free delivery on orders over <strong>$80</strong>
      </div>
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "36px", height: "36px", background: "#3c50e0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#1c2434", letterSpacing: "-0.5px" }}>StoreFront</span>
          </Link>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 24px 64px" }}>
        <div style={{ width: "100%", maxWidth: "480px", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", padding: "40px" }}>
          {children}
        </div>
      </div>
    </div>
  );

  if (!token) {
    return pageShell(
      <>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>
          Invalid or missing reset token. Please request a new reset link.
        </div>
        <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
          <Link href="/auth/forgot-password" style={{ color: "#3c50e0", fontWeight: 600 }}>Request new link</Link>
        </p>
      </>
    );
  }

  return pageShell(
    <>
      {/* Icon */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ width: "60px", height: "60px", background: "#eff4ff", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#3c50e0" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
          </svg>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#1c2434", marginBottom: "6px" }}>Set New Password</h1>
        <p style={{ fontSize: "14px", color: "#9ca3af" }}>Choose a strong password for your account.</p>
      </div>

      {success ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "14px 16px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", color: "#166534", fontSize: "14px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
            <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
          </svg>
          <p style={{ margin: 0 }}>{success} Redirecting to sign in...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "13px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }} htmlFor="newPassword">New Password</label>
            <input id="newPassword" type="password" placeholder="Min 8 characters" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required disabled={isLoading} style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#3c50e0")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }} htmlFor="confirmPassword">Confirm New Password</label>
            <input id="confirmPassword" type="password" placeholder="Re-enter new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required disabled={isLoading} style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#3c50e0")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
          </div>

          <p style={{ fontSize: "12px", color: "#9ca3af" }}>Password must include uppercase, lowercase, number, and special character (@$!%*?&).</p>

          <button type="submit" disabled={isLoading}
            style={{ width: "100%", padding: "13px", background: "#1c2434", color: "#fff", borderRadius: "8px", fontWeight: 600, fontSize: "15px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit" }}>
            {isLoading ? (
              <>
                <svg className="animate-spin" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Resetting...
              </>
            ) : "Reset Password"}
          </button>
        </form>
      )}

      <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", marginTop: "20px" }}>
        <Link href="/auth/login" style={{ color: "#3c50e0", fontWeight: 600 }}>← Back to Sign In</Link>
      </p>
    </>
  );
}
