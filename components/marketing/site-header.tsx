import Link from "next/link";

import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#preview", label: "Product" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="glass-panel sticky top-0 z-20 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Resume<span className="text-gradient-accent">AI</span>
        </Link>
        <nav className="text-muted-foreground hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Sign in
          </Button>
          <Magnetic strength={0.3}>
            <Button size="sm" nativeButton={false} render={<Link href="/signup" />}>
              Get started
            </Button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
