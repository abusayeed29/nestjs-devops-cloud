import { RegisterForm } from "@/components/modules/auth/RegisterForm";

export default function RegisterPage() {
  return <RegisterForm />;
}

export function generateMetadata() {
  return {
    title: "Create Account - StoreFront",
    description: "Sign up for a StoreFront account",
  };
}
