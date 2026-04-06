"use client"

import styles from "./payment-method.module.scss"

interface PaymentMethodProps {
  selectedPayment: string
  onPaymentSelect: (method: string) => void
}

export function PaymentMethod({ selectedPayment, onPaymentSelect }: PaymentMethodProps) {
  const paymentMethods = [
    {
      id: "stripe",
      name: "Credit/Debit Card",
      icon: "💳",
      description: "Pay securely with Stripe",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "🅿️",
      description: "Pay with your PayPal account",
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: "🍎",
      description: "Pay with Apple Pay",
    },
  ]

  return (
    <div className={styles.container}>
      {paymentMethods.map((method) => (
        <button
          key={method.id}
          onClick={() => onPaymentSelect(method.id)}
          className={`${styles.method} ${selectedPayment === method.id ? styles.methodSelected : ""}`}
        >
          <div className={styles.methodIcon}>{method.icon}</div>
          <div className={styles.methodInfo}>
            <h4>{method.name}</h4>
            <p>{method.description}</p>
          </div>
          <div className={styles.methodRadio}>
            <div className={selectedPayment === method.id ? styles.radioChecked : ""}></div>
          </div>
        </button>
      ))}
    </div>
  )
}
