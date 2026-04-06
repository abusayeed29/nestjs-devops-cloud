"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { OrderDetailModal } from "./OrderDetailModal";
import type { AdminOrderDetail } from "@/types/order.types";
import styles from "./admin-orders.module.scss";

export function AdminOrdersClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { getAllOrders, adminOrders, pagination, isLoading } = useOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderDetail | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadOrders = useCallback(
    async (page: number) => {
      await getAllOrders(page, 10);
    },
    [getAllOrders]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (user?.role !== "ADMIN") {
      router.push("/user");
      return;
    }

    loadOrders(currentPage);
  }, [isAuthenticated, user, currentPage, router, loadOrders]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewOrder = (order: AdminOrderDetail) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusUpdate = async () => {
    await loadOrders(currentPage);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return styles.statusPending;
      case "PROCESSING":
        return styles.statusProcessing;
      case "COMPLETED":
        return styles.statusCompleted;
      case "CANCELLED":
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  const filteredOrders = searchParams.get("status")
    ? adminOrders.filter((o) => o.status === searchParams.get("status"))
    : adminOrders;

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className={styles.ordersPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Manage Orders</h1>
          <button
            onClick={() => router.push("/admin")}
            className={styles.backButton}
          >
            Back to Dashboard
          </button>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className={styles.empty}>
            <p>No orders found</p>
          </div>
        ) : (
          <>
            <div className={styles.ordersTable}>
              <div className={styles.tableHeader}>
                <div className={styles.col}>Order ID</div>
                <div className={styles.col}>Customer</div>
                <div className={styles.col}>Items</div>
                <div className={styles.col}>Total</div>
                <div className={styles.col}>Status</div>
                <div className={styles.col}>Date</div>
                <div className={styles.col}>Actions</div>
              </div>

              {filteredOrders.map((order) => (
                <div key={order.id} className={styles.tableRow}>
                  <div className={styles.col}>
                    <span className={styles.orderId}>
                      {order.id.slice(0, 8)}...
                    </span>
                  </div>
                  <div className={styles.col}>
                    <div className={styles.customerInfo}>
                      <span className={styles.customerName}>
                        {order.userName}
                      </span>
                      <span className={styles.customerEmail}>
                        {order.userEmail}
                      </span>
                    </div>
                  </div>
                  <div className={styles.col}>{order.items.length} items</div>
                  <div className={styles.col}>
                    <span className={styles.total}>
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.col}>
                    <span
                      className={`${styles.status} ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className={styles.col}>
                    <span className={styles.date}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.col}>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className={styles.viewButton}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  Previous
                </button>
                <span className={styles.pageInfo}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}
