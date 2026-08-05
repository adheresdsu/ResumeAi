"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { OptimizedMemoryImage } from "@/components/anniversary/OptimizedMemoryImage";
import { SectionHeading } from "@/components/anniversary/SectionHeading";
import type { StoryContent } from "@/src/types/anniversary";

interface StorySectionProps {
  story: StoryContent;
}

export function StorySection({ story }: StorySectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const reduceMotion = useReducedMotion();

  const yPrimary = useTransform(scrollYProgress, [0, 1], [30, -40]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], [-20, 35]);

  return (
    <section id="story" ref={sectionRef} className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading title={story.title} />
          <motion.p
            className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--warm-ivory)]/84"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduceMotion ? 0 : 0.9 }}
          >
            {story.message}
          </motion.p>
          <div className="mt-10 space-y-4">
            {story.prompts.map((prompt, index) => (
              <motion.article
                key={prompt.label}
                className="rounded-2xl border border-[var(--warm-ivory)]/15 bg-[var(--plum-900)]/28 px-5 py-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : index * 0.1 }}
              >
                <p className="text-xs uppercase tracking-[0.17em] text-[var(--champagne-gold)]/95">
                  {prompt.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--warm-ivory)]/82 sm:text-base">
                  {prompt.value}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px]">
          <motion.figure
            className="absolute left-0 top-0 w-[72%] overflow-hidden rounded-[1.9rem] border border-[var(--warm-ivory)]/18 bg-[var(--soft-black)]/55 p-2 shadow-2xl"
            style={{ y: reduceMotion ? 0 : yPrimary }}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.45rem]">
              <OptimizedMemoryImage
                src={story.photos[0]?.src ?? "/images/placeholder-photo.svg"}
                alt={story.photos[0]?.alt ?? "Story image"}
                fill
                sizes="(max-width: 1024px) 80vw, 28vw"
                className="object-cover"
              />
            </div>
            <figcaption className="px-2 pb-2 pt-3 font-script text-2xl text-[var(--blush-pink)]/92">
              {story.photos[0]?.note}
            </figcaption>
          </motion.figure>

          <motion.figure
            className="absolute bottom-6 right-0 w-[70%] overflow-hidden rounded-[1.9rem] border border-[var(--warm-ivory)]/15 bg-[var(--soft-black)]/55 p-2 shadow-2xl"
            style={{ y: reduceMotion ? 0 : ySecondary }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem]">
              <OptimizedMemoryImage
                src={story.photos[1]?.src ?? "/images/placeholder-photo.svg"}
                alt={story.photos[1]?.alt ?? "Story image"}
                fill
                sizes="(max-width: 1024px) 80vw, 26vw"
                className="object-cover"
              />
            </div>
            <figcaption className="px-2 pb-2 pt-3 font-script text-2xl text-[var(--blush-pink)]/88">
              {story.photos[1]?.note}
            </figcaption>
          </motion.figure>

          <motion.figure
            className="absolute left-[24%] top-[43%] w-[44%] overflow-hidden rounded-[1.5rem] border border-[var(--champagne-gold)]/28 bg-[var(--soft-black)]/65 p-1.5 shadow-xl"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.15 }}
          >
            <div className="relative aspect-square overflow-hidden rounded-[1.1rem]">
              <OptimizedMemoryImage
                src={story.photos[2]?.src ?? "/images/placeholder-photo.svg"}
                alt={story.photos[2]?.alt ?? "Story image"}
                fill
                sizes="(max-width: 1024px) 50vw, 15vw"
                className="object-cover"
              />
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
