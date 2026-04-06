import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/modules/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

export function generateMetadata() {
  return {
    title: "Reset Password - StoreFront",
    description: "Set a new password for your StoreFront account",
  };
}
