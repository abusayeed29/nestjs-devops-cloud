"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthService } from "@/services/api/auth.service";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#eff4fb] flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10 w-full max-w-[480px]">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="rounded-lg bg-[#3c50e0] text-white w-9 h-9 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-[#1a1a2e]">StoreFront</span>
          </div>
          <div className="flex justify-center items-center gap-2 px-4 py-3 bg-[#fff1f0] border border-[#ffd6d6] rounded-lg text-[#d32f2f] text-sm">
            Invalid or missing reset token. Please request a new reset link.
          </div>
          <p className="text-center text-sm text-[#8a94a6] mt-6">
            <Link href="/auth/forgot-password" className="text-[#3c50e0] font-semibold hover:underline">Request new link</Link>
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await AuthService.resetPassword(token, newPassword);
      setSuccess(res.message);
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string | string[] } } };
      const raw = axiosError?.response?.data?.message;
      setError(Array.isArray(raw) ? raw.join(", ") : raw ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eff4fb] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10 w-full max-w-[480px]">

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="rounded-lg bg-[#3c50e0] text-white w-9 h-9 flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-[#1a1a2e]">StoreFront</span>
        </div>

        {/* Key icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#eff4fb] flex items-center justify-center text-[#3c50e0]">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a2e] text-center mb-1">Set New Password</h1>
          <p className="text-[15px] text-[#8a94a6] text-center">Choose a strong password for your account.</p>
        </div>

        {success ? (
          <div className="flex items-start gap-3 px-4 py-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg text-[#166534]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
            <p className="text-sm">{success} Redirecting to sign in...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-[#fff1f0] border border-[#ffd6d6] rounded-lg text-[#d32f2f] text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[15px] outline-none focus:border-[#3c50e0] focus:bg-white focus:ring-2 focus:ring-[#3c50e0]/10 transition-all placeholder-[#b0b8c9]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 chars, upper, lower, number, special"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[15px] outline-none focus:border-[#3c50e0] focus:bg-white focus:ring-2 focus:ring-[#3c50e0]/10 transition-all placeholder-[#b0b8c9]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                required
                disabled={isLoading}
              />
            </div>

            <p className="text-xs text-[#8a94a6]">
              Password must include uppercase, lowercase, number, and special character (@$!%*?&).
            </p>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#3c50e0] text-white rounded-lg font-semibold text-base hover:bg-[#2f40c8] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-65 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Resetting...
                </>
              ) : "Reset Password"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-[#8a94a6] mt-6">
          <Link href="/auth/login" className="text-[#3c50e0] font-semibold hover:underline">← Back to Sign In</Link>
        </p>
      </div>
    </div>
  );
}
