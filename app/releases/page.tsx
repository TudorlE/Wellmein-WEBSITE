import type { Metadata } from "next";
import ReleasesGrid from "./ReleasesGrid";
import LocalizedPageHeader from "@/components/LocalizedPageHeader";

export const metadata: Metadata = {
  title: "Releases",
  description: "Latest music releases from the Wellmein roster.",
};

export default function ReleasesPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <LocalizedPageHeader
          titleKey="pages.releases.title"
          subtitleKey="pages.releases.subtitle"
        />
        <ReleasesGrid />
      </div>
    </main>
  );
}
