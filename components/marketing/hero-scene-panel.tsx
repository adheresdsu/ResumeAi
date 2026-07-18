"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SceneLoader } from "@/components/three/scene-loader";

/** Client wrapper: hosts the 3D canvas plus a floating glass card layered on top. */
export function HeroScenePanel() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md sm:max-w-lg">
      <SceneLoader className="h-full w-full" />
      <motion.div
        className="glass-panel-strong shadow-elevated absolute bottom-2 left-2 w-48 rounded-xl p-3 sm:bottom-6 sm:left-0 sm:w-56"
        initial={{ opacity: 0, y: 12 }}
        animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
        transition={
          reduceMotion
            ? { duration: 0.5 }
            : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
        }
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="size-6 rounded-full bg-[color-mix(in_oklch,var(--accent-violet)_70%,white)]" />
          <div className="flex-1">
            <div className="bg-foreground/70 h-2 w-20 rounded-full" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="bg-foreground/15 h-1.5 w-full rounded-full" />
          <div className="bg-foreground/15 h-1.5 w-4/5 rounded-full" />
          <div className="h-1.5 w-3/5 rounded-full bg-[var(--accent-cyan)]/50" />
        </div>
      </motion.div>
    </div>
  );
}
