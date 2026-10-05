import { useEffect, useRef, useState } from "react";
import { music } from "@/content";
import { Button } from "@/components/ui/button";

/** Tiny floating vinyl player. */
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [missing, setMissing] = useState(false);
  const [volume, setVolume] = useState(music.volume);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    },
    [],
  );

  const fadeTo = (target: number, ms: number, done?: () => void) => {
    const a = audioRef.current;
    if (!a) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const from = a.volume;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      a.volume = from + (target - from) * k;
      if (k < 1) fadeRef.current = requestAnimationFrame(step);
      else done?.();
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      fadeTo(0, 900, () => a.pause());
      setPlaying(false);
    } else {
      try {
        setMissing(false);
        a.volume = 0;
        a.load();
        await a.play();
        setStarted(true);
        setPlaying(true);
        fadeTo(volume, 2000);
      } catch (error) {
        console.error("Could not play the love song", error);
        setStarted(true);
        setMissing(true);
      }
    }
  };

  const onVolume = (v: number) => {
    setVolume(v);
    if (audioRef.current && playing) audioRef.current.volume = v;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-full border border-border bg-card/90 py-1.5 pl-1.5 pr-4 shadow-soft backdrop-blur">
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="metadata"
        onError={() => {
          setPlaying(false);
          setMissing(true);
        }}
      />
      <Button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        size="icon"
        className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cocoa p-0 transition-transform hover:scale-105 hover:bg-cocoa"
      >
        <span className={`absolute inset-1 rounded-full border border-vanilla/20 ${playing ? "spin-slow" : ""}`}>
          <span className="absolute inset-2 rounded-full border border-vanilla/15" />
          <span className="absolute left-1/2 top-1 h-1 w-1 rounded-full bg-strawberry" />
        </span>
        <span className="relative grid h-4 w-4 place-items-center rounded-full bg-strawberry text-[8px] text-cocoa">
          {playing ? "❚❚" : "▶"}
        </span>
      </Button>
      <div className="leading-tight">
        {!started ? (
          <p className="font-hand text-lg text-cocoa">{music.idleLabel}</p>
        ) : missing ? (
          <p className="max-w-[11rem] text-[11px] text-cocoa-soft">Couldn't play the song. Tap again to retry.</p>
        ) : (
          <>
            <p className="font-serif text-sm italic text-cocoa">{music.title}</p>
            <p className="text-[10px] text-cocoa-soft">{music.artist}</p>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => onVolume(Number(e.target.value))}
              aria-label="Volume"
              className="h-1 w-20 accent-[var(--rose)]"
            />
          </>
        )}
      </div>
    </div>
  );
}
