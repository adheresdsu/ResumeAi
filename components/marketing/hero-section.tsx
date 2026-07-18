"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { HeroScenePanel } from "@/components/marketing/hero-scene-panel";
import { Magnetic } from "@/components/motion/magnetic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EASE_OUT, staggerContainer, staggerItem } from "@/lib/motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-40" />
      <div
        aria-hidden
        className="absolute top-[-14rem] left-1/2 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "conic-gradient(from 90deg, var(--accent-cyan), var(--accent-violet), var(--accent-cyan))",
        }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center lg:text-left"
        >
          <motion.div variants={staggerItem}>
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Sparkles className="size-3.5" />
              AI-powered resume &amp; portfolio builder
            </Badge>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Land your next role with a{" "}
            <span className="text-gradient-accent">resume that gets past the bots</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg text-pretty lg:mx-0"
          >
            ResumeAI writes ATS-friendly resumes, tailors cover letters to any job
            description, and turns your resume into a portfolio site — all in minutes.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Magnetic strength={0.2}>
              <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
                Build my resume free
                <ArrowRight className="size-4" />
              </Button>
            </Magnetic>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="#preview" />}
            >
              See how it works
            </Button>
          </motion.div>

          <motion.p variants={staggerItem} className="text-muted-foreground mt-4 text-sm">
            No credit card required &middot; Free plan available
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.15 }}
        >
          <HeroScenePanel />
        </motion.div>
      </div>
    </section>
  );
}
