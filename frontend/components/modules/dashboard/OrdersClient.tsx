"use client";

import { useEffect, useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { OrderItemDetail } from "@/types/order.types";

const getStatusBadgeClass = (status: string) => {
  switch (status.toUpperCase()) {
    case "COMPLETED":
      return "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700";
    case "PROCESSING":
      return "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700";
    case "PENDING":
      return "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700";
    case "CANCELLED":
      return "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700";
    case "SHIPPED":
      return "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700";
    case "DELIVERED":
      return "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-700";
    default:
      return "inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600";
  }
};

export function OrdersClient() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { orders, pagination, getUserOrders, isLoading } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login?redirect=/user/orders");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getUserOrders(currentPage, 10);
    }
  }, [isAuthenticated, currentPage]);

  if (authLoading || !isAuthenticated) {
    return null;
  }

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">My Orders</h1>
          <button
            onClick={() => router.push("/user")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3c50e0] text-white text-sm font-semibold rounded-lg hover:bg-[#2f40c8] transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>

        {isLoading ? (
          <p className="text-center text-[#6b7280] py-8">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#e8ecf0] shadow-sm p-12 text-center text-[#6b7280]">
            <p>No orders found</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-[#e8ecf0] shadow-sm overflow-hidden"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f2f5]">
                    <div>
                      <h3 className="text-sm font-semibold text-[#1a1a2e]">
                        Order #{order.id.slice(0, 8)}
                      </h3>
                      <p className="text-xs text-[#6b7280] mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={getStatusBadgeClass(order.status)}>
                      {order.status}
                    </span>
                  </div>

                  <div className="px-6 py-3 divide-y divide-[#f0f2f5]">
                    {order.items.map((item: OrderItemDetail) => (
                      <div key={item.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm font-medium text-[#374151]">{item.productName}</p>
                          <p className="text-xs text-[#6b7280] mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-[#1a1a2e]">
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between px-6 py-4 bg-[#f7f8fc] border-t border-[#e8ecf0]">
                    <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{order.shippingAddress}</span>
                    </div>
                    <p className="text-sm font-bold text-[#1a1a2e]">
                      Total: ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-[#374151] bg-white border border-[#e8ecf0] rounded-lg hover:bg-[#f7f8fc] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                <div className="text-sm text-[#6b7280]">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-[#374151] bg-white border border-[#e8ecf0] rounded-lg hover:bg-[#f7f8fc] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
