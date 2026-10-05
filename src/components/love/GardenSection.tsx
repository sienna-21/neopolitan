import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { garden } from "@/content";
import { Hibiscus, Sparkle, TinyHeart } from "./Hibiscus";

// Positions (in % of the garden patch) for each of the 7 flowers.
const SPOTS = [
  { x: 50, y: 58, s: 1 },
  { x: 24, y: 66, s: 0.8 },
  { x: 76, y: 64, s: 0.85 },
  { x: 36, y: 40, s: 0.7 },
  { x: 66, y: 38, s: 0.72 },
  { x: 12, y: 44, s: 0.6 },
  { x: 88, y: 42, s: 0.62 },
];

const EXTRAS = Array.from({ length: 14 }, (_, i) => ({
  x: 5 + ((i * 37) % 90),
  y: 72 + ((i * 13) % 22),
  r: (i * 47) % 360,
}));

export function GardenSection() {
  const total = garden.messages.length;
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState(0); // finale: 0 none, 1 first line, 2 second

  const done = count >= total;

  useEffect(() => {
    if (!done) return;
    const a = setTimeout(() => setStage(1), 1600);
    const b = setTimeout(() => setStage(2), 4200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [done]);

  const bloomNext = () => {
    if (!done) setCount((c) => c + 1);
  };

  const latest = count > 0 ? garden.messages[count - 1] : "";

  return (
    <section id="garden" className="bg-blush relative overflow-hidden px-5 pb-32 pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="font-serif text-5xl italic text-cocoa sm:text-6xl"
        >
          {garden.title}
        </motion.h2>
        <p className="mx-auto mt-4 max-w-md text-base text-cocoa-soft">{garden.subtitle}</p>
        <AnimatePresence>
          {count === 0 && (
            <motion.p exit={{ opacity: 0 }} className="mt-3 font-hand text-2xl text-rose">
              {garden.hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* the patch */}
      <div className="relative mx-auto mt-10 aspect-[1.4] w-full max-w-2xl sm:aspect-[1.8]">
        <div className="paper-grain absolute inset-x-[4%] bottom-[4%] top-[30%] rounded-[50%] bg-vanilla-deep/80 shadow-soft" />
        <div className="absolute inset-x-[14%] bottom-[10%] top-[44%] rounded-[50%] bg-strawberry-soft/70 blur-xl" />

        {/* alive extras */}
        {done &&
          EXTRAS.map((e, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 60, damping: 12 }}
              className="absolute"
              style={{ left: `${e.x}%`, top: `${e.y}%`, transform: "translate(-50%,-50%)" }}
            >
              {i % 3 === 0 ? (
                <TinyHeart className="h-3 w-3 text-rose/70" />
              ) : i % 3 === 1 ? (
                <span className="block h-3 w-5 rounded-[80%_10%] bg-leaf/70" style={{ rotate: `${e.r}deg` }} />
              ) : (
                <Hibiscus bloom={1} size={22} />
              )}
            </motion.div>
          ))}

        {done &&
          Array.from({ length: 18 }).map((_, i) => (
            <span
              key={`g${i}`}
              className="twinkle absolute h-1.5 w-1.5 rounded-full bg-strawberry glow-rose"
              style={{ left: `${(i * 53) % 100}%`, top: `${10 + ((i * 29) % 70)}%`, animationDelay: `${(i % 6) * 0.5}s` }}
            />
          ))}

        {done &&
          [0, 1].map((b) => (
            <motion.svg
              key={`b${b}`}
              viewBox="0 0 30 20"
              className="absolute h-6 w-8 text-rose/70"
              initial={{ left: b ? "90%" : "5%", top: "30%", opacity: 0 }}
              animate={{ left: b ? ["90%", "60%", "75%"] : ["5%", "35%", "20%"], top: ["30%", "10%", "20%"], opacity: 1 }}
              transition={{ duration: 9, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
              aria-hidden
            >
              <path d="M15 10 C 8 0, 1 4, 5 10 C 1 16, 8 19, 15 10 C 22 19, 29 16, 25 10 C 29 4, 22 0, 15 10 Z" fill="currentColor" />
            </motion.svg>
          ))}

        {/* flowers */}
        {SPOTS.map((spot, i) => {
          const visible = i < count || i === count;
          if (!visible || (i === count && done)) return null;
          const bloomed = i < count;
          const isBud = i === count;
          return (
            <motion.button
              key={i}
              type="button"
              onClick={isBud ? bloomNext : undefined}
              aria-label={isBud ? "Bloom a flower" : `Flower ${i + 1}`}
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              {...(isBud ? { whileHover: { scale: 1.08 } } : {})}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${isBud ? "cursor-pointer" : "cursor-default"}`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              <span className="relative block float-soft w-[calc(var(--fs)*0.66)] sm:w-[var(--fs)]" style={{ animationDelay: `${i * 0.6}s`, ["--fs" as string]: `${Math.round(120 * spot.s)}px` }}>
                {/* stem */}
                <svg viewBox="0 0 20 60" className="absolute left-1/2 top-1/2 h-16 w-5 -translate-x-1/2 text-leaf" aria-hidden>
                  <path d="M10 0 C 8 20, 12 40, 10 60" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M10 30 C 16 24, 20 28, 18 32 C 15 34, 12 32, 10 30 Z" fill="currentColor" />
                </svg>
                {bloomed && (
                  <span className="absolute inset-[20%] rounded-full bg-strawberry/50 blur-2xl" />
                )}
                <Hibiscus
                  bloom={bloomed ? 1 : 0}
                  size={Math.round(120 * spot.s)}
                  hue={i % 2 ? "rose" : "strawberry"}
                  className="relative h-auto w-full"
                />
                {isBud && (
                  <span className="animate-pulse absolute inset-0 rounded-full ring-2 ring-strawberry/60" />
                )}
                {bloomed && i === count - 1 &&
                  [0, 1, 2, 3, 4].map((k) => (
                    <motion.span
                      key={k}
                      className="absolute left-1/2 top-1/2 text-rose"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                      animate={{ x: Math.cos(k * 1.25) * 60, y: Math.sin(k * 1.25) * 60 - 10, opacity: 0, scale: 1 }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                    >
                      <Sparkle className="h-3 w-3" />
                    </motion.span>
                  ))}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* message */}
      <div className="mx-auto mt-6 flex min-h-[7rem] max-w-md items-start justify-center text-center">
        <AnimatePresence mode="wait">
          {latest && !done && (
            <motion.div
              key={count}
              initial={{ opacity: 0, y: 12, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: -0.5 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1 }}
              className="paper-grain relative rounded-xl border border-border bg-card px-6 py-5 shadow-soft"
            >
              <p className="font-serif text-xl italic leading-snug text-cocoa">{latest}</p>
              <p className="mt-3 text-xs tracking-widest text-cocoa-soft">
                {count} / {total} · tap the next bud
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* finale */}
      <div className="mx-auto max-w-xl text-center">
        <AnimatePresence>
          {stage >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2 }}
              className="font-serif text-3xl italic text-cocoa-soft sm:text-4xl"
            >
              {garden.finale.first}
            </motion.p>
          )}
          {stage >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.4 }}>
              <h3 className="mt-6 font-serif text-5xl italic text-rose sm:text-6xl">{garden.finale.second}</h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="mt-10 space-y-1 font-hand text-2xl text-cocoa"
              >
                {garden.finale.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
