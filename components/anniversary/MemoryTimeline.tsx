"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  Gem,
  Heart,
  MapPinned,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { OptimizedMemoryImage } from "@/components/anniversary/OptimizedMemoryImage";
import { SectionHeading } from "@/components/anniversary/SectionHeading";
import type { TimelineIcon, TimelineItem } from "@/src/types/anniversary";

interface MemoryTimelineProps {
  items: TimelineItem[];
}

const iconMap: Record<TimelineIcon, LucideIcon> = {
  sparkles: Sparkles,
  heart: Heart,
  camera: Camera,
  map: MapPinned,
  shield: ShieldCheck,
  gem: Gem,
};

export function MemoryTimeline({ items }: MemoryTimelineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="timeline" className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Memory timeline"
          title="Chapter One: Our First Year"
          description="Six moments that quietly shaped the story we now call ours."
          align="center"
        />

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--champagne-gold)]/80 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-10 md:space-y-14">
            {items.map((item, index) => {
              const Icon = iconMap[item.icon];
              const isLeft = index % 2 === 0;
              return (
                <motion.li
                  key={item.id}
                  className="relative grid gap-5 md:grid-cols-2 md:items-center md:gap-8"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : index * 0.06 }}
                >
                  <div className={`md:col-span-1 ${isLeft ? "md:pr-10" : "md:order-2 md:pl-10"}`}>
                    <article className="rounded-3xl border border-[var(--warm-ivory)]/14 bg-[var(--plum-900)]/27 p-5 backdrop-blur-sm sm:p-6">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--champagne-gold)]/35 bg-[var(--champagne-gold)]/12 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--champagne-gold)]">
                        <Icon className="h-3.5 w-3.5" />
                        {item.date}
                      </div>
                      <h3 className="font-serif text-2xl text-[var(--warm-ivory)]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--warm-ivory)]/82 sm:text-base">
                        {item.description}
                      </p>
                      {item.location ? (
                        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--blush-pink)]/85">
                          {item.location}
                        </p>
                      ) : null}
                    </article>
                  </div>

                  <div className={`relative md:col-span-1 ${isLeft ? "md:pl-10" : "md:order-1 md:pr-10"}`}>
                    <div className="ml-7 overflow-hidden rounded-[1.65rem] border border-[var(--warm-ivory)]/18 bg-[var(--soft-black)]/55 p-2 shadow-xl md:ml-0">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                        <OptimizedMemoryImage
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 768px) 88vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <span className="absolute left-1 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--champagne-gold)]/45 bg-[var(--soft-black)] text-[var(--champagne-gold)] md:left-auto md:right-0 md:translate-x-1/2">
                      <span className="h-2 w-2 rounded-full bg-[var(--champagne-gold)]" />
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
