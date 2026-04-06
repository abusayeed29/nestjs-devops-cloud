import React from "react";
import StateProvider from "./state-provider";
// import { SentryProvider } from "./sentry-provider.tsx";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <StateProvider>{children}</StateProvider>;
}
