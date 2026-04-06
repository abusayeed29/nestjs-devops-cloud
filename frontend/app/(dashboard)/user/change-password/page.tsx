import { ChangePasswordClient } from "@/components/modules/dashboard/ChangePasswordClient";

export default function ChangePasswordPage() {
  return <ChangePasswordClient />;
}

export function generateMetadata() {
  return {
    title: "Change Password - StoreFront",
    description: "Update your account password",
  };
}
