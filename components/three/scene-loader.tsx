"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { SceneFallback } from "@/components/three/scene-fallback";
import { hasWebGL } from "@/lib/webgl";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null },
);

/**
 * Public entry point for the 3D hero visual. Handles every "don't ship a
 * broken/expensive scene" concern in one place: skips WebGL entirely under
 * reduced motion, checks for WebGL support, only mounts the Canvas once
 * scrolled into view, and pauses the render loop when off-screen.
 */
export function SceneLoader({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglOk(hasWebGL());
  }, []);

  const canRender3D = webglOk === true && !reduceMotion;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {canRender3D ? (
        <HeroScene reduceMotion={!!reduceMotion} paused={!isInView} />
      ) : (
        <SceneFallback className="h-full w-full" />
      )}
    </div>
  );
}
