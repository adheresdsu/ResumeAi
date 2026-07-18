import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion tokens. Keep durations short and the easing consistent so
 * animation reads as one system rather than per-component tuning.
 */
export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
} as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = fadeInUp;

/** Default viewport config for scroll-triggered reveals: animate once, slightly before entering view. */
export const revealViewport = { once: true, margin: "-80px" } as const;
