import { apiClient } from "./axios.config";
import type {
  CreateOrderRequest,
  OrderResponse,
  PaginatedAdminOrdersResponse,
  PaginatedOrdersResponse,
  UpdateOrderStatusResponse,
} from "@/types/order.types";

export const OrderService = {
  createOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
    const response = await apiClient.post<OrderResponse>("/orders", data);
    return response.data;
  },

  getOrder: async (orderId: string): Promise<OrderResponse> => {
    const response = await apiClient.get<OrderResponse>(`/orders/${orderId}`);
    return response.data;
  },

  getUserOrders: async (
    page = 1,
    limit = 10
  ): Promise<PaginatedOrdersResponse> => {
    const response = await apiClient.get<PaginatedOrdersResponse>("/orders", {
      params: { page, limit },
    });
    return response.data;
  },
  getAllOrders: async (
    page = 1,
    limit = 10
  ): Promise<PaginatedAdminOrdersResponse> => {
    const response = await apiClient.get<PaginatedAdminOrdersResponse>(
      "/orders/admin/all",
      {
        params: { page, limit },
      }
    );
    console.log("data__", response);
    return response.data;
  },

  updateOrderStatus: async (
    orderId: string,
    status: string
  ): Promise<UpdateOrderStatusResponse> => {
    const response = await apiClient.patch<UpdateOrderStatusResponse>(
      `/orders/admin/${orderId}`,
      { status }
    );
    return response.data;
  },
};

export type { CreateOrderRequest, OrderResponse };
