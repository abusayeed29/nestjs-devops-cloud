import styles from "./checkout.module.scss"

export function CheckoutHeader() {
  return (
    <div className={styles.header}>
      <h1>Checkout</h1>
      <p>Complete your purchase</p>
    </div>
  )
}
