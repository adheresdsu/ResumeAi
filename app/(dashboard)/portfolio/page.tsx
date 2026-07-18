import type { Metadata } from "next";
import { Globe } from "lucide-react";

import { EmptyState } from "@/components/dashboard/empty-state";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <div className="grid gap-6">
      <Reveal className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">
            Turn a resume into a shareable portfolio site.
          </p>
        </div>
        <Button disabled>Create portfolio</Button>
      </Reveal>
      <EmptyState
        icon={<Globe />}
        title="No portfolio yet"
        description="One-click portfolio sites are coming in a later phase. Check back soon."
      />
    </div>
  );
}
