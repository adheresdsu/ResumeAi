"use client";

import { motion, useReducedMotion } from "framer-motion";

import { OptimizedMemoryImage } from "@/components/anniversary/OptimizedMemoryImage";
import { RelationshipCounter } from "@/components/anniversary/RelationshipCounter";
import type { HeroContent } from "@/src/types/anniversary";

interface HeroSectionProps {
  hero: HeroContent;
  relationshipStart: string;
  initials: string;
  onMonogramClick: () => void;
}

export function HeroSection({
  hero,
  relationshipStart,
  initials,
  onMonogramClick,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-10"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_22%,rgba(133,36,78,0.35),transparent_40%),radial-gradient(circle_at_90%_9%,rgba(244,216,161,0.2),transparent_36%),linear-gradient(155deg,#15080f_0%,#220d1e_45%,#10070d_100%)]"
      />
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <div className="grain-overlay h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-11 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.p
            className="mb-4 text-xs uppercase tracking-[0.26em] text-[var(--champagne-gold)]/92"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 0.8 }}
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            className="text-balance font-serif text-5xl leading-tight text-[var(--warm-ivory)] sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduceMotion ? 0 : 1 }}
          >
            {hero.heading}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--warm-ivory)]/82 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : 0.08 }}
          >
            {hero.supportingText}
          </motion.p>

          <motion.div
            className="mt-9 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.16 }}
          >
            <RelationshipCounter startDate={relationshipStart} />
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-lg"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.1 }}
        >
          <button
            type="button"
            aria-label="Monogram easter egg trigger"
            onClick={onMonogramClick}
            className="absolute -right-2 -top-2 z-20 rounded-full border border-[var(--champagne-gold)]/50 bg-[var(--soft-black)]/75 px-4 py-2 font-serif text-sm tracking-[0.24em] text-[var(--champagne-gold)] backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
          >
            {initials}
          </button>

          <div className="relative overflow-hidden rounded-[2.4rem] border border-[var(--warm-ivory)]/20 bg-[var(--soft-black)]/50 p-2 shadow-2xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <OptimizedMemoryImage
                src={hero.featuredImage}
                alt={hero.featuredImageAlt}
                fill
                sizes="(max-width: 1024px) 90vw, 38vw"
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,8,14,0.05)_0%,rgba(16,8,14,0.55)_100%)]" />
              <motion.div
                aria-hidden
                className="absolute -left-16 top-8 h-44 w-44 rounded-full bg-[var(--champagne-gold)]/18 blur-3xl"
                animate={{ x: [0, 28, 0], opacity: [0.15, 0.28, 0.15] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center"
        animate={{ y: [0, 9, 0], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 2.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--warm-ivory)]/72">{hero.scrollLabel}</p>
        <span className="mx-auto mt-2 block h-8 w-px bg-[var(--warm-ivory)]/42" />
      </motion.div>
    </section>
  );
}
