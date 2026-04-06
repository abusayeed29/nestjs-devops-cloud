"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import styles from "./admin-dashboard.module.scss";
import { CheckCheck, TractorIcon } from "lucide-react";

export function AdminDashboardClient() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { getAllOrders, isLoading } = useOrder();
  const [stats, setStats] = useState({
    totalOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (user?.role !== "ADMIN") {
      router.push("/user");
      return;
    }
    const loadDashboardData = async () => {
      const response = await getAllOrders(1, 100);

      console.log(response);
      if (response) {
        const processing = response.data.filter(
          (o) => o.status === "PROCESSING"
        ).length;
        const shipped = response.data.filter(
          (o) => o.status === "SHIPPED"
        ).length;
        const pending = response.data.filter(
          (o) => o.status === "PENDING"
        ).length;
        const delivered = response.data.filter(
          (o) => o.status === "DELIVERED"
        ).length;

        setStats({
          totalOrders: response.total,
          processingOrders: processing,
          shippedOrders: shipped,
          pendingOrders: pending,
          deliveredOrders: delivered,
        });
      }
    };
    loadDashboardData();
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <h1 className={styles.title}>Admin Dashboard</h1>

        {isLoading ? (
          <div className={styles.loading}>Loading dashboard data...</div>
        ) : (
          <div className={styles.cardsGrid}>
            <div
              className={styles.card}
              onClick={() => router.push("/admin/orders")}
            >
              <div className={styles.cardIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>Total Orders</p>
                <h2 className={styles.cardValue}>{stats.totalOrders}</h2>
              </div>
            </div>

            <div
              className={styles.card}
              onClick={() => router.push("/admin/orders?status=PENDING")}
            >
              <div className={`${styles.cardIcon} ${styles.pendingIcon}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>Pending Orders</p>
                <h2 className={styles.cardValue}>{stats.pendingOrders}</h2>
              </div>
            </div>

            <div
              className={styles.card}
              onClick={() => router.push("/admin/orders?status=PROCESSING")}
            >
              <div className={`${styles.cardIcon} ${styles.processingIcon}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>Processing Orders</p>
                <h2 className={styles.cardValue}>{stats.processingOrders}</h2>
              </div>
            </div>

            <div
              className={styles.card}
              onClick={() => router.push("/admin/orders?status=SHIPPED")}
            >
              <div className={`${styles.cardIcon} ${styles.completedIcon}`}>
                <TractorIcon />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>Shipped Orders</p>
                <h2 className={styles.cardValue}>{stats.shippedOrders}</h2>
              </div>
            </div>

            <div
              className={styles.card}
              onClick={() => router.push("/admin/orders?status=DELIVERED")}
            >
              <div className={`${styles.cardIcon} ${styles.completedIcon}`}>
                <CheckCheck />
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardTitle}>Delivered Orders</p>
                <h2 className={styles.cardValue}>{stats.deliveredOrders}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
