import { apiClient } from "./axios.config";
import type { Category, CategoriesResponse } from "@/types/category.types";

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
}
