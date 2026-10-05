import { createFileRoute } from "@tanstack/react-router";
import { EnvelopeSection } from "@/components/love/EnvelopeSection";
import { LetterSection } from "@/components/love/LetterSection";
import { GardenSection } from "@/components/love/GardenSection";
import { MusicPlayer } from "@/components/love/MusicPlayer";
import { Petals } from "@/components/love/Petals";
import { ProgressFlowers } from "@/components/love/ProgressFlowers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For my favorite person ♡" },
      { name: "description", content: "A little handmade letter, and a garden that grows one flower at a time." },
      { property: "og:title", content: "For my favorite person ♡" },
      { property: "og:description", content: "A little handmade letter, and a garden that grows one flower at a time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="paper-grain relative min-h-screen overflow-x-clip bg-background">
      <Petals />
      <ProgressFlowers />
      <EnvelopeSection />
      <LetterSection />
      <GardenSection />
      <MusicPlayer />
    </main>
  );
}
