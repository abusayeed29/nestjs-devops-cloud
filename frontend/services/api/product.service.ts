import { apiClient } from "./axios.config";
import type {
  ProductsResponse,
  ProductQueryParams,
  Product,
} from "@/types/product.types";

// Product service following MVC pattern
export class ProductService {
  private static readonly ENDPOINT = "/products";

  // Fetch products with pagination and filters
  static async getProducts(
    params?: ProductQueryParams
  ): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(this.ENDPOINT, {
      params,
    });
    return response.data;
  }

  // Fetch single product by slug or id
  static async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get<Product>(`${this.ENDPOINT}/${slug}`);
    return response.data;
  }

  // Search products
  static async searchProducts(
    query: string,
    page = 1,
    limit = 12
  ): Promise<ProductsResponse> {
    return this.getProducts({ search: query, page, limit });
  }
}
