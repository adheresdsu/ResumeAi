import { cn } from "@/lib/utils";

/**
 * Static, CSS-only stand-in for the 3D hero scene. Used while the WebGL
 * bundle loads, and as the permanent visual for reduced-motion, no-WebGL,
 * or off-screen states — so the hero never ships an empty box.
 */
export function SceneFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        aria-hidden
        className="absolute h-3/4 w-3/4 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-violet-soft), transparent 70%)",
        }}
      />
      <div className="relative grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass-panel h-28 w-20 rounded-xl sm:h-36 sm:w-28"
            style={{ transform: `translateY(${i % 2 === 0 ? "0" : "16px"})` }}
          />
        ))}
      </div>
    </div>
  );
}
