import { AnniversaryExperience } from "@/components/anniversary/AnniversaryExperience";
import { anniversaryContent } from "@/src/data/anniversary";

export default function LandingPage() {
  return <AnniversaryExperience content={anniversaryContent} />;
}
