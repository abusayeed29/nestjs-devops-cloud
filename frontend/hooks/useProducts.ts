"use client";

import { useState, useCallback } from "react";
import type {
  ProductsResponse,
  ProductQueryParams,
  Product,
} from "@/types/product.types";
import { ProductService } from "@/services/api/product.service";

// ------------------------------------------------------
// Custom hook for products (NO SWR, same style as useOrder)
// ------------------------------------------------------

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const [product, setProduct] = useState<Product | null>(null);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------------------------------
  // GET PRODUCT LIST (paginated or filtered)
  // ------------------------------------------------------
  const getProducts = useCallback(
    async (params?: ProductQueryParams): Promise<ProductsResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await ProductService.getProducts(params);

        setProducts(response.data);
        setMeta(response.meta);

        return response;
      } catch (err) {
        const message = "Failed to load products";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ------------------------------------------------------
  // GET SINGLE PRODUCT BY SLUG
  // ------------------------------------------------------
  const getProduct = useCallback(
    async (slug: string): Promise<Product | null> => {
      if (!slug) return null;

      setLoading(true);
      setError(null);

      try {
        const response = await ProductService.getProductBySlug(slug);

        if (response) {
          setProduct(response);
          return response;
        }

        throw new Error("Product not found");
      } catch (err) {
        const message = "Failed to load product";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    // state
    products,
    product,
    meta,
    isLoading,
    error,

    // methods
    getProducts,
    getProduct,
  };
}
