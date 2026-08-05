"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/components/motion/use-media-query";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const prefersReducedMotion = useReducedMotion();
  const isTouchLayout = useMediaQuery("(pointer: coarse)");

  useEffect(() => {
    if (prefersReducedMotion || isTouchLayout) {
      return undefined;
    }

    const onPointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [isTouchLayout, prefersReducedMotion]);

  if (prefersReducedMotion || isTouchLayout) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-20 hidden h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(244,216,161,0.25),rgba(0,0,0,0))] blur-xl md:block"
      animate={{
        x: position.x - 88,
        y: position.y - 88,
      }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 180,
        mass: 0.3,
      }}
    />
  );
}
