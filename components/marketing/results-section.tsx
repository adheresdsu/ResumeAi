import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

const RESULTS = [
  { stat: "< 5 min", label: "From blank page to a full first draft" },
  { stat: "1 workspace", label: "Resume, cover letter, and portfolio kept in sync" },
  { stat: "PDF + DOCX", label: "Export recruiter-ready files in either format" },
  { stat: "Unlimited", label: "Versions for every role you apply to" },
] as const;

export function ResultsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Built to move fast without cutting corners
        </h2>
      </Reveal>

      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RESULTS.map((result) => (
          <StaggerItem key={result.label}>
            <SpotlightCard className="h-full p-6 text-center">
              <p className="text-gradient-accent text-3xl font-semibold tracking-tight">
                {result.stat}
              </p>
              <p className="text-muted-foreground mt-2 text-sm">{result.label}</p>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
