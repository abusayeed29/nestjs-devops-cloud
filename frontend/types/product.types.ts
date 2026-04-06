// Product entity type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  imageUrl: string;
  categoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  quantity: number;
}

export interface ProductCart {
  productId: string;
  quantity: number;
}

// API response pagination metadata
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API response for products list
export interface ProductsResponse {
  data: Product[];
  meta: PaginationMeta;
}

// Product query parameters
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}
