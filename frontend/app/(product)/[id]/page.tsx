import { Header } from "@/components/modules/landing/Header";
import { Footer } from "@/components/modules/landing/Footer";
import { ProductDetailClient } from "@/components/modules/product/ProductDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <Header />
      <ProductDetailClient productId={id} />
      <Footer />
    </>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Product - StoreFront`,
    description: `StoreFront - Store`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
