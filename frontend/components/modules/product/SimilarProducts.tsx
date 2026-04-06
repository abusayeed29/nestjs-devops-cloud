"use client";

import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "../landing/ProductCard";

interface SimilarProductsProps {
  category: string;
  currentProductId: string;
}

export function SimilarProducts({
  category,
  currentProductId,
}: SimilarProductsProps) {
  const { products, isLoading, getProducts } = useProducts();

  // Fetch similar products when category changes
  useEffect(() => {
    if (category) {
      getProducts({ category, limit: 8 });
    }
  }, [category, getProducts]);

  // Filter out the current product and take only 4
  const similarProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#eff4fb]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 text-gray-500">
            Loading similar products...
          </div>
        </div>
      </section>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-[#eff4fb]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">
            Similar Products
          </h2>
          <p className="text-base text-gray-500">
            You might also like these products
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
