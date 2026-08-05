interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left";

  return (
    <header className={alignment}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[var(--champagne-gold)]/90">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl leading-tight text-[var(--warm-ivory)] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--warm-ivory)]/80 sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
