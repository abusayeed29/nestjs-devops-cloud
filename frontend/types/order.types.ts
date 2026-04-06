export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: string;
}

export interface Order {
  id: string;
  userId: string;
  cartItems: OrderItem[];
  shippingAddress: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  success: boolean;
  data: Order;
  message?: string;
}

export interface OrderItemDetail {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetail {
  id: string;
  userId: string;
  status: string;
  total: number;
  shippingAddress: string;
  items: OrderItemDetail[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedOrdersResponse {
  data: OrderDetail[];
  total: number;
  page: number;
  limit: number;
}
export interface AdminOrderDetail {
  id: string;
  userId: string;
  status: string;
  total: number;
  shippingAddress: string;
  items: OrderItemDetail[];
  userEmail: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedAdminOrdersResponse {
  data: AdminOrderDetail[];
  total: number;
  page: number;
  limit: number;
}
export interface UpdateOrderStatusRequest {
  status: string;
}

export interface UpdateOrderStatusResponse {
  success: boolean;
  data: AdminOrderDetail;
  message?: string;
}
