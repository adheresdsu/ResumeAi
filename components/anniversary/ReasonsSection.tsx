"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { SectionHeading } from "@/components/anniversary/SectionHeading";
import { useMediaQuery } from "@/components/motion/use-media-query";

interface ReasonsSectionProps {
  reasons: string[];
  surpriseReason: string;
}

export function ReasonsSection({ reasons, surpriseReason }: ReasonsSectionProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduceMotion = useReducedMotion();
  const [revealedCount, setRevealedCount] = useState(1);
  const [viewedReasons, setViewedReasons] = useState<Set<number>>(new Set());

  const visibleReasons = useMemo(
    () => (isMobile ? reasons.slice(0, revealedCount) : reasons),
    [isMobile, reasons, revealedCount],
  );

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    setViewedReasons((previous) => {
      const next = new Set(previous);
      visibleReasons.forEach((_, index) => next.add(index));
      return next;
    });
  }, [isMobile, visibleReasons]);

  const viewedAll = viewedReasons.size >= reasons.length;

  return (
    <section id="reasons" className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title="365 reasons would still not be enough"
          description="And yet every single day gives me another one."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleReasons.map((reason, index) => (
            <motion.article
              key={reason}
              className="group rounded-3xl border border-[var(--warm-ivory)]/15 bg-[linear-gradient(160deg,rgba(36,14,28,0.8),rgba(21,8,16,0.7))] p-6 shadow-xl backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : (index % 3) * 0.08 }}
              onMouseEnter={() =>
                setViewedReasons((previous) => {
                  const next = new Set(previous);
                  next.add(index);
                  return next;
                })
              }
              onFocus={() =>
                setViewedReasons((previous) => {
                  const next = new Set(previous);
                  next.add(index);
                  return next;
                })
              }
              tabIndex={0}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--champagne-gold)]/85">
                Reason {index + 1}
              </p>
              <p className="text-pretty font-serif text-2xl leading-snug text-[var(--warm-ivory)] transition group-hover:text-[var(--blush-pink)]/95">
                {reason}
              </p>
            </motion.article>
          ))}
        </div>

        {isMobile && revealedCount < reasons.length ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setRevealedCount((previous) => Math.min(previous + 1, reasons.length))}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--champagne-gold)]/55 bg-[var(--champagne-gold)]/10 px-5 py-3 text-xs uppercase tracking-[0.18em] text-[var(--warm-ivory)] transition hover:bg-[var(--champagne-gold)]/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
            >
              <Sparkles className="h-4 w-4" />
              Reveal another reason
            </button>
          </div>
        ) : null}

        {viewedAll ? (
          <motion.article
            className="mx-auto mt-10 max-w-3xl rounded-3xl border border-[var(--champagne-gold)]/45 bg-[var(--champagne-gold)]/9 p-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.7 }}
          >
            <p className="font-script text-4xl text-[var(--blush-pink)]/94">Hidden surprise</p>
            <p className="mt-4 font-serif text-3xl leading-tight text-[var(--warm-ivory)]">
              {surpriseReason}
            </p>
          </motion.article>
        ) : null}
      </div>
    </section>
  );
}
