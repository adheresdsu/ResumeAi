# Anniversary Website — Luxury One-Year Celebration

A cinematic, intimate, private anniversary website built with **Next.js App Router + TypeScript + Tailwind CSS + Framer Motion**.

This project is designed as a digital love letter with editable content, elegant animation, and a premium editorial visual style.

---

## Tech stack

- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion
- Lucide React
- `next/image` for optimized image rendering
- `canvas-confetti` for subtle celebration effects

---

## Run locally

```bash
npm install
npm run dev
```

Then open: `http://localhost:3000`

---

## Project structure

```text
app/
  (marketing)/
    layout.tsx
    page.tsx
  layout.tsx
  globals.css

components/
  anniversary/
    AnniversaryExperience.tsx
    AnniversaryIntro.tsx
    MusicPlayer.tsx
    RelationshipCounter.tsx
    HeroSection.tsx
    StorySection.tsx
    MemoryTimeline.tsx
    PhotoGallery.tsx
    GalleryLightbox.tsx
    ReasonsSection.tsx
    LoveNotesSection.tsx
    LoveLetter.tsx
    SoundtrackSection.tsx
    FutureSection.tsx
    FinalSurprise.tsx
    SectionHeading.tsx
    AnimatedText.tsx
    FloatingParticles.tsx
    ScrollProgress.tsx
    BackToTop.tsx
    CursorGlow.tsx
    PasswordGate.tsx
    Footer.tsx
    OptimizedMemoryImage.tsx

src/
  data/
    anniversary.ts
  types/
    anniversary.ts

public/
  favicon.svg
  images/
    placeholder-photo.svg
    social-preview.svg
    ...your photos
  music/
    .gitkeep
    ...your audio files
```

---

## Personalization (main file)

Edit everything from:

```text
src/data/anniversary.ts
```

This file controls:

- Names and initials
- Relationship start + anniversary date
- Intro text
- Hero message
- Story prompts
- Timeline memories
- Gallery images and captions
- Reasons section
- Love notes
- Full love letter
- Soundtrack cards + optional previews
- Future dreams + promise statement
- Final surprise content
- SEO metadata + `noindex`
- Optional password gate

---

## How to replace key content

### 1) Names and initials

In `src/data/anniversary.ts`:

- `profile.yourName`
- `profile.herName`
- `profile.initials`

### 2) Dates

- `dates.relationshipStart` (ISO datetime string)
- `dates.anniversaryDisplay` (human-readable string)
- `hero.eyebrow` (display label)

### 3) Photos

Put files in:

```text
public/images/
```

Then update the matching `src` values inside `anniversary.ts`, for example:

- `hero.featuredImage`
- `story.photos[]`
- `timeline[].image`
- `gallery[].src`
- `finalSurprise.celebrationImage`

If an image is missing, the UI gracefully falls back to `/images/placeholder-photo.svg`.

### 4) Music

Put files in:

```text
public/music/
```

Then update:

- `audio.src` for background music (default: `/music/our-song.mp3`)
- `soundtrack[].previewSrc` for optional track previews

If a file is missing, playback controls remain stable and show a gentle helper message.

### 5) Timeline memories

Edit:

- `timeline[]` array objects

Each entry supports:

- `date`
- `title`
- `description`
- `location` (optional)
- `image`
- `imageAlt`
- `icon`

### 6) Love letter

Replace:

- `loveLetter`

Keep paragraph spacing with blank lines for best presentation.

### 7) Color palette

Edit CSS variables in:

```text
app/globals.css
```

Main variables:

- `--deep-burgundy`
- `--warm-ivory`
- `--blush-pink`
- `--champagne-gold`
- `--dark-plum`
- `--soft-black`

---

## Privacy mode (optional)

A lightweight personal privacy gate is available in `src/data/anniversary.ts`:

```ts
privacyGate: {
  enabled: false,
  password: "our-story",
  hint: "...",
  disclaimer: "...",
}
```

Set `enabled: true` to require a password before opening the site.

> Note: this is intentionally a simple personal surprise gate, not strong authentication.

---

## Accessibility and UX notes

- Semantic sections and headings
- Keyboard-friendly gallery modal (Esc + arrow keys + tab cycle)
- Visible focus states
- Reduced-motion support (`prefers-reduced-motion`)
- Responsive layout across mobile and desktop
- Touch-friendly controls and swipe support in lightbox

---

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: default (`next build`).
5. Output: default.
6. Deploy.

If you use a custom production domain, set:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

(optional, improves metadata URL consistency)

---

## Notes

- No backend or database is required for this anniversary experience.
- No `.env` file is needed unless you want to set `NEXT_PUBLIC_SITE_URL`.
