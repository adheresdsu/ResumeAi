"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Animates a number from 0 to `target` once, on mount. Skips animation entirely under reduced motion. */
export function useCountUp(target: number, durationMs = 900) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? target : 0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduceMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    }

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs, reduceMotion]);

  return value;
}
