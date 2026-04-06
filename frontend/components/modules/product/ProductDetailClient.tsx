"use client";

import { useProducts } from "@/hooks/useProducts";
import { Breadcrumbs } from "./Breadcrumbs";
import { ProductDetail } from "./ProductDetail";
import { SimilarProducts } from "./SimilarProducts";
import { useEffect } from "react";

interface ProductDetailClientProps {
  productId: string;
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { product, getProduct, isLoading, error } = useProducts();

  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, [productId, getProduct]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <p className="text-lg text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">
            Product Not Found
          </h2>
          <p className="text-base text-gray-500">
            The product you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs productName={product.name} />
      <ProductDetail product={product} />
      <SimilarProducts
        category={product.categoryId}
        currentProductId={product.id}
      />
    </>
  );
}
