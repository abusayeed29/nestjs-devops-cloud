"use client";

import { useState, useCallback } from "react";
import type { Category, CategoriesResponse } from "@/types/category.types";
import { CategoryService, type CreateCategoryRequest, type UpdateCategoryRequest } from "@/services/api/category.service";

export function useCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [meta, setMeta] = useState<CategoriesResponse['meta']>({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategories = useCallback(async (params?: { page?: number; limit?: number; search?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await CategoryService.getCategories(params);
      setCategories(res.data);
      setMeta(res.meta);
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoryById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const cat = await CategoryService.getCategoryById(id);
      setCategory(cat);
      return cat;
    } catch {
      setError("Failed to load category");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (data: CreateCategoryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await CategoryService.createCategory(data);
      setCategories(prev => [newCategory, ...prev]);
      return newCategory;
    } catch {
      setError("Failed to create category");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id: string, data: UpdateCategoryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await CategoryService.updateCategory(id, data);
      setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
      setCategory(updatedCategory);
      return updatedCategory;
    } catch {
      setError("Failed to update category");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await CategoryService.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch {
      setError("Failed to delete category");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    category,
    meta,
    isLoading,
    error,
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  };
}
