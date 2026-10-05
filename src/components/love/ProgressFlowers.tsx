import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Dot({ p, at }: { p: MotionValue<number>; at: number }) {
  const scale = useTransform(p, [at - 0.08, at], [0.3, 1]);
  const opacity = useTransform(p, [at - 0.08, at], [0.25, 1]);
  return (
    <motion.span style={{ scale, opacity }} className="block h-2.5 w-2.5 rounded-[50%_50%_50%_0] rotate-45 bg-rose/80" />
  );
}

/** Tiny flowers appear along the side as she scrolls. */
export function ProgressFlowers() {
  const { scrollYProgress } = useScroll();
  const stops = [0.08, 0.25, 0.42, 0.58, 0.74, 0.9];
  return (
    <div className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 sm:flex" aria-hidden>
      {stops.map((s) => (
        <Dot key={s} p={scrollYProgress} at={s} />
      ))}
    </div>
  );
}
