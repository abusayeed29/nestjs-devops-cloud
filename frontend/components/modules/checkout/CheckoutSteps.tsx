interface CheckoutStepsProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "Payment" },
  { number: 2, title: "Processing" },
  { number: 3, title: "Complete" },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "24px 0 32px" }}>
      {steps.map((step, index) => (
        <div key={step.number} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: currentStep >= step.number ? "#3c50e0" : "#e5e7eb",
              color: currentStep >= step.number ? "#fff" : "#9ca3af",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: 700, transition: "all 0.2s"
            }}>
              {currentStep > step.number ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              ) : step.number}
            </div>
            <span style={{ fontSize: "12px", fontWeight: 600, color: currentStep >= step.number ? "#3c50e0" : "#9ca3af" }}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div style={{ width: "80px", height: "2px", background: currentStep > step.number ? "#3c50e0" : "#e5e7eb", margin: "0 8px 20px", transition: "background 0.2s" }} />
          )}
        </div>
      ))}
    </div>
  );
}
