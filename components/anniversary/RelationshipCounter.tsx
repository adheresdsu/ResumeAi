"use client";

import { useEffect, useMemo, useState } from "react";

interface RelationshipCounterProps {
  startDate: string;
}

interface CounterParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateCounter(startDate: string): CounterParts {
  const start = new Date(startDate).getTime();
  const now = Date.now();

  if (Number.isNaN(start) || now < start) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const difference = now - start;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function formatUnit(value: number) {
  return value.toString().padStart(2, "0");
}

export function RelationshipCounter({ startDate }: RelationshipCounterProps) {
  const [counter, setCounter] = useState<CounterParts>(() => calculateCounter(startDate));

  useEffect(() => {
    setCounter(calculateCounter(startDate));

    const timer = window.setInterval(() => {
      setCounter(calculateCounter(startDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [startDate]);

  const segments = useMemo(
    () => [
      { label: "Days", value: counter.days.toString() },
      { label: "Hours", value: formatUnit(counter.hours) },
      { label: "Minutes", value: formatUnit(counter.minutes) },
      { label: "Seconds", value: formatUnit(counter.seconds) },
    ],
    [counter],
  );

  return (
    <section
      aria-label="Relationship duration counter"
      className="rounded-3xl border border-[var(--champagne-gold)]/30 bg-[var(--plum-900)]/35 p-4 backdrop-blur-md sm:p-5"
    >
      <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--champagne-gold)]/85">
        Since {new Date(startDate).toLocaleDateString()}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className="rounded-2xl border border-[var(--warm-ivory)]/10 bg-[var(--soft-black)]/45 px-3 py-4 text-center"
          >
            <p className="font-serif text-2xl text-[var(--warm-ivory)] sm:text-3xl">{segment.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--warm-ivory)]/65">
              {segment.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
