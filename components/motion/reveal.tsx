"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { fadeInUp, revealViewport } from "@/lib/motion";

export function Reveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
