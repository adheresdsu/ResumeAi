"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Globe, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { revealViewport } from "@/lib/motion";

const PANELS = [
  {
    icon: Sparkles,
    title: "AI resume builder",
    lines: [90, 70, 40],
    offset: 0,
  },
  {
    icon: FileText,
    title: "ATS score check",
    lines: [80, 100, 55],
    offset: 24,
  },
  {
    icon: Globe,
    title: "Portfolio preview",
    lines: [65, 90, 35],
    offset: 0,
  },
] as const;

function PreviewPanel({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: reduceMotion ? 0 : panel.offset }}
      viewport={revealViewport}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel shadow-elevated rounded-2xl p-5"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-primary/15 text-primary flex size-8 items-center justify-center rounded-lg">
          <panel.icon className="size-4" />
        </div>
        <p className="text-sm font-medium">{panel.title}</p>
      </div>
      <div className="space-y-2.5">
        {panel.lines.map((width, i) => (
          <div
            key={i}
            className="bg-foreground/10 h-2 rounded-full"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
      <div className="mt-4 h-16 rounded-lg bg-[linear-gradient(135deg,var(--accent-violet-soft),var(--accent-cyan-soft))]" />
    </motion.div>
  );
}

export function ProductPreviewSection() {
  return (
    <section id="preview" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          One workspace, every part of the job hunt
        </h2>
        <p className="text-muted-foreground mt-4">
          Build, score, and publish — all from the same place, all kept in sync.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {PANELS.map((panel, i) => (
          <PreviewPanel key={panel.title} panel={panel} index={i} />
        ))}
      </div>
    </section>
  );
}
