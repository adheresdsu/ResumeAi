"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="bg-grid relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed py-16 text-center"
    >
      <div
        aria-hidden
        className="absolute h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-violet-soft), transparent 70%)",
        }}
      />
      <motion.div
        initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: EASE_OUT }}
        className="bg-primary/10 text-primary relative mb-4 flex size-12 items-center justify-center rounded-full [&_svg]:size-6"
      >
        {icon}
      </motion.div>
      <h2 className="relative text-lg font-medium">{title}</h2>
      <p className="text-muted-foreground relative mt-1 max-w-sm text-sm">
        {description}
      </p>
      {action ? <div className="relative mt-6">{action}</div> : null}
    </motion.div>
  );
}
