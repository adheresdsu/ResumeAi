"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export function FloatingParticles() {
  const reduceMotion = useReducedMotion();
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 14,
        opacity: 0.2 + Math.random() * 0.4,
      })),
    [],
  );

  if (reduceMotion) {
    return null;
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-[var(--champagne-gold)]/50 blur-[1px]"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            y: ["105vh", "-10vh"],
            x: [0, Math.sin(particle.id) * 24],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
