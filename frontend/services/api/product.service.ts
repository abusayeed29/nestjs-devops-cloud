import { apiClient } from "./axios.config";
import type {
  ProductsResponse,
  ProductQueryParams,
  Product,
  CreateProductRequest,
} from "@/types/product.types";

export class ProductService {
  private static readonly ENDPOINT = "/products";

  static async getProducts(params?: ProductQueryParams): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(this.ENDPOINT, { params });
    return response.data;
  }

  static async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get<Product>(`${this.ENDPOINT}/${slug}`);
    return response.data;
  }

  static async searchProducts(query: string, page = 1, limit = 12): Promise<ProductsResponse> {
    return this.getProducts({ search: query, page, limit });
  }

  static async createProduct(data: CreateProductRequest): Promise<Product> {
    const response = await apiClient.post<Product>(this.ENDPOINT, data);
    return response.data;
  }

  static async updateProduct(id: string, data: Partial<CreateProductRequest>): Promise<Product> {
    const response = await apiClient.patch<Product>(`${this.ENDPOINT}/${id}`, data);
    return response.data;
  }

  static async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`${this.ENDPOINT}/${id}`);
  }
}