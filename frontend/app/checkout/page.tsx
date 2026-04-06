import { CheckoutClient } from "@/components/modules/checkout/CheckoutClient";

export default function CheckoutPage() {
  return <CheckoutClient />;
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Checkout - StoreFront`,
    description: `StoreFront - Store`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
