"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

import { SectionHeading } from "@/components/anniversary/SectionHeading";
import type { FutureDream } from "@/src/types/anniversary";

interface FutureSectionProps {
  dreams: FutureDream[];
  promise: string;
}

export function FutureSection({ dreams, promise }: FutureSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="future"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 22% 12%, rgba(248,200,178,0.22), transparent 38%), radial-gradient(circle at 82% 24%, rgba(141,75,119,0.28), transparent 43%), linear-gradient(160deg, #14090f 0%, #1e0e1c 50%, #12080e 100%)",
      }}
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <SectionHeading
          title="To all the moments still waiting for us"
          description="Each one softly glowing, already asking for our names."
          align="center"
        />

        <div className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dreams.map((dream, index) => (
            <motion.article
              key={dream.id}
              className="group relative overflow-hidden rounded-3xl border border-[var(--warm-ivory)]/15 bg-[var(--soft-black)]/46 p-6 shadow-xl backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, borderColor: "rgba(212, 179, 119, 0.62)" }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : (index % 3) * 0.08,
              }}
            >
              <motion.span
                aria-hidden
                className="absolute -top-16 right-[-30px] h-32 w-32 rounded-full bg-[var(--champagne-gold)]/17 blur-2xl"
                animate={{ opacity: [0.15, 0.38, 0.15] }}
                transition={{ duration: 3.6 + index, repeat: Number.POSITIVE_INFINITY }}
              />
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--champagne-gold)]/95">
                <Star className="h-3.5 w-3.5" />
                Future memory
              </p>
              <h3 className="mt-3 font-serif text-2xl text-[var(--warm-ivory)]">{dream.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--warm-ivory)]/80">{dream.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.blockquote
          className="mx-auto mt-12 max-w-4xl rounded-[1.8rem] border border-[var(--champagne-gold)]/35 bg-[var(--champagne-gold)]/10 p-7 text-center font-serif text-2xl leading-relaxed text-[var(--warm-ivory)] sm:text-3xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
        >
          {promise}
        </motion.blockquote>
      </div>
    </section>
  );
}
