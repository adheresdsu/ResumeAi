"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { AnniversaryIntro } from "@/components/anniversary/AnniversaryIntro";
import { BackToTop } from "@/components/anniversary/BackToTop";
import { CursorGlow } from "@/components/anniversary/CursorGlow";
import { FinalSurprise } from "@/components/anniversary/FinalSurprise";
import { FloatingParticles } from "@/components/anniversary/FloatingParticles";
import { Footer } from "@/components/anniversary/Footer";
import { FutureSection } from "@/components/anniversary/FutureSection";
import { HeroSection } from "@/components/anniversary/HeroSection";
import { LoveLetter } from "@/components/anniversary/LoveLetter";
import { LoveNotesSection } from "@/components/anniversary/LoveNotesSection";
import { MemoryTimeline } from "@/components/anniversary/MemoryTimeline";
import { MusicPlayer } from "@/components/anniversary/MusicPlayer";
import { PasswordGate } from "@/components/anniversary/PasswordGate";
import { PhotoGallery } from "@/components/anniversary/PhotoGallery";
import { ReasonsSection } from "@/components/anniversary/ReasonsSection";
import { ScrollProgress } from "@/components/anniversary/ScrollProgress";
import { SoundtrackSection } from "@/components/anniversary/SoundtrackSection";
import { StorySection } from "@/components/anniversary/StorySection";
import type { AnniversaryContent } from "@/src/types/anniversary";

interface AnniversaryExperienceProps {
  content: AnniversaryContent;
}

async function fireIntroParticles() {
  const canvasConfetti = await import("canvas-confetti");
  const confetti = canvasConfetti.default;
  confetti({
    particleCount: 50,
    spread: 68,
    startVelocity: 26,
    scalar: 0.78,
    origin: { y: 0.74 },
    colors: ["#f4d8a1", "#fbf3e7", "#cb85a3"],
  });
}

export function AnniversaryExperience({ content }: AnniversaryExperienceProps) {
  const reduceMotion = useReducedMotion();
  const [introVisible, setIntroVisible] = useState(true);
  const [playSignal, setPlaySignal] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(!content.privacyGate.enabled);
  const [monogramClicks, setMonogramClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    if (!showEasterEgg) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowEasterEgg(false);
    }, 4800);

    return () => window.clearTimeout(timeout);
  }, [showEasterEgg]);

  const openStory = async () => {
    setIntroVisible(false);
    setPlaySignal((previous) => previous + 1);
    if (!reduceMotion) {
      await fireIntroParticles();
    }
  };

  const onMonogramClick = () => {
    setMonogramClicks((previous) => {
      const next = previous + 1;
      if (next >= 5) {
        setShowEasterEgg(true);
        return 0;
      }
      return next;
    });
  };

  if (!isUnlocked) {
    return (
      <PasswordGate
        expectedPassword={content.privacyGate.password}
        hint={content.privacyGate.hint}
        disclaimer={content.privacyGate.disclaimer}
        onUnlocked={() => setIsUnlocked(true)}
      />
    );
  }

  return (
    <div className="relative overflow-hidden bg-[var(--soft-black)] text-[var(--warm-ivory)]">
      <ScrollProgress />
      <CursorGlow />
      <FloatingParticles />
      <AnniversaryIntro
        lines={content.intro.lines}
        revealLine={content.intro.revealLine}
        buttonLabel={content.intro.buttonLabel}
        isVisible={introVisible}
        onOpenStory={() => void openStory()}
      />

      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: introVisible ? 0 : 1, y: introVisible ? 18 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroSection
          hero={content.hero}
          relationshipStart={content.dates.relationshipStart}
          initials={content.profile.initials}
          onMonogramClick={onMonogramClick}
        />
        <StorySection story={content.story} />
        <MemoryTimeline items={content.timeline} />
        <PhotoGallery images={content.gallery} />
        <ReasonsSection reasons={content.reasons} surpriseReason={content.surpriseReason} />
        <LoveNotesSection notes={content.loveNotes} />
        <LoveLetter letter={content.loveLetter} initials={content.profile.initials} />
        <SoundtrackSection songs={content.soundtrack} />
        <FutureSection dreams={content.futureDreams} promise={content.futurePromise} />
        <FinalSurprise content={content.finalSurprise} />
        <Footer
          yourName={content.profile.yourName}
          herName={content.profile.herName}
          relationshipStart={content.dates.relationshipStart}
        />
      </motion.main>

      {playSignal > 0 ? (
        <MusicPlayer src={content.audio.src} label={content.audio.label} playSignal={playSignal} />
      ) : null}
      <BackToTop />

      <AnimatePresence>
        {showEasterEgg ? (
          <motion.p
            className="fixed left-1/2 top-6 z-[75] -translate-x-1/2 rounded-full border border-[var(--champagne-gold)]/48 bg-[var(--soft-black)]/82 px-5 py-2 text-sm text-[var(--warm-ivory)] shadow-xl backdrop-blur-md"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
          >
            Even after 365 days, you still give me butterflies.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
