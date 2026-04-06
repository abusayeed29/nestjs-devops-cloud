// Product entity type
export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  quantity: number;
  sku: string;
  imageUrl: string;
  categoryId: string;
  isActive: boolean;
  tags?: string[];
  offers?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  sku?: string;
  imageUrl?: string;
  categoryId: string;
  tags?: string[];
  offers?: string[];
  isActive?: boolean;
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
