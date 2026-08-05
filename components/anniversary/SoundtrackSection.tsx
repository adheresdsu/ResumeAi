"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Music2 } from "lucide-react";
import { useState } from "react";

import { OptimizedMemoryImage } from "@/components/anniversary/OptimizedMemoryImage";
import { SectionHeading } from "@/components/anniversary/SectionHeading";
import type { SoundtrackItem } from "@/src/types/anniversary";

interface SoundtrackSectionProps {
  songs: SoundtrackItem[];
}

export function SoundtrackSection({ songs }: SoundtrackSectionProps) {
  const [unavailableIds, setUnavailableIds] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();

  return (
    <section id="soundtrack" className="relative px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          title="Songs that sound like us"
          description="Replace these placeholders with your real songs and private previews."
        />

        <div className="mt-11 grid gap-5 md:grid-cols-2">
          {songs.map((song, index) => (
            <motion.article
              key={song.id}
              className="rounded-3xl border border-[var(--warm-ivory)]/16 bg-[var(--plum-900)]/30 p-4 shadow-xl backdrop-blur-md sm:p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : (index % 2) * 0.08 }}
            >
              <div className="flex gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-[var(--warm-ivory)]/20">
                  <OptimizedMemoryImage
                    src={song.coverImage}
                    alt={song.coverImageAlt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--champagne-gold)]">
                    Placeholder track
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-[var(--warm-ivory)]">{song.title}</h3>
                  <p className="text-sm text-[var(--warm-ivory)]/76">{song.artist}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--warm-ivory)]/84">{song.meaning}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {song.previewSrc ? (
                  <div className="min-w-[260px] max-w-full flex-1">
                    <audio
                      controls
                      preload="none"
                      className="h-9 w-full"
                      onError={() =>
                        setUnavailableIds((previous) => ({
                          ...previous,
                          [song.id]: true,
                        }))
                      }
                    >
                      <source src={song.previewSrc} type="audio/mpeg" />
                    </audio>
                    {unavailableIds[song.id] ? (
                      <p className="mt-2 text-xs text-[var(--warm-ivory)]/65">
                        Add {song.previewSrc} to enable this preview.
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {song.externalUrl ? (
                  <a
                    href={song.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--warm-ivory)]/22 px-3 py-2 text-xs uppercase tracking-[0.15em] text-[var(--warm-ivory)]/84 transition hover:border-[var(--champagne-gold)]/58 hover:text-[var(--warm-ivory)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
                  >
                    Optional link
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--warm-ivory)]/16 bg-[var(--soft-black)]/45 px-4 py-2 text-xs text-[var(--warm-ivory)]/72">
          <Music2 className="h-3.5 w-3.5" />
          Tip: keep previews local in /public/music for private sharing.
        </p>
      </div>
    </section>
  );
}
