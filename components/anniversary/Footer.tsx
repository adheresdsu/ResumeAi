"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

interface FooterProps {
  yourName: string;
  herName: string;
  relationshipStart: string;
}

export function Footer({ yourName, herName, relationshipStart }: FooterProps) {
  const year = new Date().getFullYear();
  const reduceMotion = useReducedMotion();

  return (
    <footer className="border-t border-[var(--warm-ivory)]/12 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-[var(--warm-ivory)]/78">
          Made with love by {yourName}, for {herName}.
        </p>
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--warm-ivory)]/62">
          Our story began on {new Date(relationshipStart).toLocaleDateString()}
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-[var(--warm-ivory)]/75">
          <motion.span
            animate={{ scale: [1, 1.22, 1] }}
            transition={{ duration: reduceMotion ? 0 : 1.6, repeat: Number.POSITIVE_INFINITY }}
          >
            <Heart className="h-4 w-4 text-[var(--blush-pink)]" fill="currentColor" />
          </motion.span>
          {year}
        </div>
      </div>
    </footer>
  );
}
