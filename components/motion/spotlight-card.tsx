"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * A card that lifts slightly on hover and tracks the pointer with a soft
 * radial "spotlight" glow. Pointer tracking is skipped entirely when the
 * user prefers reduced motion.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group/spotlight bg-card relative overflow-hidden rounded-2xl border",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:content-['']",
        "before:[background:radial-gradient(240px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),var(--accent-violet-soft),transparent_70%)]",
        "hover:before:opacity-100",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
