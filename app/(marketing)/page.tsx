import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProductPreviewSection } from "@/components/marketing/product-preview";
import { ResultsSection } from "@/components/marketing/results-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProductPreviewSection />
      <ResultsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
