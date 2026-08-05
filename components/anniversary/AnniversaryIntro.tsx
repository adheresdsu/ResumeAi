"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { AnimatedText } from "@/components/anniversary/AnimatedText";

interface AnniversaryIntroProps {
  lines: [string, string, string];
  revealLine: string;
  buttonLabel: string;
  isVisible: boolean;
  onOpenStory: () => void;
}

export function AnniversaryIntro({
  lines,
  revealLine,
  buttonLabel,
  isVisible,
  onOpenStory,
}: AnniversaryIntroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.section
          key="intro-screen"
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_16%_18%,rgba(129,41,73,0.35),transparent_44%),radial-gradient(circle_at_84%_12%,rgba(239,207,150,0.22),transparent_38%),linear-gradient(150deg,#14080f_0%,#170910_50%,#10060b_100%)] px-6 py-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 1.1 } }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: [0.16, 0.34, 0.16] }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="grain-overlay h-full w-full" />
          </motion.div>

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="space-y-3 font-serif text-3xl text-[var(--warm-ivory)]/90 sm:text-4xl md:text-5xl">
              {lines.map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : index * 0.65,
                    duration: reduceMotion ? 0 : 0.95,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.p
              className="mt-10 max-w-xl text-balance font-serif text-4xl leading-tight text-[var(--warm-ivory)] sm:text-5xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduceMotion ? 0 : 2.15,
                duration: reduceMotion ? 0 : 0.95,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <AnimatedText text={revealLine} delay={0.1} />
            </motion.p>

            <motion.button
              type="button"
              className="mt-11 inline-flex items-center justify-center rounded-full border border-[var(--champagne-gold)]/60 bg-[var(--champagne-gold)]/12 px-7 py-3 text-sm font-medium uppercase tracking-[0.22em] text-[var(--warm-ivory)] transition hover:bg-[var(--champagne-gold)]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduceMotion ? 0 : 2.55,
                duration: reduceMotion ? 0 : 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={onOpenStory}
            >
              {buttonLabel}
            </motion.button>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
