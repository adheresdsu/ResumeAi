"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";

import { SceneLoader } from "@/components/three/scene-loader";
import { useMediaQuery } from "@/components/motion/use-media-query";

const HIGHLIGHTS = [
  { icon: Sparkles, label: "AI-written, ATS-optimized resumes" },
  { icon: Zap, label: "First draft in under 5 minutes" },
  { icon: ShieldCheck, label: "Your data stays yours, always" },
] as const;

export function AuthVisualPanel() {
  const reduceMotion = useReducedMotion();
  // Matches the `lg:` breakpoint this panel is shown at. Gating the mount
  // (not just CSS visibility) keeps the WebGL scene from ever loading or
  // running on mobile, where the panel is hidden anyway.
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="bg-grid relative hidden overflow-hidden border-l lg:block">
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "conic-gradient(from 45deg, var(--accent-cyan), var(--accent-violet), var(--accent-cyan))",
        }}
      />
      {isDesktop && <SceneLoader className="h-full w-full" />}

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-panel-strong shadow-elevated absolute bottom-10 left-10 w-72 rounded-2xl p-5"
      >
        <p className="mb-3 text-sm font-medium">Why job seekers pick ResumeAI</p>
        <ul className="space-y-2.5">
          {HIGHLIGHTS.map((item) => (
            <li
              key={item.label}
              className="text-muted-foreground flex items-center gap-2.5 text-sm"
            >
              <item.icon className="text-primary size-4 shrink-0" />
              {item.label}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
