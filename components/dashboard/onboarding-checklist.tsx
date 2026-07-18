"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

export interface OnboardingStep {
  label: string;
  description: string;
  href: string;
  done: boolean;
}

export function OnboardingChecklist({ steps }: { steps: OnboardingStep[] }) {
  const completed = steps.filter((s) => s.done).length;
  const percent = Math.round((completed / steps.length) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Get set up</CardTitle>
          <span className="text-muted-foreground text-sm">
            {completed}/{steps.length} complete
          </span>
        </div>
        <CardDescription>
          A few quick steps to get the most out of ResumeAI.
        </CardDescription>
        <div className="bg-muted mt-2 h-1.5 w-full overflow-hidden rounded-full">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <StaggerGroup className="grid">
          {steps.map((step) => (
            <StaggerItem key={step.label}>
              <Link
                href={step.href}
                className="group hover:bg-accent flex items-center gap-4 border-t px-6 py-4 transition-colors first:border-t-0"
              >
                <div
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                    step.done
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-transparent",
                  )}
                >
                  <Check className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      step.done && "text-muted-foreground line-through",
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-muted-foreground truncate text-sm">
                    {step.description}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </CardContent>
    </Card>
  );
}
