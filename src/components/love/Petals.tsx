import { useEffect, useState } from "react";

type P = { left: number; delay: number; dur: number; size: number; drift: number };

/** Occasional drifting petals. Generated client-side to avoid hydration mismatch. */
export function Petals({ count = 9 }: { count?: number }) {
  const [petals, setPetals] = useState<P[]>([]);
  useEffect(() => {
    setPetals(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 20,
        dur: 16 + Math.random() * 14,
        size: 8 + Math.random() * 10,
        drift: -60 + Math.random() * 160,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute top-0 block bg-strawberry"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.75,
            borderRadius: "80% 10% 80% 10%",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as string]: `${p.drift}px`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
