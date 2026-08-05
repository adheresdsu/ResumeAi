"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";

interface PasswordGateProps {
  expectedPassword: string;
  hint: string;
  disclaimer: string;
  onUnlocked: () => void;
}

export function PasswordGate({
  expectedPassword,
  hint,
  disclaimer,
  onUnlocked,
}: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.trim() === expectedPassword) {
      setError("");
      onUnlocked();
      return;
    }

    setError("That password does not match yet. Try your shared phrase.");
  };

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-16">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(245,206,176,0.23),transparent_46%),radial-gradient(circle_at_82%_20%,rgba(96,39,64,0.4),transparent_48%),linear-gradient(160deg,#15080f_0%,#1e0d1b_52%,#13080f_100%)]"
      />
      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-[var(--champagne-gold)]/35 bg-[var(--soft-black)]/70 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--champagne-gold)]/40 bg-[var(--champagne-gold)]/12">
          <LockKeyhole className="h-5 w-5 text-[var(--champagne-gold)]" />
        </div>
        <h1 className="font-serif text-3xl text-[var(--warm-ivory)]">Private celebration</h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--warm-ivory)]/78">{disclaimer}</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block text-xs uppercase tracking-[0.18em] text-[var(--champagne-gold)]">
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="off"
              className="mt-2 w-full rounded-xl border border-[var(--warm-ivory)]/25 bg-[var(--plum-900)]/40 px-4 py-3 text-base text-[var(--warm-ivory)] placeholder:text-[var(--warm-ivory)]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
              placeholder="Enter your shared phrase"
              aria-label="Website password"
            />
          </label>
          <p className="text-xs text-[var(--warm-ivory)]/62">Hint: {hint}</p>
          {error ? (
            <p className="rounded-xl border border-[var(--deep-burgundy)]/55 bg-[var(--deep-burgundy)]/25 px-3 py-2 text-sm text-[var(--warm-ivory)]">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--champagne-gold)]/55 bg-[var(--champagne-gold)]/12 px-4 py-3 text-sm font-medium uppercase tracking-[0.17em] text-[var(--warm-ivory)] transition hover:bg-[var(--champagne-gold)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--champagne-gold)]"
          >
            Unlock our story
          </button>
        </form>
      </div>
    </section>
  );
}
