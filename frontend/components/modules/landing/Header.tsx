"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { isAuthenticated, logout, isLoading, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDashboardClick = () => {
    if (user?.role === "ADMIN") router.push("/admin");
    else router.push("/user");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement Bar */}
      <div className="bg-[#3c50e0] text-white text-center py-2 text-sm">
        <p className="m-0">🚚 Get free delivery on orders over <strong className="font-bold">$80</strong></p>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-[#e8ecf0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[68px] flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline flex-shrink-0">
            <div className="w-9 h-9 bg-[#3c50e0] rounded-lg flex items-center justify-center text-white flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span className="text-[22px] font-extrabold text-[#1a1a2e] tracking-tight">StoreFront</span>
          </Link>

          {/* Nav */}
          <nav
            className={
              menuOpen
                ? "flex flex-col absolute top-full left-0 right-0 bg-white border-b border-[#e8ecf0] shadow-lg z-[99] px-4 py-3 gap-1 md:static md:flex md:flex-row md:border-none md:shadow-none md:py-0 md:px-0 md:z-auto md:gap-1 md:items-center"
                : "hidden md:flex md:flex-row md:items-center md:gap-1"
            }
          >
            <Link href="/" className="text-[15px] font-medium text-[#374151] px-3 py-2 rounded-lg hover:text-[#3c50e0] hover:bg-[#3c50e0]/5 transition-all" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/" className="text-[15px] font-medium text-[#374151] px-3 py-2 rounded-lg hover:text-[#3c50e0] hover:bg-[#3c50e0]/5 transition-all" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/" className="text-[15px] font-medium text-[#374151] px-3 py-2 rounded-lg hover:text-[#3c50e0] hover:bg-[#3c50e0]/5 transition-all" onClick={() => setMenuOpen(false)}>Popular</Link>
            <Link href="/" className="text-[15px] font-medium text-[#374151] px-3 py-2 rounded-lg hover:text-[#3c50e0] hover:bg-[#3c50e0]/5 transition-all" onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Search */}
            <button className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[#374151] hover:bg-gray-100 hover:text-[#3c50e0] transition-all bg-transparent border-none cursor-pointer" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Wishlist */}
            <button className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[#374151] hover:bg-gray-100 hover:text-[#3c50e0] transition-all bg-transparent border-none cursor-pointer" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[#374151] hover:bg-gray-100 hover:text-[#3c50e0] transition-all" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#3c50e0] text-white text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1">
                <button
                  className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[#374151] hover:bg-gray-100 hover:text-[#3c50e0] transition-all bg-transparent border-none cursor-pointer"
                  onClick={handleDashboardClick}
                  aria-label="Dashboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </button>
                <button
                  className="px-4 py-2 border-[1.5px] border-[#e5e7eb] text-[#6b7280] rounded-lg text-sm font-medium hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all bg-transparent cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={logout}
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "Sign Out"}
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className="px-5 py-2 bg-[#3c50e0] text-white rounded-lg text-sm font-semibold hover:bg-[#2f40c8] hover:shadow-md transition-all whitespace-nowrap">
                Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1.5 rounded-md hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className="block w-[22px] h-0.5 bg-[#374151] rounded-sm transition-all" />
              <span className="block w-[22px] h-0.5 bg-[#374151] rounded-sm transition-all" />
              <span className="block w-[22px] h-0.5 bg-[#374151] rounded-sm transition-all" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
