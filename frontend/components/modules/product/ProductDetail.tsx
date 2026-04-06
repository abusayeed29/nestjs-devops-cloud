"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product.types";
import { useCart } from "@/hooks/useCart";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart } = useCart();
  const isInStock = product.stock > 0;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (isInStock) {
      addProductToCart({
        ...product,
        quantity: quantity,
      });
      // Optional: Reset quantity after adding
      setQuantity(1);
      // Optional: Show success message
      alert(`Added ${quantity} ${product.name} to cart!`);
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden">
            <Image
              src={
                product.imageUrl.trimEnd() ||
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80" ||
                "/placeholder.svg"
              }
              alt={product.name}
              width={600}
              height={600}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <span className="inline-block text-sm text-gray-500 uppercase tracking-wide">
              {product.categoryId}
            </span>

            <h1 className="text-2xl font-bold text-[#1a1a2e] m-0">
              {product.name}
            </h1>

            <p className="text-3xl font-semibold text-[#1a1a2e]">
              ${product.price.toFixed(2)}
            </p>

            <span
              className={`inline-flex items-center gap-2 text-sm font-medium before:content-[''] before:block before:w-2 before:h-2 before:rounded-full before:bg-current ${
                isInStock ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {isInStock
                ? `${product.stock} available in stock`
                : "Out of stock"}
            </span>

            <hr className="h-px bg-[#e5e7eb] border-none" />

            <p className="text-base leading-relaxed text-gray-500">
              {product.description}
            </p>

            <hr className="h-px bg-[#e5e7eb] border-none" />

            {isInStock && (
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-[#1a1a2e]">
                  Quantity
                </label>
                <div className="flex items-center gap-4 w-fit">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 border border-[#d1d5db] bg-white rounded-md text-xl font-semibold text-[#1a1a2e] cursor-pointer transition-all hover:bg-gray-50 hover:border-[#1a1a2e] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="min-w-[3rem] text-center text-lg font-semibold text-[#1a1a2e]">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                    className="w-10 h-10 border border-[#d1d5db] bg-white rounded-md text-xl font-semibold text-[#1a1a2e] cursor-pointer transition-all hover:bg-gray-50 hover:border-[#1a1a2e] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="w-full py-4 px-8 bg-[#3c50e0] text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-[#2f40c8] hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </button>

            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
