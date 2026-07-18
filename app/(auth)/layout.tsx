import Link from "next/link";

import { AuthCard } from "@/components/auth/auth-card";
import { AuthVisualPanel } from "@/components/auth/auth-visual-panel";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative flex flex-col items-center justify-center px-4 py-12 sm:px-6">
        <Link href="/" className="mb-8 text-lg font-semibold tracking-tight">
          Resume<span className="text-gradient-accent">AI</span>
        </Link>
        <AuthCard>{children}</AuthCard>
      </div>
      <AuthVisualPanel />
    </div>
  );
}
