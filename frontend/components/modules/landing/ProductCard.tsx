"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock > 0;

  // Generate slug from product id or name
  const id = product.id;

  return (
    <Link
      href={`/${id}`}
      className="flex flex-col bg-white rounded-xl shadow-sm border border-[#e8ecf0] overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={
            product.imageUrl.trimEnd() ??
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80"
          }
          alt={product.name}
          width={400}
          height={400}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          {product.categoryId}
        </span>
        <h3 className="text-base font-semibold text-[#1a1a2e] leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-auto pt-3">
          <span className="text-lg font-bold text-[#1a1a2e]">
            ${product.price.toFixed(2)}
          </span>
          <span
            className={`text-xs font-medium ${
              isInStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {isInStock ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </Link>
  );
}
