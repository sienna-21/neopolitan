import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { envelope } from "@/content";
import { Hibiscus, TinyHeart } from "./Hibiscus";

/** Scroll-driven envelope: flap lifts, letter slides up, camera moves closer. */
export function EnvelopeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const flap = useTransform(scrollYProgress, [0.05, 0.35], [0, 180]);
  const flapZ = useTransform(scrollYProgress, (v) => (v > 0.2 ? 1 : 30));
  const flapFront = useTransform(scrollYProgress, (v) => (v > 0.2 ? 0 : 1));
  const flapBack = useTransform(scrollYProgress, (v) => (v > 0.2 ? 1 : 0));
  const letterY = useTransform(scrollYProgress, [0.35, 0.7], ["0%", "-70%"]);
  const camera = useTransform(scrollYProgress, [0.3, 1], [1, 1.35]);
  const envFade = useTransform(scrollYProgress, [0.75, 0.98], [1, 0]);
  const hintFade = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const sealFade = useTransform(scrollYProgress, [0.02, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[320vh]" aria-label="An envelope for you">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ scale: camera, opacity: envFade }} className="relative" >
          <div
            className="relative w-[min(86vw,420px)] aspect-[1.55]"
            
          >
            {/* back + lining */}
            <div className="absolute inset-0 rounded-xl bg-strawberry shadow-letter" />
            {/* letter inside */}
            <motion.div
              style={{ y: letterY, zIndex: 10 }}
              className="absolute inset-x-[7%] top-[6%] h-[88%] rounded-lg bg-card paper-grain letter-lines px-6 pt-6"
            >
              <p className="font-hand text-2xl text-rose">Hey, you ♡</p>
              <div className="mt-3 space-y-2">
                <div className="h-1.5 w-3/4 rounded bg-muted" />
                <div className="h-1.5 w-2/3 rounded bg-muted" />
              </div>
            </motion.div>
            {/* front pocket */}
            <div
              className="absolute inset-0 z-20 rounded-xl bg-vanilla-deep paper-grain"
              style={{ clipPath: "polygon(0 22%, 50% 62%, 100% 22%, 100% 100%, 0 100%)" }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl border border-cocoa/20" />
            {/* flap */}
            <motion.div
              style={{ rotateX: flap, zIndex: flapZ, transformOrigin: "top center", transformPerspective: 1200 }}
              className="absolute inset-x-0 top-0 h-[62%]"
            >
              <motion.div
                className="absolute inset-0 bg-vanilla paper-grain"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", opacity: flapFront }}
              />
              <motion.div
                className="absolute inset-0 bg-strawberry-soft"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", opacity: flapBack }}
              />
            </motion.div>
            {/* seal */}
            <motion.div
              style={{ opacity: sealFade, zIndex: 40 }}
              className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cocoa p-1.5 shadow-soft"
            >
              <Hibiscus bloom={1} size={38} hue="rose" />
            </motion.div>
            {/* address */}
            <motion.div
              style={{ opacity: sealFade, zIndex: 40 }}
              className="absolute inset-x-0 bottom-[9%] text-center"
            >
              <p className="font-serif text-xl italic text-cocoa sm:text-2xl">{envelope.front}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div style={{ opacity: hintFade }} className="absolute bottom-10 flex flex-col items-center gap-2 text-cocoa-soft">
          <span className="text-xs tracking-[0.3em] lowercase">{envelope.hint}</span>
          <TinyHeart className="float-soft h-3 w-3 text-rose" />
        </motion.div>
      </div>
    </section>
  );
}
