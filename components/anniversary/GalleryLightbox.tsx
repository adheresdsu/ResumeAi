"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { OptimizedMemoryImage } from "@/components/anniversary/OptimizedMemoryImage";
import type { GalleryImage } from "@/src/types/anniversary";

interface GalleryLightboxProps {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}

export function GalleryLightbox({ images, startIndex, onClose }: GalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setActiveIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    previousActiveElement.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((previous) => (previous + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((previous) => (previous - 1 + images.length) % images.length);
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
        );

        if (!focusable.length) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    };
  }, [images.length, onClose]);

  const activeImage = useMemo(() => images[activeIndex], [activeIndex, images]);

  const showPrevious = () => {
    setActiveIndex((previous) => (previous - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((previous) => (previous + 1) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Photo gallery lightbox"
        className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(5,2,6,0.86)] px-3 py-5 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={dialogRef}
          className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-[var(--warm-ivory)]/18 bg-[var(--soft-black)]/80 p-3 backdrop-blur-md sm:h-auto sm:max-h-[90vh] sm:p-5"
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close lightbox"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--warm-ivory)]/25 bg-[var(--soft-black)]/72 text-[var(--warm-ivory)] transition hover:border-[var(--champagne-gold)]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative mt-8 flex flex-1 items-center justify-center sm:mt-4">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className="absolute left-1 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--warm-ivory)]/25 bg-[var(--soft-black)]/70 text-[var(--warm-ivory)] transition hover:border-[var(--champagne-gold)]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)] sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              className="relative h-full max-h-[75vh] w-full overflow-hidden rounded-[1.5rem] bg-[var(--plum-900)]/40"
              onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
              onTouchEnd={(event) => {
                if (touchStart === null) {
                  return;
                }
                const delta = event.changedTouches[0]?.clientX - touchStart;
                if (delta > 42) {
                  showPrevious();
                } else if (delta < -42) {
                  showNext();
                }
                setTouchStart(null);
              }}
            >
              <OptimizedMemoryImage
                key={activeImage.id}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="absolute right-1 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--warm-ivory)]/25 bg-[var(--soft-black)]/70 text-[var(--warm-ivory)] transition hover:border-[var(--champagne-gold)]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)] sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 px-1 pb-1 text-center">
            <p className="font-serif text-xl text-[var(--warm-ivory)]">{activeImage.caption}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--champagne-gold)]/88">
              {activeIndex + 1} / {images.length} — {activeImage.date}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
