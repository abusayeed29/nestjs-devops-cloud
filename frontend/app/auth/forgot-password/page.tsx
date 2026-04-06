import { ForgotPasswordForm } from "@/components/modules/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}

export function generateMetadata() {
  return {
    title: "Forgot Password - StoreFront",
    description: "Reset your StoreFront account password",
  };
}
