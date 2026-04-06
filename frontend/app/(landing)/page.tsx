import { Header } from "@/components/modules/landing/Header";
import { ProductList } from "@/components/modules/landing/ProductList";
import { Footer } from "@/components/modules/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "60vh" }}>
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Home - StoreFront`,
    description: `StoreFront - Store`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
