import { LoginForm } from "@/components/modules/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `Login - StoreFront`,
    description: `StoreFront - Store`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
