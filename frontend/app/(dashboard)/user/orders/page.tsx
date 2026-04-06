import { OrdersClient } from "@/components/modules/dashboard/OrdersClient";
import { Header } from "@/components/modules/landing/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and manage your orders",
};

export default function OrdersPage() {
  return (
    <>
      <Header></Header>
      <OrdersClient />;
    </>
  );
}
