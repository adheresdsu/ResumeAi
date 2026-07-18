import Link from "next/link";

import { NavLinks } from "@/components/dashboard/nav-links";

export function DashboardSidebar() {
  return (
    <aside className="bg-sidebar relative hidden w-64 shrink-0 border-r md:flex md:flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-40"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, var(--accent-violet-soft), transparent)",
        }}
      />
      <div className="relative flex h-16 items-center px-6">
        <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
          Resume<span className="text-gradient-accent">AI</span>
        </Link>
      </div>
      <div className="relative flex-1 px-3 py-2">
        <NavLinks />
      </div>
    </aside>
  );
}
