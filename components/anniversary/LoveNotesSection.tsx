"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/anniversary/SectionHeading";
import type { LoveNote } from "@/src/types/anniversary";

interface LoveNotesSectionProps {
  notes: LoveNote[];
}

export function LoveNotesSection({ notes }: LoveNotesSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="notes"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 18% 10%, rgba(93,49,30,0.35), transparent 38%), radial-gradient(circle at 88% 28%, rgba(121,65,92,0.32), transparent 42%), linear-gradient(145deg, #12070c 0%, #1a0d16 40%, #10070d 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(212,179,119,0.08) 25%, transparent 25%), linear-gradient(225deg, rgba(212,179,119,0.08) 25%, transparent 25%), linear-gradient(45deg, rgba(212,179,119,0.08) 25%, transparent 25%), linear-gradient(315deg, rgba(212,179,119,0.08) 25%, #0000 25%)",
          backgroundPosition: "14px 0, 14px 0, 0 0, 0 0",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <SectionHeading
          title="Things I never want to forget"
          description="A few tiny details that became part of my favorite version of life."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note, index) => (
            <motion.article
              key={note.id}
              className="note-card relative rounded-[1.4rem] border border-[var(--champagne-gold)]/25 bg-[rgba(251,241,219,0.92)] p-5 text-[var(--soft-black)] shadow-xl"
              initial={{ opacity: 0, y: 16, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: reduceMotion ? 0 : (index % 3) * 0.08,
              }}
            >
              <p className="text-[11px] uppercase tracking-[0.17em] text-[var(--deep-burgundy)]/78">
                {note.label}
              </p>
              <p className="mt-3 font-script text-3xl leading-snug text-[var(--plum-900)]">{note.memory}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
