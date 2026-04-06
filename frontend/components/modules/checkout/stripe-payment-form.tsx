"use client";

import type React from "react";
import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import {
  loadStripe,
  StripeElementsOptions,
  type Appearance,
} from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";

import styles from "./stripe-payment-form.module.scss";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripePaymentProviderProps {
  clientSecret: string;
  amount: number;
  onSuccess: (paymentIntent: string) => void;
  onError: (error: string) => void;
  children: React.ReactNode;
}

interface StripePaymentFormProps {
  amount: number;
  onSuccess: (paymentIntent: string) => void;
  onError: (error: string) => void;
}

// Wrapper component that provides the Stripe context
export function StripePaymentProvider({
  clientSecret,
  children,
}: StripePaymentProviderProps) {
  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0F172A",
      colorBackground: "#ffffff",
      colorText: "#1e293b",
      colorDanger: "#ef4444",
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "6px",
    },
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}

export function StripePaymentForm({
  amount,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred with your payment");
        onError(error.message || "Payment failed");
        alert("Payment Failed");
      } else if (paymentIntent?.status === "succeeded") {
        alert(`Payment Successful. Amount: $${amount.toFixed(2)}`);
        onSuccess(paymentIntent.id);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("An unexpected error occurred");
      onError("Unexpected error");
      alert("Payment Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <PaymentElement />

      <div className={styles.submitContainer}>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className={styles.submitButton}
        >
          {isLoading ? (
            <>
              <Loader2 className={styles.spinner} />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </button>
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </form>
  );
}
