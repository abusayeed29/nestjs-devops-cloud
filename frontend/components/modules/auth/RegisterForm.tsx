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
          <h1 className="text-2xl font-bold text-[#1a1a2e] text-center mb-1">Create Your Account</h1>
          <p className="text-[15px] text-[#8a94a6] text-center">Fill in the details below to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {(error || confirmError) && (
            <div className="flex items-center gap-2 px-4 py-3 bg-[#fff1f0] border border-[#ffd6d6] rounded-lg text-[#d32f2f] text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {confirmError || error}
            </div>
          )}

          {/* First / Last name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[15px] outline-none focus:border-[#3c50e0] focus:bg-white focus:ring-2 focus:ring-[#3c50e0]/10 transition-all placeholder-[#b0b8c9]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#374151]" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[15px] outline-none focus:border-[#3c50e0] focus:bg-white focus:ring-2 focus:ring-[#3c50e0]/10 transition-all placeholder-[#b0b8c9]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>
          </div>

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
            <label className="text-sm font-semibold text-[#374151]" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[15px] outline-none focus:border-[#3c50e0] focus:bg-white focus:ring-2 focus:ring-[#3c50e0]/10 transition-all placeholder-[#b0b8c9]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 chars, upper, lower, number, special"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#374151]" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-3 border-[1.5px] border-[#e5e7eb] rounded-lg bg-[#f9fafb] text-[#1a1a2e] text-[15px] outline-none focus:border-[#3c50e0] focus:bg-white focus:ring-2 focus:ring-[#3c50e0]/10 transition-all placeholder-[#b0b8c9]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
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
                Creating account...
              </>
            ) : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[#8a94a6] mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#3c50e0] font-semibold hover:underline">Sign In Now!</Link>
        </p>
      </div>
    </div>
  );
}
