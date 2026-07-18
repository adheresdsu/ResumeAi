"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

/** Entrance animation for the auth form card. Content stays server-rendered. */
export function AuthCard({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="shadow-elevated bg-card w-full max-w-sm rounded-2xl border p-6 sm:p-8"
    >
      {children}
    </motion.div>
  );
}
