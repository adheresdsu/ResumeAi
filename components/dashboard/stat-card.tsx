"use client";

import type { ReactNode } from "react";

import { SpotlightCard } from "@/components/motion/spotlight-card";
import { useCountUp } from "@/components/motion/use-count-up";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  const displayValue = useCountUp(value);

  return (
    <SpotlightCard>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {label}
        </CardTitle>
        <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tabular-nums">{displayValue}</p>
      </CardContent>
    </SpotlightCard>
  );
}
