"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/anniversary/SectionHeading";

interface LoveLetterProps {
  letter: string;
  initials: string;
}

export function LoveLetter({ letter, initials }: LoveLetterProps) {
  const paragraphs = letter.split("\n\n").filter((paragraph) => paragraph.trim().length > 0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="letter" className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          title="A letter to my favorite person"
          description="Every word here is for you."
          align="center"
        />

        <article className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[2rem] border border-[var(--champagne-gold)]/30 bg-[linear-gradient(160deg,rgba(255,247,235,0.98),rgba(248,233,212,0.95))] p-8 text-[var(--soft-black)] shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-35">
            <div className="h-full w-full bg-[linear-gradient(rgba(121,71,45,0.08)_1px,transparent_1px)] bg-[length:100%_30px]" />
          </div>
          <motion.div
            className="relative z-10 space-y-6 text-pretty text-lg leading-relaxed sm:text-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: reduceMotion ? 0 : 0.35,
                  delayChildren: reduceMotion ? 0 : 0.1,
                },
              },
            }}
          >
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={`${paragraph.slice(0, 12)}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <div className="relative z-10 mt-10 flex justify-end">
            <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full border border-[var(--deep-burgundy)]/30 bg-[radial-gradient(circle_at_30%_30%,#9f3f5f,#65233f_60%,#4a1a30)] text-center shadow-xl">
              <span className="font-serif text-xl tracking-[0.18em] text-[var(--warm-ivory)]">{initials}</span>
              <span className="absolute inset-1 rounded-full border border-[var(--warm-ivory)]/25" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
