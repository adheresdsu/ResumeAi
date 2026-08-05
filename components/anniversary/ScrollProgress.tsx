"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const width = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.2,
  });

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[var(--blush-pink)] via-[var(--champagne-gold)] to-[var(--deep-burgundy)]"
      style={{ scaleX: width, width: "100%" }}
    />
  );
}
