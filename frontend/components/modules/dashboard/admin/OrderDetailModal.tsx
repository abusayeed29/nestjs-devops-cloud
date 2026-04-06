"use client";

import { useState } from "react";
import { useOrder } from "@/hooks/useOrder";
import type { AdminOrderDetail } from "@/types/order.types";
import styles from "./order-detail-modal.module.scss";

interface OrderDetailModalProps {
  order: AdminOrderDetail;
  onClose: () => void;
  onStatusUpdate: () => void;
}

export function OrderDetailModal({
  order,
  onClose,
  onStatusUpdate,
}: OrderDetailModalProps) {
  const orderHook = useOrder();
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const statuses = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const handleStatusChange = async () => {
    if (selectedStatus === order.status) return;

    setIsUpdating(true);
    const success = await orderHook.updateOrderStatus(order.id, selectedStatus);
    setIsUpdating(false);

    if (success) {
      onStatusUpdate();
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Order Details</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.section}>
            <h3>Order Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Order ID:</span>
                <span className={styles.value}>{order.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Date:</span>
                <span className={styles.value}>
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Total:</span>
                <span className={styles.value}>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Customer Information</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Name:</span>
                <span className={styles.value}>{order.userName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{order.userEmail}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>User ID:</span>
                <span className={styles.value}>{order.userId}</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Shipping Address</h3>
            <p className={styles.address}>{order.shippingAddress}</p>
          </div>

          <div className={styles.section}>
            <h3>Order Items</h3>
            <div className={styles.itemsList}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.productName}</span>
                    <span className={styles.itemQuantity}>
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <div className={styles.itemPricing}>
                    <span className={styles.itemPrice}>
                      ${item.price.toFixed(2)} each
                    </span>
                    <span className={styles.itemSubtotal}>
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3>Update Status</h3>
            <div className={styles.statusUpdate}>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.statusSelect}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                onClick={handleStatusChange}
                disabled={isUpdating || selectedStatus === order.status}
                className={styles.updateButton}
              >
                {isUpdating ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
