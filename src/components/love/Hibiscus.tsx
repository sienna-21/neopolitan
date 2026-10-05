
type Props = {
  bloom: number; // 0 = bud, 1 = open
  size?: number;
  hue?: "strawberry" | "rose";
  className?: string;
};

/** Hand-drawn style hibiscus. Petals unfold as `bloom` goes 0 -> 1. */
export function Hibiscus({ bloom, size = 120, hue = "strawberry", className }: Props) {
  const petalFill = hue === "rose" ? "var(--rose)" : "var(--strawberry)";
  const petals = [0, 72, 144, 216, 288];
  return (
    <svg viewBox="-60 -60 120 120" width={size} height={size} className={className} aria-hidden>
      <defs>
        <radialGradient id={`pg-${hue}`} cx="0" cy="0" r="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--rose)" />
          <stop offset="35%" stopColor={petalFill} />
          <stop offset="100%" stopColor="var(--strawberry-soft)" />
        </radialGradient>
      </defs>
      {petals.map((rot, i) => (
        <g
          key={rot}
          style={{
            transform: `rotate(${rot + (1 - bloom) * -30}deg) scale(${0.28 + bloom * 0.72})`,
            transformOrigin: "0 0",
            transition: `transform 1.8s cubic-bezier(0.34, 1.3, 0.5, 1) ${i * 0.09}s`,
          }}
        >
          <path
            d="M0 0 C -22 -10, -30 -38, -12 -50 C -4 -56, 4 -56, 12 -50 C 30 -38, 22 -10, 0 0 Z"
            fill={`url(#pg-${hue})`}
            stroke="var(--rose)"
            strokeOpacity="0.35"
            strokeWidth="0.8"
          />
          <path d="M0 -4 C -3 -18, -2 -32, 0 -42" stroke="var(--rose)" strokeOpacity="0.3" strokeWidth="0.6" fill="none" />
        </g>
      ))}
      <g
        style={{
          opacity: bloom > 0.3 ? 1 : 0,
          transform: `scale(${bloom})`,
          transformOrigin: "0 0",
          transition: "transform 1.4s ease 0.5s, opacity 1.4s ease 0.5s",
        }}
      >
        <circle r="6" fill="var(--rose)" />
        <path d="M0 0 C 4 -12, 8 -20, 14 -28" stroke="var(--cocoa)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((k) => (
          <circle key={k} cx={14 + Math.cos(k * 1.3) * 3} cy={-28 + Math.sin(k * 1.3) * 3} r="1.6" fill="oklch(0.85 0.12 85)" />
        ))}
      </g>
    </svg>
  );
}

export function TinyHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 20 C 5 15, 2 11, 3.5 7.5 C 5 4.5, 9 4.5, 12 8 C 15 4.5, 19 4.5, 20.5 7.5 C 22 11, 19 15, 12 20 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 2 C 13 9, 15 11, 22 12 C 15 13, 13 15, 12 22 C 11 15, 9 13, 2 12 C 9 11, 11 9, 12 2 Z" fill="currentColor" />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" className={className} preserveAspectRatio="none" aria-hidden>
      <path d="M2 7 C 20 2, 35 11, 55 6 S 95 2, 115 7 S 160 11, 198 5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
