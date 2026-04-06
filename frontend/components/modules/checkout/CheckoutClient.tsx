"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { usePayment } from "@/hooks/usePayment";
import { CheckoutHeader } from "./CheckoutHeader";
import { CheckoutSteps } from "./CheckoutSteps";
import {
  StripePaymentProvider,
  StripePaymentForm,
} from "./stripe-payment-form";
import styles from "./checkout.module.scss";
import type { OrderItem } from "@/types/order.types";
import { CreditCard } from "lucide-react";
import { PaymentMethodCard } from "./PaymentMethodCard";

type Step = 1 | 2 | 3;

export function CheckoutClient() {
  const router = useRouter();
  const { items, totalPrice, clearAllCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { createOrder } = useOrder();
  const { createPaymentIntent, paymentId, clientSecret, confirmPayment } =
    usePayment();

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/checkout");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (items.length === 0 && !orderId) {
      router.push("/cart");
    }
  }, [items, orderId, router]);

  useEffect(() => {
    const createOrderAutomatically = async () => {
      if (selectedPayment && !orderId && !isCreatingOrder && !clientSecret) {
        setIsCreatingOrder(true);
        setStripeError(null);

        try {
          // Create order with cart items
          const cartItems: OrderItem[] = items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          }));

          const order = await createOrder({
            items: cartItems,
            shippingAddress:
              "Emily Johnson 1258 Market Street, Apt 4B San Francisco, CA 94103 United States",
          });

          if (!order) {
            throw new Error("Failed to create order");
          }

          setOrderId(order.id);

          // Create payment intent for Stripe
          if (selectedPayment === "stripe") {
            const paymentCreated = await createPaymentIntent({
              orderId: order.id,
              amount: totalPrice,
              description: "Order payment for e-commerce purchase",
              currency: "usd",
            });

            if (!paymentCreated) {
              throw new Error("Failed to create payment intent");
            }
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to process order";
          setStripeError(errorMessage);
          console.error("[v0] Order creation error:", error);
        } finally {
          setIsCreatingOrder(false);
        }
      }
    };

    createOrderAutomatically();
  }, [
    selectedPayment,
    orderId,
    isCreatingOrder,
    clientSecret,
    items,
    createOrder,
    createPaymentIntent,
    totalPrice,
  ]);

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPayment(method);
    setStripeError(null);
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      setCurrentStep(3);

      // Confirm payment
      const confirmed = await confirmPayment({
        orderId,
        paymentIntentId,
      });

      if (!confirmed) {
        throw new Error("Failed to confirm payment");
      }

      // Clear cart after successful payment
      await clearAllCart();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to confirm payment";
      setStripeError(errorMessage);
      console.error("[v0] Payment confirmation error:", error);
    }
  };

  const handlePaymentError = (error: string) => {
    setStripeError(error);
    console.error("[v0] Payment error:", error);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <CheckoutHeader />

        <CheckoutSteps currentStep={currentStep} />

        <div className={styles.content}>
          {currentStep === 1 && (
            <div className={styles.stepContent}>
              <h2>Select Payment Method</h2>

              <div className={styles.paymentMethods}>
                {/* Stripe Payment Method Card */}
                <PaymentMethodCard
                  method="stripe"
                  selectedMethod={selectedPayment}
                  onSelect={handlePaymentMethodSelect}
                  icon={<CreditCard />}
                  title="Credit / Debit Card"
                  description="Pay securely with Stripe"
                >
                  {stripeError && (
                    <div className={styles.errorMessage}>{stripeError}</div>
                  )}

                  {isCreatingOrder && !clientSecret && (
                    <div className={styles.loadingContainer}>
                      <div className={styles.spinner}></div>
                      <span className={styles.loadingText}>
                        Creating your order...
                      </span>
                    </div>
                  )}

                  {clientSecret && (
                    <StripePaymentProvider
                      clientSecret={clientSecret}
                      amount={totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    >
                      <StripePaymentForm
                        amount={totalPrice}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                      />
                    </StripePaymentProvider>
                  )}
                </PaymentMethodCard>

                {/* Other payment methods can be added here */}
              </div>

              <div className={styles.summary}>
                <h3>Order Summary</h3>
                <div className={styles.summaryRow}>
                  <span>Items ({items.length})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className={styles.stepContent}>
              <div className={styles.success}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.successIcon}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <h2>Order Placed Successfully!</h2>
                <p>Your order #{orderId} has been confirmed.</p>
                <p className={styles.shippingInfo}>
                  Shipping to:{" "}
                  <strong>
                    Emily Johnson 1258 Market Street, Apt 4B San Francisco, CA
                    94103 United States
                  </strong>
                </p>
                <button
                  onClick={() => router.push("/user/orders")}
                  className={styles.continueButton}
                >
                  Go to my orders
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
