"use client";

import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { CartItem } from "./CartItem";
import Link from "next/link";

export function CartClient() {
  const { items, totalPrice, clearAllCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      await clearAllCart();
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/cart");
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] py-12 px-4 bg-[#eff4fb]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-300 mb-6"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <h2 className="text-2xl font-semibold text-[#1a1a2e] mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Add some products to get started
            </p>
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#3c50e0] text-white rounded-lg text-base font-semibold transition-all hover:bg-[#2f40c8]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[60vh] py-12 px-4 bg-[#eff4fb]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="px-5 py-2.5 bg-transparent text-red-600 border border-red-600 rounded text-sm font-medium cursor-pointer transition-all hover:bg-red-600 hover:text-white"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Items list */}
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Order summary */}
          <div className="bg-white border border-[#e8ecf0] rounded-xl p-6 sticky top-[100px]">
            <h2 className="text-xl font-semibold text-[#1a1a2e] mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3 text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-medium text-[#1a1a2e]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-3 text-sm text-gray-500">
              <span>Shipping</span>
              <span className="font-medium text-[#1a1a2e]">
                Calculated at checkout
              </span>
            </div>

            <hr className="border-none border-t border-[#e8ecf0] my-4" />

            <div className="flex justify-between text-lg font-semibold text-[#1a1a2e] mb-6">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#3c50e0] text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#2f40c8] mb-3"
            >
              Proceed to Checkout
            </button>

            <Link
              href="/"
              className="block text-center text-sm text-gray-500 underline transition-colors hover:text-[#1a1a2e]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
