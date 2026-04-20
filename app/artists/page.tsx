import type { Metadata } from "next";
import ArtistsGrid from "./ArtistsGrid";
import LocalizedPageHeader from "@/components/LocalizedPageHeader";

export const metadata: Metadata = {
  title: "Artists",
  description: "Meet the talented artists on the Wellmein roster.",
};

export default function ArtistsPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <LocalizedPageHeader
          titleKey="pages.artists.title"
          subtitleKey="pages.artists.subtitle"
        />
        <ArtistsGrid />
      </div>
    </main>
  );
}
