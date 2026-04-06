import { Header } from "@/components/modules/landing/Header";
import { Footer } from "@/components/modules/landing/Footer";
import { CartClient } from "@/components/modules/cart/CartClient";

export default function CartPage() {
  return (
    <>
      <Header />
      <CartClient />
      <Footer />
    </>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Cart - StoreFront`,
    description: `StoreFront - Store`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
