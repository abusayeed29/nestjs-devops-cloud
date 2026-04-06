import type { Product } from "./product.types";

// Cart item with quantity
export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

// Cart state
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface BackendCartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  cartItems: CartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt: string; // or Date
  updatedAt: string; // or Date
}
