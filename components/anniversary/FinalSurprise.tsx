"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

import { OptimizedMemoryImage } from "@/components/anniversary/OptimizedMemoryImage";
import type { FinalSurpriseContent } from "@/src/types/anniversary";

interface FinalSurpriseProps {
  content: FinalSurpriseContent;
}

async function fireCelebration() {
  const canvasConfetti = await import("canvas-confetti");
  const confetti = canvasConfetti.default;
  const colors = ["#f4d8a1", "#c97f9e", "#893d65", "#fbf3e7"];
  confetti({
    particleCount: 70,
    spread: 70,
    startVelocity: 32,
    origin: { y: 0.72 },
    colors,
    scalar: 0.9,
  });
  confetti({
    particleCount: 45,
    spread: 115,
    startVelocity: 24,
    origin: { x: 0.2, y: 0.74 },
    colors,
    scalar: 0.72,
  });
  confetti({
    particleCount: 45,
    spread: 115,
    startVelocity: 24,
    origin: { x: 0.8, y: 0.74 },
    colors,
    scalar: 0.72,
  });
}

export function FinalSurprise({ content }: FinalSurpriseProps) {
  const [celebrated, setCelebrated] = useState(false);
  const reduceMotion = useReducedMotion();

  const celebrate = async () => {
    setCelebrated(true);
    if (!reduceMotion) {
      await fireCelebration();
    }
  };

  return (
    <section
      id="final-surprise"
      className="relative flex min-h-svh items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-10"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(139,61,101,0.33),transparent_45%),radial-gradient(circle_at_88%_9%,rgba(244,216,161,0.2),transparent_38%),linear-gradient(150deg,#0f060b_0%,#1b0b16_52%,#10060a_100%)]"
      />
      <div className="grain-overlay absolute inset-0 opacity-45" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <p className="font-serif text-4xl leading-tight text-[var(--warm-ivory)] sm:text-5xl">
          {content.titleLines[0]}
        </p>
        <p className="mt-3 font-serif text-4xl leading-tight text-[var(--warm-ivory)] sm:text-5xl">
          {content.titleLines[1]}
        </p>

        <h2 className="mx-auto mt-10 max-w-3xl text-balance font-serif text-4xl leading-tight text-[var(--warm-ivory)] sm:text-5xl">
          {content.question}
        </h2>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => void celebrate()}
            className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full border border-[var(--champagne-gold)]/62 bg-[var(--champagne-gold)]/12 px-6 py-3 text-sm font-medium uppercase tracking-[0.19em] text-[var(--warm-ivory)] transition hover:bg-[var(--champagne-gold)]/24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
          >
            <Heart className="h-4 w-4" />
            {content.primaryButton}
          </button>
          <button
            type="button"
            onClick={() => void celebrate()}
            className="inline-flex min-w-[190px] items-center justify-center rounded-full border border-[var(--warm-ivory)]/35 bg-[var(--soft-black)]/50 px-6 py-3 text-xs font-medium uppercase tracking-[0.19em] text-[var(--warm-ivory)] transition hover:border-[var(--champagne-gold)]/62 hover:text-[var(--champagne-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
          >
            {content.secondaryButton}
          </button>
        </div>

        {celebrated ? (
          <motion.div
            className="mx-auto mt-10 max-w-3xl rounded-[1.7rem] border border-[var(--warm-ivory)]/18 bg-[var(--soft-black)]/56 p-5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8 }}
          >
            <p className="font-serif text-2xl leading-relaxed text-[var(--warm-ivory)] sm:text-3xl">
              {content.celebrationMessage}
            </p>
            <div className="relative mx-auto mt-6 aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-[1.3rem] border border-[var(--warm-ivory)]/18">
              <OptimizedMemoryImage
                src={content.celebrationImage}
                alt={content.celebrationImageAlt}
                fill
                sizes="(max-width: 1024px) 92vw, 740px"
                className="object-cover"
              />
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
