"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { useState } from "react";

import { OptimizedMemoryImage } from "@/components/anniversary/OptimizedMemoryImage";
import { SectionHeading } from "@/components/anniversary/SectionHeading";
import type { GalleryImage } from "@/src/types/anniversary";

const GalleryLightbox = dynamic(
  () => import("@/components/anniversary/GalleryLightbox").then((module) => module.GalleryLightbox),
  {
    ssr: false,
  },
);

interface PhotoGalleryProps {
  images: GalleryImage[];
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="gallery" className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title="Little moments, forever memories"
          description="Tap any frame to step into a full-screen memory."
          align="center"
        />

        <div className="mt-5 text-center text-xs uppercase tracking-[0.15em] text-[var(--warm-ivory)]/58">
          Keyboard support: use arrow keys to navigate and Esc to close.
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] border border-[var(--warm-ivory)]/14 bg-[var(--soft-black)]/60 p-2 text-left shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : (index % 3) * 0.06 }}
              onClick={() => setActiveIndex(index)}
              aria-label={`Open memory ${index + 1}: ${image.caption}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
                <OptimizedMemoryImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 32vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,3,7,0.9)_100%)] opacity-75 transition group-hover:opacity-95" />
              </div>

              <div className="pointer-events-none absolute inset-x-4 bottom-5">
                <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-[var(--warm-ivory)]/25 bg-[var(--soft-black)]/45 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--champagne-gold)]/94">
                  <Expand className="h-3 w-3" />
                  Open
                </div>
                <p className="font-serif text-lg leading-snug text-[var(--warm-ivory)]">{image.caption}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--warm-ivory)]/67">
                  {image.date}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeIndex !== null ? (
        <GalleryLightbox images={images} startIndex={activeIndex} onClose={() => setActiveIndex(null)} />
      ) : null}
    </section>
  );
}
