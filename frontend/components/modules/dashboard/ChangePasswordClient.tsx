"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
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

export function ChangePasswordClient() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isAuthenticated) {
    router.push("/auth/login?redirect=/user/change-password");
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (newPassword !== confirmPassword) { setError("New passwords do not match"); return; }
    setIsLoading(true);
    try {
      const res = await AuthService.changePassword(currentPassword, newPassword);
      setSuccess(res.message || "Password changed successfully");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string | string[] } } };
      const raw = axiosError?.response?.data?.message;
      setError(Array.isArray(raw) ? raw.join(", ") : raw ?? "Failed to change password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: "#f9fafb", minHeight: "calc(100vh - 100px)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "24px" }}>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            <Link href="/" style={{ color: "#6b7280" }}>Home</Link>
            {" › "}
            <Link href="/user" style={{ color: "#6b7280" }}>Dashboard</Link>
            {" › "}
            <span style={{ color: "#111827" }}>Change Password</span>
          </span>
        </div>

        <div style={{ maxWidth: "520px" }}>
          {/* Back button */}
          <button onClick={() => router.back()} style={{ display: "flex", alignItems: "center", gap: "6px", background: "transparent", border: "none", color: "#6b7280", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", marginBottom: "20px", padding: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back
          </button>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "36px" }}>
            {/* Icon */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <div style={{ width: "56px", height: "56px", background: "#eff4ff", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#3c50e0" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "4px" }}>Change Password</h1>
              <p style={{ fontSize: "13px", color: "#9ca3af" }}>Update your account password below</p>
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", color: "#166534", fontSize: "13px", marginBottom: "16px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                </svg>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }} htmlFor="currentPassword">Current Password</label>
                <input id="currentPassword" type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required disabled={isLoading} style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#3c50e0")} onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
              </div>

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
                style={{ width: "100%", padding: "13px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontWeight: 600, fontSize: "14px", border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit" }}>
                {isLoading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Updating...
                  </>
                ) : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
