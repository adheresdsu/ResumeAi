import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { scaleIn } from "@/lib/motion";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal variants={scaleIn}>
        <div className="glow-accent glass-panel-strong relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_100%,var(--accent-violet-soft),transparent)]"
          />
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to build a resume that stands out?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl">
            Join job seekers using ResumeAI to write, tailor, and export resumes that get
            noticed.
          </p>
          <Magnetic strength={0.2} className="mt-8 inline-block">
            <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
              Get started for free
              <ArrowRight className="size-4" />
            </Button>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  );
}
