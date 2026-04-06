import { apiClient } from "./axios.config";
import type { Category, CategoriesResponse } from "@/types/category.types";

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  slug?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  slug?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export class CategoryService {
  private static readonly ENDPOINT = "/categories";

  static async getCategories(params?: { page?: number; limit?: number; search?: string }): Promise<CategoriesResponse> {
    const response = await apiClient.get<CategoriesResponse>(this.ENDPOINT, { params });
    return response.data;
  }

  static async getCategoryById(id: string): Promise<Category> {
    const response = await apiClient.get<Category>(`${this.ENDPOINT}/${id}`);
    return response.data;
  }

  static async createCategory(data: CreateCategoryRequest): Promise<Category> {
    const response = await apiClient.post<Category>(this.ENDPOINT, data);
    return response.data;
  }

  static async updateCategory(id: string, data: UpdateCategoryRequest): Promise<Category> {
    const response = await apiClient.patch<Category>(`${this.ENDPOINT}/${id}`, data);
    return response.data;
  }

  static async deleteCategory(id: string): Promise<void> {
    await apiClient.delete(`${this.ENDPOINT}/${id}`);
  }
}
