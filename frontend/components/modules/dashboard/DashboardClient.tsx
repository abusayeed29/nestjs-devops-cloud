"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useOrder } from "@/hooks/useOrder";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export function DashboardClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { orders, getUserOrders, isLoading } = useOrder();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/user");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getUserOrders(1, 10);
    }
  }, [isAuthenticated]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const totalOrders = orders.length;
  const processingOrders = orders.filter(
    (o) => o.status === "PROCESSING"
  ).length;
  const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/user/orders"
            className="bg-white rounded-xl border border-[#e8ecf0] shadow-sm p-6 flex items-center gap-5 no-underline text-inherit hover:-translate-y-0.5 hover:shadow-md hover:border-[#3c50e0] transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-[#3c50e0]/10 flex items-center justify-center text-[#3c50e0] shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-[#6b7280] mb-1">Total Orders</h3>
              <p className="text-3xl font-bold text-[#1a1a2e] m-0">{totalOrders}</p>
            </div>
          </Link>

          <div className="bg-white rounded-xl border border-[#e8ecf0] shadow-sm p-6 flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#3c50e0]/10 flex items-center justify-center text-[#3c50e0] shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-[#6b7280] mb-1">Processing</h3>
              <p className="text-3xl font-bold text-[#1a1a2e] m-0">{processingOrders}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#e8ecf0] shadow-sm p-6 flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#3c50e0]/10 flex items-center justify-center text-[#3c50e0] shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-[#6b7280] mb-1">Completed</h3>
              <p className="text-3xl font-bold text-[#1a1a2e] m-0">{completedOrders}</p>
            </div>
          </div>
        </div>

        {isLoading && (
          <p className="text-center text-[#6b7280] py-8">Loading orders...</p>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[#1a1a2e] mb-4">Account</h2>
          <div className="flex flex-col gap-2 max-w-xs">
            <Link
              href="/user/orders"
              className="flex items-center gap-3 px-4 py-3.5 bg-white border border-[#e8ecf0] rounded-lg text-[#374151] text-[0.9375rem] no-underline transition-all duration-200 hover:bg-[#3c50e0]/5 hover:border-[#3c50e0]/30 hover:text-[#3c50e0]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              My Orders
            </Link>
            <Link
              href="/user/change-password"
              className="flex items-center gap-3 px-4 py-3.5 bg-white border border-[#e8ecf0] rounded-lg text-[#374151] text-[0.9375rem] no-underline transition-all duration-200 hover:bg-[#3c50e0]/5 hover:border-[#3c50e0]/30 hover:text-[#3c50e0]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
