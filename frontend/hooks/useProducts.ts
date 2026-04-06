"use client";

import { useState, useCallback } from "react";
import type {
  ProductsResponse,
  ProductQueryParams,
  Product,
  CreateProductRequest,
} from "@/types/product.types";
import { ProductService } from "@/services/api/product.service";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = useCallback(async (params?: ProductQueryParams): Promise<ProductsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.getProducts(params);
      setProducts(response.data);
      setMeta(response.meta);
      return response;
    } catch {
      setError("Failed to load products");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProduct = useCallback(async (slug: string): Promise<Product | null> => {
    if (!slug) return null;
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.getProductBySlug(slug);
      if (response) { setProduct(response); return response; }
      throw new Error("Product not found");
    } catch {
      setError("Failed to load product");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id: string): Promise<Product | null> => {
    if (!id) return null;
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.getProductById(id);
      if (response) { setProduct(response); return response; }
      throw new Error("Product not found");
    } catch {
      setError("Failed to load product");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (data: CreateProductRequest): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.createProduct(data);
      return response;
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to create product");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: string, data: Partial<CreateProductRequest>): Promise<Product | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProductService.updateProduct(id, data);
      return response;
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to update product");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await ProductService.deleteProduct(id);
      return true;
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to delete product");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products, product, meta, isLoading, error,
    getProducts, getProduct, getProductById, createProduct, updateProduct, deleteProduct,
  };
}