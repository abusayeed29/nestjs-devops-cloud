"use client";

import { useState, useCallback } from "react";
import type { Category } from "@/types/category.types";
import { CategoryService } from "@/services/api/category.service";

export function useCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategories = useCallback(async (limit = 50) => {
    setLoading(true);
    setError(null);
    try {
      const res = await CategoryService.getCategories({ page: 1, limit });
      setCategories(res.data.filter((c) => c.isActive));
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  return { categories, isLoading, error, getCategories };
}
