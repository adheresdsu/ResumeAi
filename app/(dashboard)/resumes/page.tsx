import type { Metadata } from "next";
import { FileText } from "lucide-react";

import { EmptyState } from "@/components/dashboard/empty-state";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Resumes" };

export default function ResumesPage() {
  return (
    <div className="grid gap-6">
      <Reveal className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Resumes</h1>
          <p className="text-muted-foreground">Manage every version of your resume.</p>
        </div>
        <Button disabled>New resume</Button>
      </Reveal>
      <EmptyState
        icon={<FileText />}
        title="No resumes yet"
        description="AI resume generation is coming in the next phase. Check back soon."
      />
    </div>
  );
}
