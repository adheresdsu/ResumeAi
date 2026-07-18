import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { EmptyState } from "@/components/dashboard/empty-state";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Cover letters" };

export default function CoverLettersPage() {
  return (
    <div className="grid gap-6">
      <Reveal className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Cover letters</h1>
          <p className="text-muted-foreground">
            Generate letters tailored to a job description.
          </p>
        </div>
        <Button disabled>New cover letter</Button>
      </Reveal>
      <EmptyState
        icon={<Mail />}
        title="No cover letters yet"
        description="AI cover letter generation is coming in the next phase. Check back soon."
      />
    </div>
  );
}
