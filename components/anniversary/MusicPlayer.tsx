"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  src: string;
  label: string;
  playSignal: number;
}

export function MusicPlayer({ src, label, playSignal }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.26;
    audio.loop = true;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || playSignal === 0) {
      return;
    }

    void audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, [playSignal]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || isUnavailable) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio || isUnavailable) {
      return;
    }

    const nextMute = !isMuted;
    audio.muted = nextMute;
    setIsMuted(nextMute);
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="none"
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsUnavailable(true);
          setIsPlaying(false);
        }}
      />
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-[var(--champagne-gold)]/35 bg-[var(--soft-black)]/78 px-3 py-2 text-[var(--warm-ivory)] shadow-xl backdrop-blur-md sm:bottom-6 sm:right-6">
        <button
          type="button"
          aria-label={isPlaying ? "Pause background song" : "Play background song"}
          onClick={togglePlay}
          disabled={isUnavailable}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--warm-ivory)]/20 transition hover:border-[var(--champagne-gold)]/60 hover:bg-[var(--warm-ivory)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          aria-label={isMuted ? "Unmute song" : "Mute song"}
          onClick={toggleMute}
          disabled={isUnavailable}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--warm-ivory)]/20 transition hover:border-[var(--champagne-gold)]/60 hover:bg-[var(--warm-ivory)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <div className="pr-1">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--champagne-gold)]">
            Soundtrack
          </p>
          <p className="max-w-[130px] truncate text-xs text-[var(--warm-ivory)]/90">{label}</p>
          {isUnavailable ? (
            <p className="text-[11px] text-[var(--warm-ivory)]/65">Add /music/our-song.mp3</p>
          ) : null}
        </div>
      </div>
    </>
  );
}
