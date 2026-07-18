import { FileText, Globe, Layers, Mail, Sparkles, UploadCloud } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI resume builder",
    description:
      "Answer a few questions and get a polished, ATS-friendly resume written for you.",
  },
  {
    icon: UploadCloud,
    title: "Upload & improve",
    description:
      "Already have a resume? Upload it and let AI rewrite it to pass applicant tracking systems.",
  },
  {
    icon: Mail,
    title: "Tailored cover letters",
    description:
      "Paste a job description and generate a cover letter matched to the role in seconds.",
  },
  {
    icon: Globe,
    title: "One-click portfolio",
    description:
      "Turn your resume into a beautiful, shareable portfolio website instantly.",
  },
  {
    icon: FileText,
    title: "PDF & DOCX export",
    description:
      "Download recruiter-ready files in the format you need, whenever you need them.",
  },
  {
    icon: Layers,
    title: "Multiple versions",
    description:
      "Keep a tailored resume for every role and switch between versions without losing history.",
  },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Everything you need to get hired
        </h2>
        <p className="text-muted-foreground mt-4">
          From your first draft to a job offer, ResumeAI handles the busywork so you can
          focus on the story you want to tell.
        </p>
      </Reveal>

      <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <StaggerItem key={feature.title}>
            <SpotlightCard className="h-full">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
                  <feature.icon className="size-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
