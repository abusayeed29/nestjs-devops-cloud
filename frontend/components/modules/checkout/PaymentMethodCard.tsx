"use client"

import type React from "react"
import { motion } from "framer-motion"
import styles from "./payment-method-card.module.scss"

interface PaymentMethodCardProps {
  method: string
  selectedMethod: string
  onSelect: (method: string) => void
  icon: React.ReactNode
  title: string
  description?: string
  children?: React.ReactNode
}

export function PaymentMethodCard({
  method,
  selectedMethod,
  onSelect,
  icon,
  title,
  description,
  children,
}: PaymentMethodCardProps) {
  const isSelected = selectedMethod === method

  return (
    <div className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`} onClick={() => onSelect(method)}>
      <div className={styles.cardHeader}>
        <div className={styles.radio}>{isSelected && <div className={styles.radioChecked} />}</div>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.info}>
          <h4 className={styles.title}>{title}</h4>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {method === "stripe" && (
          <div className={styles.cardLogos}>
            <div className={styles.visa} />
            <div className={styles.mastercard} />
            <div className={styles.amex} />
          </div>
        )}
      </div>

      {isSelected && children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className={styles.cardContent}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}
