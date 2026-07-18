import type { Metadata } from "next";
import { FileText, Globe, Mail } from "lucide-react";

import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import { StatCard } from "@/components/dashboard/stat-card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardOverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [resumes, coverLetters, portfolios] = await Promise.all([
    supabase.from("resumes").select("id", { count: "exact", head: true }),
    supabase.from("cover_letters").select("id", { count: "exact", head: true }),
    supabase
      .from("portfolios")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
  ]);

  const queryError = resumes.error ?? coverLetters.error ?? portfolios.error;
  if (queryError) {
    throw new Error(queryError.message);
  }

  const resumeCount = resumes.count ?? 0;
  const coverLetterCount = coverLetters.count ?? 0;
  const portfolioCount = portfolios.count ?? 0;

  return (
    <div className="grid gap-6">
      <Reveal>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome
          {user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your job search.
        </p>
      </Reveal>

      <StaggerGroup className="grid gap-4 sm:grid-cols-3">
        <StaggerItem>
          <StatCard icon={<FileText />} label="Resumes" value={resumeCount} />
        </StaggerItem>
        <StaggerItem>
          <StatCard icon={<Mail />} label="Cover letters" value={coverLetterCount} />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            icon={<Globe />}
            label="Published portfolios"
            value={portfolioCount}
          />
        </StaggerItem>
      </StaggerGroup>

      <Reveal delay={0.1}>
        <OnboardingChecklist
          steps={[
            {
              label: "Create your account",
              description: "You're in — welcome to ResumeAI.",
              href: "/dashboard/settings",
              done: true,
            },
            {
              label: "Build your first resume",
              description: "Start from scratch or upload an existing one.",
              href: "/dashboard/resumes",
              done: resumeCount > 0,
            },
            {
              label: "Generate a cover letter",
              description: "Tailor one to a real job description.",
              href: "/dashboard/cover-letters",
              done: coverLetterCount > 0,
            },
            {
              label: "Publish your portfolio",
              description: "Turn a resume into a shareable site.",
              href: "/dashboard/portfolio",
              done: portfolioCount > 0,
            },
          ]}
        />
      </Reveal>
    </div>
  );
}
