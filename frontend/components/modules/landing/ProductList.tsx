"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";

export function ProductList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 12;

  const { products, meta, isLoading, getProducts, error } = useProducts();

  useEffect(() => {
    getProducts({ page, limit, search: debouncedSearch });
  }, [page, limit, debouncedSearch, getProducts]);

  // Debounce search input
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);

      // Reset to page 1 when searching
      setPage(1);

      // Simple debounce with timeout
      setTimeout(() => {
        setDebouncedSearch(value);
      }, 500);
    },
    []
  );

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (meta && page < meta.totalPages) setPage(page + 1);
  };

  if (error) {
    return (
      <section className="w-full py-12 px-4 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16 px-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            Failed to load products. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-4 min-h-[60vh]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2 tracking-tight">
            Our Products
          </h2>
          <p className="text-gray-500 text-base">
            Discover our curated collection of premium products
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="w-full max-w-[500px] px-4 py-3 border border-[#e5e5e5] rounded-md text-sm outline-none transition-colors focus:border-[#3c50e0]"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-16 px-4 text-gray-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 px-4 text-gray-400">
            {debouncedSearch
              ? `No products found for "${debouncedSearch}"`
              : "No products available"}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-[#e5e5e5] rounded hover:border-[#3c50e0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-500">
                  Page {page} of {meta.totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page >= meta.totalPages}
                  className="px-4 py-2 bg-white border border-[#e5e5e5] rounded hover:border-[#3c50e0] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
