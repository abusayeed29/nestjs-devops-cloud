import { apiClient } from "./axios.config";
import type {
  ProductsResponse,
  ProductQueryParams,
  Product,
  CreateProductRequest,
} from "@/types/product.types";

export class ProductService {
  private static readonly ENDPOINT = "/products";

  private static sanitizeProductPayload(data: Partial<CreateProductRequest>) {
    const payload = {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      sku: data.sku,
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
      isActive: data.isActive,
    };

    return Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== undefined),
    );
  }

  static async getProducts(params?: ProductQueryParams): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(this.ENDPOINT, { params });
    return response.data;
  }

  static async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`${this.ENDPOINT}/${id}`);
    return response.data;
  }

  static async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get<Product>(`${this.ENDPOINT}/slug/${slug}`);
    return response.data;
  }

  static async searchProducts(query: string, page = 1, limit = 12): Promise<ProductsResponse> {
    return this.getProducts({ search: query, page, limit });
  }

  static async createProduct(data: CreateProductRequest): Promise<Product> {
    const response = await apiClient.post<Product>(
      this.ENDPOINT,
      this.sanitizeProductPayload(data),
    );
    return response.data;
  }

  static async updateProduct(id: string, data: Partial<CreateProductRequest>): Promise<Product> {
    const response = await apiClient.patch<Product>(
      `${this.ENDPOINT}/${id}`,
      this.sanitizeProductPayload(data),
    );
    return response.data;
  }

  static async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`${this.ENDPOINT}/${id}`);
  }
}
