import styles from "./checkout.module.scss"

interface CheckoutStepsProps {
  currentStep: number
}

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { number: 1, title: "Payment" },
    { number: 2, title: "Processing" },
    { number: 3, title: "Complete" },
  ]

  return (
    <div className={styles.steps}>
      {steps.map((step, index) => (
        <div key={step.number} className={styles.stepWrapper}>
          <div
            className={`${styles.step} ${currentStep >= step.number ? styles.stepActive : ""} ${
              currentStep > step.number ? styles.stepCompleted : ""
            }`}
          >
            <div className={styles.stepNumber}>
              {currentStep > step.number ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span className={styles.stepTitle}>{step.title}</span>
          </div>
          {index < steps.length - 1 && <div className={styles.stepLine}></div>}
        </div>
      ))}
    </div>
  )
}
