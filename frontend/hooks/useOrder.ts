"use client";

import { useState, useCallback } from "react";
import { OrderService } from "@/services/api/order.service";
import type {
  CreateOrderRequest,
  Order,
  OrderDetail,
  PaginatedOrdersResponse,
  PaginatedAdminOrdersResponse,
  AdminOrderDetail,
} from "@/types/order.types";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { CartService } from "@/services/api/cart.service";

export function useOrder() {
  const [order, setOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<OrderDetail[]>([]); // user orders
  const [adminOrders, setAdminOrders] = useState<AdminOrderDetail[]>([]); // admin orders
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const guestCart = useSelector((state: IRootState) => state.cart.items);

  // -------------------------------------------
  // CREATE ORDER
  // -------------------------------------------
  const createOrder = useCallback(
    async (data: CreateOrderRequest): Promise<Order | null> => {
      setLoading(true);
      setError(null);
      try {
        if (guestCart.length > 0) {
          await CartService.mergeCart(
            guestCart.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
            }))
          );
        }

        const response = await OrderService.createOrder(data);

        if (response.data) {
          setOrder(response.data);
          return response.data;
        }
        throw new Error(response.message ?? "Failed to create order");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create order";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // -------------------------------------------
  // GET SPECIFIC ORDER
  // -------------------------------------------
  const getOrder = useCallback(
    async (orderId: string): Promise<Order | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await OrderService.getOrder(orderId);
        if (response.data) {
          setOrder(response.data);
          return response.data;
        }
        throw new Error(response.message || "Failed to get order");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to get order";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // -------------------------------------------
  // GET USER ORDERS (PAGINATED)
  // -------------------------------------------
  const getUserOrders = useCallback(
    async (page = 1, limit = 10): Promise<PaginatedOrdersResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await OrderService.getUserOrders(page, limit);

        setOrders(response.data);
        setPagination({
          total: response.total,
          page: response.page,
          limit: response.limit,
        });

        return response;
      } catch (err) {
        setError("Failed to get orders" + err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // -------------------------------------------
  // ADMIN — GET ALL ORDERS (PAGINATED)
  // -------------------------------------------
  const getAllOrders = useCallback(
    async (
      page = 1,
      limit = 10
    ): Promise<PaginatedAdminOrdersResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await OrderService.getAllOrders(page, limit);

        setAdminOrders(response.data);
        setPagination({ total: response.total, page: response.page, limit });

        return response;
      } catch (err) {
        const errorMessage = "Failed to get all orders" + err;
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setAdminOrders, setPagination]
  );

  // -------------------------------------------
  // ADMIN — UPDATE ORDER STATUS
  // -------------------------------------------
  const updateOrderStatus = useCallback(
    async (orderId: string, status: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        const response = await OrderService.updateOrderStatus(orderId, status);

        if (!response.success) {
          throw new Error(response.message || "Failed to update order status");
        }

        return true;
      } catch (err) {
        const errorMessage = "Failed to update order status" + err;
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    // states
    order,
    orders,
    adminOrders,
    pagination,
    isLoading,
    error,

    // user methods
    createOrder,
    getOrder,
    getUserOrders,

    // admin methods
    getAllOrders,
    updateOrderStatus,
  };
}
