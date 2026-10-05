import { motion } from "motion/react";
import { letter, transition } from "@/content";
import { Hibiscus, Sparkle, Squiggle, TinyHeart } from "./Hibiscus";

export function LetterSection() {
  return (
    <section id="letter" className="relative -mt-[40vh] px-5 pb-24">
      <motion.article
        initial={{ opacity: 0, scaleY: 0.55, y: 60, rotate: -1.5 }}
        whileInView={{ opacity: 1, scaleY: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top center" }}
        className="paper-grain relative mx-auto max-w-xl rounded-2xl border border-border bg-card px-7 py-12 shadow-letter sm:px-14 sm:py-16"
      >
        {/* decorations */}
        <Hibiscus bloom={1} size={70} className="absolute -left-6 -top-7 rotate-[-18deg]" />
        <Hibiscus bloom={1} size={44} hue="rose" className="absolute -right-3 top-10 rotate-12 opacity-80" />
        <TinyHeart className="absolute bottom-8 right-8 h-4 w-4 text-strawberry" />
        <Sparkle className="twinkle absolute right-16 top-6 h-3 w-3 text-rose" />
        <span className="absolute -right-2 top-28 hidden rotate-6 font-hand text-lg text-rose/80 sm:block">← read slowly</span>
        <span className="absolute -left-4 bottom-24 hidden -rotate-6 font-hand text-lg text-cocoa-soft sm:block">(i mean it)</span>

        <h1 className="font-serif text-4xl italic text-rose sm:text-5xl">{letter.greeting}</h1>
        <Squiggle className="mt-2 h-3 w-32 text-strawberry" />

        <div className="mt-8 space-y-5 font-serif text-lg leading-relaxed text-cocoa sm:text-xl">
          {letter.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.1, delay: 0.1 }}
              className={p === "I love you." ? "font-medium italic text-rose" : ""}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 text-cocoa-soft">
          <span className="font-hand text-2xl text-rose">{letter.closing}</span>
          <svg viewBox="0 0 20 30" className="float-soft h-7 w-5 text-cocoa-soft" aria-hidden>
            <path d="M10 2 C 9 10, 11 18, 10 26 M4 20 L10 27 L16 20" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </motion.article>

      <div className="mx-auto mt-40 max-w-md space-y-6 text-center">
        {transition.map((t, i) => (
          <motion.p
            key={t}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1.6, delay: i * 0.9 }}
            className="font-serif text-2xl italic text-cocoa sm:text-3xl"
          >
            {t}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
