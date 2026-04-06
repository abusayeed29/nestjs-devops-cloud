"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { usePayment } from "@/hooks/usePayment";
import { CheckoutHeader } from "./CheckoutHeader";
import { CheckoutSteps } from "./CheckoutSteps";
import { StripePaymentProvider, StripePaymentForm } from "./stripe-payment-form";
import type { OrderItem } from "@/types/order.types";
import { CreditCard } from "lucide-react";
import { PaymentMethodCard } from "./PaymentMethodCard";

type Step = 1 | 2 | 3;

export function CheckoutClient() {
  const router = useRouter();
  const { items, totalPrice, clearAllCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { createOrder } = useOrder();
  const { createPaymentIntent, clientSecret, confirmPayment } = usePayment();

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.push("/auth/login?redirect=/checkout");
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (items.length === 0 && !orderId) router.push("/cart");
  }, [items, orderId, router]);

  useEffect(() => {
    const createOrderAutomatically = async () => {
      if (selectedPayment && !orderId && !isCreatingOrder && !clientSecret) {
        setIsCreatingOrder(true);
        setStripeError(null);
        try {
          const cartItems: OrderItem[] = items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          }));
          const order = await createOrder({ items: cartItems, shippingAddress: "Emily Johnson 1258 Market Street, Apt 4B San Francisco, CA 94103 United States" });
          if (!order) throw new Error("Failed to create order");
          setOrderId(order.id);
          if (selectedPayment === "stripe") {
            const ok = await createPaymentIntent({ orderId: order.id, amount: totalPrice, description: "Order payment", currency: "usd" });
            if (!ok) throw new Error("Failed to create payment intent");
          }
        } catch (error) {
          setStripeError(error instanceof Error ? error.message : "Failed to process order");
        } finally {
          setIsCreatingOrder(false);
        }
      }
    };
    createOrderAutomatically();
  }, [selectedPayment, orderId, isCreatingOrder, clientSecret, items, createOrder, createPaymentIntent, totalPrice]);

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      setCurrentStep(3);
      const confirmed = await confirmPayment({ orderId, paymentIntentId });
      if (!confirmed) throw new Error("Failed to confirm payment");
      await clearAllCart();
    } catch (error) {
      setStripeError(error instanceof Error ? error.message : "Failed to confirm payment");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div style={{ background: "#f9fafb", minHeight: "calc(100vh - 100px)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>
        <CheckoutHeader />
        <CheckoutSteps currentStep={currentStep} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px", alignItems: "start" }}>

          {/* Left — payment */}
          <div>
            {currentStep === 1 && (
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "24px" }}>
                <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Select Payment Method</h2>

                <PaymentMethodCard
                  method="stripe"
                  selectedMethod={selectedPayment}
                  onSelect={(m) => { setSelectedPayment(m); setStripeError(null); }}
                  icon={<CreditCard size={20} />}
                  title="Credit / Debit Card"
                  description="Pay securely with Stripe"
                >
                  {stripeError && (
                    <div style={{ marginTop: "16px", padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", fontSize: "13px" }}>
                      {stripeError}
                    </div>
                  )}
                  {isCreatingOrder && !clientSecret && (
                    <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "10px", color: "#6b7280", fontSize: "13px" }}>
                      <svg className="animate-spin" width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Creating your order...
                    </div>
                  )}
                  {clientSecret && (
                    <div style={{ marginTop: "16px" }}>
                      <StripePaymentProvider clientSecret={clientSecret} amount={totalPrice} onSuccess={handlePaymentSuccess} onError={(e) => setStripeError(e)}>
                        <StripePaymentForm amount={totalPrice} onSuccess={handlePaymentSuccess} onError={(e) => setStripeError(e)} />
                      </StripePaymentProvider>
                    </div>
                  )}
                </PaymentMethodCard>
              </div>
            )}

            {currentStep === 3 && (
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "48px", textAlign: "center" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Order Placed Successfully!</h2>
                <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Your order #{orderId.slice(0, 8).toUpperCase()} has been confirmed.</p>
                <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "24px" }}>Shipping to: Emily Johnson, 1258 Market Street, San Francisco, CA</p>
                <button onClick={() => router.push("/user/orders")}
                  style={{ padding: "12px 28px", background: "#3c50e0", color: "#fff", borderRadius: "8px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  View My Orders
                </button>
              </div>
            )}
          </div>

          {/* Right — summary */}
          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "20px", position: "sticky", top: "90px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>Order Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              {items.map((item) => (
                <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                  <span style={{ color: "#374151" }}>{item.product.name} × {item.quantity}</span>
                  <span style={{ fontWeight: 600, color: "#111827" }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
              <span>Shipping</span><span style={{ color: "#16a34a", fontWeight: 600 }}>Free</span>
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "15px", fontWeight: 700, color: "#111827" }}>
              <span>Total</span><span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
