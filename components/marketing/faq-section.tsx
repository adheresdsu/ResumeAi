import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Is ResumeAI free to use?",
    answer:
      "Yes. The free plan lets you build and export a resume with AI. Upgrading to Pro unlocks unlimited AI generations, premium templates, and a custom portfolio domain.",
  },
  {
    question: "Will my resume pass applicant tracking systems (ATS)?",
    answer:
      "Every template is built to parse cleanly in ATS software, and the AI writer optimizes wording and formatting specifically for ATS compatibility.",
  },
  {
    question: "Can I upload a resume I already have?",
    answer:
      "Yes. Upload a PDF or DOCX and ResumeAI will parse it and suggest AI-improved rewrites you can accept or reject.",
  },
  {
    question: "What file formats can I export?",
    answer: "You can export any resume version as a PDF or a DOCX file.",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
      </Reveal>
      <Accordion className="mt-12">
        {FAQS.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
