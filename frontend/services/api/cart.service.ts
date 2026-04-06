import { apiClient } from "./axios.config";
import type { ProductCart } from "@/types/product.types";

export interface CartResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export class CartService {
  private static readonly ENDPOINT = "/cart";

  // Add item to cart
  static async addToCart(productData: ProductCart): Promise<CartResponse> {
    const response = await apiClient.post<CartResponse>(
      `${this.ENDPOINT}/items`,
      productData
    );
    return response.data;
  }

  // Get entire cart
  static async getCart(): Promise<CartResponse> {
    const response = await apiClient.get<CartResponse>(this.ENDPOINT);
    return response.data;
  }

  // Update quantity of a single cart item
  static async updateCartItem(
    productId: string,
    quantity: number
  ): Promise<CartResponse> {
    const response = await apiClient.patch<CartResponse>(
      `${this.ENDPOINT}/items/${productId}`,
      { quantity }
    );
    return response.data;
  }

  // Remove a specific item from the cart
  static async removeFromCart(productId: string): Promise<CartResponse> {
    const response = await apiClient.delete<CartResponse>(
      `${this.ENDPOINT}/items/${productId}`
    );
    return response.data;
  }

  // Clear entire cart
  static async clearCart(): Promise<CartResponse> {
    const response = await apiClient.delete<CartResponse>(this.ENDPOINT);
    return response.data;
  }

  // cart.service.ts
  static async mergeCart(localCart: ProductCart[]): Promise<CartResponse> {
    const response = await apiClient.post<CartResponse>(
      `${this.ENDPOINT}/merge`,
      { items: localCart }
    );
    return response.data;
  }
}
