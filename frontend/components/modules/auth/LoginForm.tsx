"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      const redirect = searchParams.get("redirect");
      router.push(redirect || "/");
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

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a2e] text-center mb-1">Sign In to Your Account</h1>
          <p className="text-[15px] text-[#8a94a6] text-center">Enter your details below</p>
        </div>

        {/* Form */}
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
            <label className="text-sm font-semibold text-[#374151]" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[15px] outline-none focus:border-[#3c50e0] focus:bg-white focus:ring-2 focus:ring-[#3c50e0]/10 transition-all placeholder-[#b0b8c9]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="password">Password</label>
              <Link href="/auth/forgot-password" className="text-sm text-[#3c50e0] font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[15px] outline-none focus:border-[#3c50e0] focus:bg-white focus:ring-2 focus:ring-[#3c50e0]/10 transition-all placeholder-[#b0b8c9]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

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
                Signing in...
              </>
            ) : "Sign In"}
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-3 text-[#b0b8c9] text-sm before:flex-1 before:h-px before:bg-[#e5e7eb] after:flex-1 after:h-px after:bg-[#e5e7eb]">
            Or continue with
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full py-3 border-[1.5px] border-[#e5e7eb] rounded-lg text-[15px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full py-3 border-[1.5px] border-[#e5e7eb] rounded-lg text-[15px] font-medium text-[#374151] bg-white hover:bg-[#f9fafb] flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-[#8a94a6] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[#3c50e0] font-semibold hover:underline">Sign Up Now!</Link>
        </p>
      </div>
    </div>
  );
}
