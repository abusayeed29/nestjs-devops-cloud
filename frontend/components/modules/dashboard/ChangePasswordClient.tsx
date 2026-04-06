"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/api/auth.service";

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

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await AuthService.changePassword(currentPassword, newPassword);
      setSuccess(res.message || "Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string | string[] } } };
      const raw = axiosError?.response?.data?.message;
      setError(Array.isArray(raw) ? raw.join(", ") : raw ?? "Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eff4fb] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[480px]">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10">
          {/* Brand */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-9 h-9 bg-[#3c50e0] rounded-lg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span className="text-2xl font-extrabold text-[#1a1a2e] tracking-tight">StoreFront</span>
          </div>

          <button
            className="inline-flex items-center gap-1.5 bg-transparent border-none text-[#8a94a6] text-sm cursor-pointer p-0 mb-5 transition-colors duration-200 hover:text-[#1a1a2e]"
            onClick={() => router.back()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back
          </button>

          <div className="text-center mb-8">
            <h1 className="text-[1.625rem] font-bold text-[#1a1a2e] mb-1.5">Change Password</h1>
            <p className="text-[0.9375rem] text-[#8a94a6]">Update your account password below</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm bg-[#fff1f0] border border-[#ffd6d6] text-[#d32f2f]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                </svg>
                {success}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[0.9375rem] outline-none transition-all duration-200 placeholder:text-[#b0b8c9] focus:border-[#3c50e0] focus:bg-white focus:shadow-[0_0_0_3px_rgba(60,80,224,0.08)] disabled:opacity-50 disabled:cursor-not-allowed"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[0.9375rem] outline-none transition-all duration-200 placeholder:text-[#b0b8c9] focus:border-[#3c50e0] focus:bg-white focus:shadow-[0_0_0_3px_rgba(60,80,224,0.08)] disabled:opacity-50 disabled:cursor-not-allowed"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 chars, upper, lower, number, special"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[0.9375rem] outline-none transition-all duration-200 placeholder:text-[#b0b8c9] focus:border-[#3c50e0] focus:bg-white focus:shadow-[0_0_0_3px_rgba(60,80,224,0.08)] disabled:opacity-50 disabled:cursor-not-allowed"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                disabled={isLoading}
              />
            </div>

            <p className="text-[0.8125rem] text-[#8a94a6] leading-relaxed">
              Password must include uppercase, lowercase, number, and special character (@$!%*?&).
            </p>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#3c50e0] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:enabled:bg-[#2f40c8] hover:enabled:-translate-y-px hover:enabled:shadow-[0_4px_12px_rgba(60,80,224,0.35)] active:enabled:translate-y-0 disabled:opacity-65 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-[1.125rem] h-[1.125rem] animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Updating...
                </>
              ) : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
